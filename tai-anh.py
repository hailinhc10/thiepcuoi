#!/usr/bin/env python3
"""Tải toàn bộ ảnh (và nhạc) từ link http(s) về thư mục images/ rồi sửa link trong html/css/js.
Chạy: python3 tai-anh.py (nếu có Python) hoặc PowerShell: powershell -ExecutionPolicy Bypass -File .\tai-anh.ps1
import os, re, sys, hashlib, urllib.request
ROOT = os.path.dirname(os.path.abspath(__file__))
EXT = r'(?:png|jpe?g|webp|gif|svg|mp3|m4a|ogg|mp4)'
PAT = re.compile(r'https?://[^"\'\s)\\<>]+?\.' + EXT + r'(?=[?"\'\s)\\<>]|$)', re.I)
files = [os.path.join(ROOT, 'index.html')]
for d in ('css', 'js'):
    for n in sorted(os.listdir(os.path.join(ROOT, d))):
        files.append(os.path.join(ROOT, d, n))
texts = {f: open(f, encoding='utf-8').read() for f in files}
urls = sorted({u for t in texts.values() for u in PAT.findall(t)})
print('Tìm thấy', len(urls), 'file')
os.makedirs(os.path.join(ROOT, 'images'), exist_ok=True)
local = {}
for i, u in enumerate(urls, 1):
    ext = re.search(r'\.(' + EXT[3:-1] + r')$', u, re.I).group(1).lower()
    name = '%03d-%s.%s' % (i, hashlib.sha1(u.encode()).hexdigest()[:6], ext)
    path = os.path.join(ROOT, 'images', name)
    try:
        if not os.path.exists(path):
            req = urllib.request.Request(u, headers={'User-Agent': 'Mozilla/5.0'})
            open(path, 'wb').write(urllib.request.urlopen(req, timeout=30).read())
        local[u] = name
        print('OK  ', name)
    except Exception as e:
        print('LỖI ', u, e)
for f, t in texts.items():
    prefix = '../images/' if os.path.basename(os.path.dirname(f)) == 'css' else 'images/'
    for u, name in local.items():
        t = t.replace(u, prefix + name)
    open(f, 'w', encoding='utf-8').write(t)
print('Xong. Ảnh tải lỗi vẫn giữ link gốc.')
