/* =====================================================================
   KHỐI CẤU HÌNH: CHỈ CẦN SỬA Ở ĐÂY. Phần còn lại của file không cần đụng tới.
   - Chữ có xuống dòng thì dùng \n
   - Ảnh: dán link ảnh vào trong dấu "" (nên dùng link .jpg/.png trực tiếp)
   ===================================================================== */
const CONFIG = {
  // ======== 1. THÔNG TIN CHUNG ========
  title: "THƯ MỜI CƯỚI Hải Linh & Vũ Mây",
  description: "Trân trọng kính mời bạn đến dự lễ cưới của Hải Linh & Vũ Mây – 17.01.2027.",   // hiện khi chia sẻ link qua Zalo/Facebook
  groomName: "Hải Linh",                // tên hiện ở trên / bên trái
  brideName: "Vũ Mây",                // tên hiện ở dưới / bên phải
  coverDate: "17.01\n2027",               // ngày hiện giữa hai tên ở bìa
  guestDefault: "Quý Khách",       // tên khách khi link không có ?guest=...
  inviteHeading: "Trân Trọng Báo Tin Lễ Vu Quy Của",

  // ======== 2. HAI BÊN GIA ĐÌNH ========
  groomFamily: { label: "Nhà Trai", parents: "ÔNG Cấn Bá Long\nBÀ Kiều Thị Quyn", address: "Thôn Tuyết Nghĩa, Kiều Phú, Hà Nội" },
  brideFamily: { label: "Nhà Gái", parents: "ÔNG Vũ Bá Kiền\nBÀ Dương Thị Thành", address: "Thôn Vĩnh Dụ, Tam Hưng, Hà Nội" },

  // ======== 3. LỄ VÀ TIỆC ========
  ceremony: { title: "LỄ VU QUY", time: "Vào Lúc 13:30 | Chủ Nhật", day: "17", month: "Tháng 01", year: "2027", lunar: "(Tức Ngày 10 Tháng 12 Năm Bính Ngọ)", place: "Tại Nhà Văn Hóa Tuyết Nghĩa" },
  party:    { title: "TIỆC MỪNG VU QUY", time: "16:00 - Thứ 7", date: "16.01.2027", lunar: "(Tức Ngày 09 Tháng 12 Năm Bính Ngọ)", place: "Tại Nhà Văn Hóa Tuyết Nghĩa" },

  // ======== 4. ĐỊA ĐIỂM & BẢN ĐỒ ========
  venue: { name: "NHÀ VĂN HÓA TUYẾT NGHĨA", address: "Thôn Tuyết Nghĩa, Kiều Phú, Hà Nội",
    mapLink: "https://maps.app.goo.gl/wM95yKbDq3DMMPAN7",   // nút "Xem Chỉ Đường"
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4457.918577173373!2d105.58426237587143!3d20.974900489625238!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31345b001b4410f1%3A0xa1734c5aa328db5f!2zTmjDoCB2xINuIGjDs2EgdGjDtG4gxJDhuqFpIMSQ4buTbmcgxJDhu5kgTMOibg!5e1!3m2!1svi!2s!4v1793337329034!5m2!1svi!2s" },   // link nhúng bản đồ (Google Maps > Chia sẻ > Nhúng bản đồ > lấy phần src)

  // ======== 5. LỊCH ========
  calendar: { days: "16,17.01.2027", lang: "vi",   // "16,17.01.2027" = ngày 16 và 17 tháng 1 năm 2027
    heart: "images/016.png" },

  // ======== 6. GỬI MỪNG CƯỚI ========
  bank: { groom: "TECHCOMBANK - CAN HAI LINH\n500 11 99999", bride: "TECHCOMBANK - VU THI MAY\n1903 1314 7385 55" },

  // ======== 7. CHÂN TRANG ========
  footer: { quote: "Sự hiện diện của Quý khách là niềm vinh hạnh cho gia đình chúng tôi!", names: "HẢI LINH & VŨ MÂY" },

  // ======== 8. NHẠC ========
  music: { src: "images/060.mp3",
    playIcon: "images/011.png",
    pauseIcon: "images/013.gif" },

  // ======== 9. XÁC NHẬN THAM DỰ -> GỬI VỀ TELEGRAM ========
  telegram: {
    endpoint: "https://thiepcuoi.linhch.workers.dev",
    cooldownSeconds: 30,
  },
  thankYou: {          // popup hiện sau khi khách bấm GỬI NGAY. {name} sẽ được thay bằng tên khách
    title: "Cảm Ơn Bạn!",
    message: "Cảm ơn {name} đã gửi lời chúc tới Dâu Rể.\nRất mong được đón tiếp bạn trong ngày vui của chúng mình!",
    button: "ĐÓNG"
  },

  // ======== 10. TOÀN BỘ ẢNH ========
  images: {
    // ---- BÌA THIỆP (trước khi mở)
    cardClosed: "images/024.png",            // Thiệp đóng (ảnh PNG nền trong)
    coverHeart: "images/020.png",            // Biểu tượng nhỏ phía trên thiệp
    coverCornerBottom: "images/051.png",     // Hoa trang trí 2 góc dưới (dùng chung 1 ảnh)
    coverCornerTop: "images/031.png",        // Hoa trang trí 2 góc trên (dùng chung 1 ảnh)

    // ---- THIỆP MỞ RA (sau khi bấm)
    cardOpenBack: "images/025.png",          // Thiệp mở - lớp sau
    envelopePhoto: "images/003.jpg",         // 👉 Ảnh cưới trượt lên trong phong thư
    cardOpenFront: "images/026.png",         // Thiệp mở - lớp trước (viền phong thư)
    coverSmallIcon: "images/033.png",        // Biểu tượng nhỏ giữa hai tên

    // ---- PHẦN THƯ MỜI CƯỚI
    inviteIcon: "images/032.png",            // Biểu tượng trên dải đỏ
    inviteRing: "images/037.png",            // Vòng treo trên dải đỏ
    mainPhoto: "images/003.jpg",             // 👉 Ảnh lớn có viền đỏ
    trioLeft: "images/002.jpg",              // 👉 Trân Trọng Kính Mời - ảnh trái
    trioMiddle: "images/003.jpg",            // 👉 Trân Trọng Kính Mời - ảnh giữa
    trioRight: "images/005.jpg",             // 👉 Trân Trọng Kính Mời - ảnh phải

    // ---- ĐỊA ĐIỂM
    mapIcon: "images/050.png",               // Biểu tượng cạnh "Địa Điểm Tổ Chức"

    // ---- ALBUM HÌNH CƯỚI (theo thứ tự từ trên xuống)
    album1: "images/006.jpg",                // 👉 Hàng 1 - trái
    album2: "images/005.jpg",                // 👉 Hàng 1 - phải
    album3: "images/004.jpg",                // 👉 Hàng 2 - trái
    album4: "images/002.jpg",                // 👉 2 - giữa
    album5: "images/004.jpg",                // 👉 2 - phải
    album6: "images/001.jpg",                // 👉 Hàng 3 - trái
    album7: "images/004.jpg",                // 👉 3 - phải
    album8: "images/008.jpg",                // 👉 Hàng 4 - trái
    album9: "images/006.jpg",                // 👉 Hàng 4 - phải
    album10: "images/009.jpg",               // 👉 Hàng 5 - trái
    album11: "images/009.jpg",               // 👉 Hàng 5 - phải

    // ---- LỜI CHÀO CUỐI
    closingBackground: "images/008.jpg",     // 👉 Ảnh nền cuối trang
    closingFlower: "images/046.png",         // Họa tiết hoa (dùng chung ở cuối trang và popup)

    // ---- POPUP GỬI MỪNG CƯỚI
    qrGroom: "images/007.jpg",               // 👉 Mã QR nhà trai
    qrBride: "images/007.jpg",               // 👉 Mã QR nhà gái
    popupBackground: "",       // Ảnh nền popup mặc định
  }
};

/* =====================================================================
   CHIA THIỆP NHÀ TRAI / NHÀ GÁI (dùng chung 1 source, khác nhau ở link)
   - Nhà Trai : index.html                (hoặc ?side=trai)  -> dùng đúng CONFIG ở trên
   - Nhà Gái  : index.html?side=gai
   - Kèm tên khách: index.html?side=gai&guest=Anh%20Nam
   Chỉ cần ghi vào SIDES những mục KHÁC với CONFIG ở trên; mục nào không ghi
   thì tự dùng lại giá trị của CONFIG. Có thể ghi đè bất kỳ mục nào
   (kể cả images: { album1: "images/..." }).
   ===================================================================== */
const SIDES = {
  trai: { familyFirst: "trai" },   // link Nhà Trai: Nhà Trai hiện trước
  gai: {
    familyFirst: "gai",              // link Nhà Gái: Nhà Gái hiện trước
    title: "THƯ MỜI CƯỚI Vũ Mây & Hải Linh",
    description: "Trân trọng kính mời bạn đến dự lễ cưới của Vũ Mây & Hải Linh – 17.01.2027.",
    groomName: "Vũ Mây",              // bên Nhà Gái: tên cô dâu hiện trước
    brideName: "Hải Linh",
    footer: { names: "VŨ MÂY & HẢI LINH" },

    // ⚠️ SỬA các mục dưới đây cho đúng thông tin bên Nhà Gái (đang là giá trị tạm)
    ceremony: { place: "Tại Tư Gia Nhà Gái" },
    party:    { place: "Tại Tư Gia Nhà Gái" },
    venue: { name: "TƯ GIA NHÀ GÁI", address: "Thôn Vĩnh Dụ, Tam Hưng, Hà Nội",
      mapLink: "https://maps.app.goo.gl/eCtHYJdSBSeZLptA8",   // nút "Xem Chỉ Đường"
      mapEmbed: "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d937.8591061864248!2d105.81154699746818!3d20.863428684513767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2s!4v1793498067064!5m2!1sen!2s"   // link nhúng bản đồ
    },
  }
};
(function () {
  function merge(t, s) {
    Object.keys(s).forEach(function (k) {
      if (s[k] && typeof s[k] === "object" && !Array.isArray(s[k]) && t[k] && typeof t[k] === "object") merge(t[k], s[k]);
      else t[k] = s[k];
    });
  }
  var q = (new URLSearchParams(location.search).get("side") || "").toLowerCase();
  var side = (q === "gai" || q === "nhagai" || q === "bride") ? "gai" : "trai";
  CONFIG.side = side;
  merge(CONFIG, SIDES[side] || {});
})();

/* Tạo danh sách thay chữ từ CONFIG (không cần sửa) */
/* Tải trước ảnh bìa để thiệp hiện nhanh hơn */
(function () { try { var l = document.createElement("link"); l.rel = "preload"; l.as = "image"; l.href = CONFIG.images.cardClosed; document.head.appendChild(l); } catch (e) {} })();

function buildMapping() {
  const C = CONFIG, g = C.groomFamily, b = C.brideFamily, c = C.ceremony, p = C.party, v = C.venue;
  /* Bên nào hiện TRƯỚC (khối trên) trong phần "Trân Trọng Báo Tin": CONFIG.familyFirst = "trai" hoặc "gai" */
  const top = (C.familyFirst === "gai") ? b : g, bottom = (C.familyFirst === "gai") ? g : b;
  return [
    ["wkuu9jg6", C.brideName], ["lfeb0egb", C.groomName], ["19tqxf4g", C.coverDate],
    ["32etj2r3", C.inviteHeading], ["giudke9b", C.brideName], ["6i7xa1kt", C.groomName],
    /* Khối TRÊN = bên được chọn hiện trước, khối DƯỚI = bên còn lại */
    ["gksl9w4l", top.label], ["ig5jcswu", top.parents], ["91jxhp0m", top.address],
    ["j8n1a9zw", bottom.label], ["bv74resi", bottom.parents], ["2hyi8ra3", bottom.address],
    ["6amly90s", c.title], ["rvjhix10", c.time], ["0m3cmvaa", c.day], ["k8kl83qy", c.month], ["kbgnz2rp", c.year],
    ["trta43bz", c.lunar], ["pdl931a6", c.place],
    ["3s2jpdyt", p.title], ["yg223oeq", p.time], ["46dkq5lf", p.date], ["ky92athb", p.lunar], ["kc80qrcf", p.place],
    ["8799m2jd", v.name], ["b8ao84la", v.address]
  ].map(function (x) { return { id: "w-" + x[0], text: x[1] }; });
}
