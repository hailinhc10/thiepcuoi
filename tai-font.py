#!/usr/bin/env python3
"""Tải các font chữ đang lấy từ statics.pancake.vn về thư mục fonts/ rồi sửa link trong index.html và css/08-style.css.

Chạy 1 lần (cần internet):   python3 tai-font.py
- Nếu máy có thư viện fonttools + brotli (pip install fonttools brotli) thì tự đổi sang .woff2 (nhẹ hơn 50-70%).
  Không có thì vẫn tải về và dùng nguyên định dạng gốc (.ttf/.otf), thiệp vẫn chạy bình thường.
- Font nào tải lỗi thì giữ nguyên link cũ cho font đó, không làm hỏng thiệp.
- Chạy lại nhiều lần cũng an toàn.
"""
import io
import os
import re
import urllib.request

ROOT = os.path.dirname(os.path.abspath(__file__))
FONT_DIR = os.path.join(ROOT, 'fonts')
CSS = os.path.join(ROOT, 'css', '08-style.css')
HTML = os.path.join(ROOT, 'index.html')
URL_RE = re.compile(r'https://statics\.pancake\.vn/web-media/[^"\')\s<>]+')


def fetch(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    return urllib.request.urlopen(req, timeout=60).read()


def to_woff2(data):
    """Trả về bytes woff2, hoặc None nếu máy chưa có fonttools/brotli."""
    try:
        import brotli  # noqa: F401  (cần cho woff2)
        from fontTools.ttLib import TTFont
        font = TTFont(io.BytesIO(data))
        font.flavor = 'woff2'
        out = io.BytesIO()
        font.save(out)
        return out.getvalue()
    except Exception:
        return None


def slug(name):
    name = re.sub(r'\.(ttf|otf)$', '', name, flags=re.I)
    name = re.sub(r'\s*\(\d+\)', '', name)
    return re.sub(r'[^a-z0-9]+', '-', name.lower()).strip('-')


def main():
    css = open(CSS, encoding='utf-8').read()
    html = open(HTML, encoding='utf-8').read()

    # url -> tên họ font (để đặt tên file dễ đọc)
    names = {}
    for fam, url in re.findall(r'font-family:\s*"([^"]+)";\s*src:\s*url\("(https://statics\.pancake\.vn[^"]+)"\)', css):
        names[url] = slug(fam)

    urls = sorted(set(URL_RE.findall(css)) | set(URL_RE.findall(html)))
    print('Tìm thấy %d font cần tải' % len(urls))
    os.makedirs(FONT_DIR, exist_ok=True)

    failed = 0
    for url in urls:
        base = names.get(url) or 'font-' + str(abs(hash(url)) % 10 ** 6)
        try:
            data = fetch(url)
        except Exception as e:
            print('LỖI  %s -> giữ link cũ (%s)' % (base, e))
            failed += 1
            continue

        woff2 = to_woff2(data)
        if woff2:
            fname, fmt, mime, payload = base + '.woff2', 'woff2', 'font/woff2', woff2
        else:
            is_otf = data[:4] == b'OTTO'
            ext = 'otf' if is_otf else 'ttf'
            fname, fmt, mime, payload = '%s.%s' % (base, ext), ('opentype' if is_otf else 'truetype'), 'font/' + ext, data
        with open(os.path.join(FONT_DIR, fname), 'wb') as f:
            f.write(payload)

        # sửa @font-face
        css = re.sub(r'url\("%s"\)\s*format\("[a-z0-9]+"\)' % re.escape(url),
                     lambda m: 'url("../fonts/%s") format("%s")' % (fname, fmt), css)
        # sửa thẻ preload
        html = re.sub(r'type="font/[a-z0-9]+"(\s+crossorigin\s+href=")%s"' % re.escape(url),
                      lambda m: 'type="%s"%sfonts/%s"' % (mime, m.group(1), fname), html)
        print('OK   %-28s %6.0f KB  (%s)' % (fname, len(payload) / 1024, 'woff2' if woff2 else 'giữ định dạng gốc'))

    if not URL_RE.search(css) and not URL_RE.search(html):
        html = re.sub(r'\s*<link rel="(?:preconnect|dns-prefetch)" href="https://[a-z.]*pancake\.vn/?"[^>]*>', '', html)

    open(CSS, 'w', encoding='utf-8').write(css)
    open(HTML, 'w', encoding='utf-8').write(html)
    print('Xong.' + (' Có %d font lỗi, giữ link cũ.' % failed if failed else ' Mở thiệp bằng trình duyệt để kiểm tra lại.'))


if __name__ == '__main__':
    main()
