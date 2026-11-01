CẤU TRÚC
  index.html   - khung trang (HTML)
  css/         - các file CSS (giữ đúng thứ tự số 01, 02, ...)
  js/          - các file JS (giữ đúng thứ tự số). Muốn sửa tên, ngày, địa chỉ... mở js/01-config.js
  images/      - ảnh. Hiện ảnh vẫn dùng link online; chạy tai-anh.ps1 (Windows, không cần cài gì) hoặc tai-anh.py (có internet) để tải về máy và tự sửa link.
LƯU Ý: không đổi thứ tự các file trong index.html.
Mở thiệp: mở index.html bằng trình duyệt. Link khách mời: index.html?guest=Tên

--- BẢN TỐI ƯU (01/11/2026) ---
1) Chạy 1 lần để tải font về host (cần internet).
   Windows (không cần cài gì):  powershell -ExecutionPolicy Bypass -File .\tai-font.ps1
   Có Python:  py tai-font.py   (tự đổi sang woff2 nếu cài thêm: py -m pip install fonttools brotli)
   Không chạy cũng không sao, thiệp vẫn hiển thị như trước.
2) Chỉnh tốc độ chuyển động: css/03-mobile.css (animation-duration) - hiện 1s / 1.2s / 1.4s.
   Độ so le giữa các phần tử: js/20-anim-add-js.js (0.12 giây mỗi phần tử, tối đa 0.5 giây).
3) Ảnh chính 001-009 đã chuyển sang .webp (js/01-config.js trỏ tới .webp). 003.jpg giữ lại cho og:image/favicon.
4) JS nhỏ 12..19 đã gộp thành js/12-19-gop.js.
5) Đã xoá file không dùng: css/02-desktop.css, js/11-event-data.js và 19 ảnh (072.jpg, 068/078/065/076/073/079/015/077/052/057/053/054/017/027.png, 028.jpg, 055.webp, 014/019.svg).
   Nếu bạn đang dùng git, nhớ xoá cả các file này trong repo.
6) Khi đưa lên host chỉ cần: index.html, css/, js/, images/, fonts/ (không cần .git, tai-*.py/ps1, telegram-worker.js, tao-link-khach-moi.html).
