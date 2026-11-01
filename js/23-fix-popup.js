(function () {
  function ready(fn){ if (document.readyState !== 'loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }
  ready(function () {
    var $ = function (id) { return document.getElementById(id); };
    var CFG = window.CONFIG || {}, IMG = CFG.images || {};
    /* ---- B. Popup gui mung cuoi ---- */
    var backdrop = $('popup-backdrop');
    var P = { groom: $('w-g81yux0n'), bride: $('w-hqvc3ddh') };
    var btn = $('w-n9eye9rx');
    if (!btn || !P.groom || !P.bride || !backdrop) return;

    /* dua popup + nen toi ra thang <body> de position:fixed khong bi cha cat/scale */
    [backdrop, P.groom, P.bride].forEach(function (n) { document.body.appendChild(n); });
    /* class lazy khong bao gio duoc go trong popup an -> nen & anh QR bi mat. Go di. */
    [P.groom, P.bride].forEach(function (p) { p.querySelectorAll('.lazy').forEach(function (n) { n.classList.remove('lazy'); }); });

    /* anh QR: gan lai tu CONFIG + bao loi neu link anh khong tai duoc */
    [['w-p8etkpq1', IMG.qrGroom], ['w-olx95uxv', IMG.qrBride]].forEach(function (a) {
      var box = $(a[0]); if (!box || !a[1]) return;
      var bg = box.querySelector('.image-background'); if (bg) bg.style.backgroundImage = 'url("' + a[1] + '")';
      var probe = new Image();
      probe.onerror = function () {
        var m = document.createElement('div'); m.className = 'wc-qr-fail';
        m.textContent = 'Không tải được mã QR. Bạn vui lòng chuyển khoản theo số tài khoản bên dưới nhé!';
        box.querySelector('.image-block-css').appendChild(m);
      };
      probe.src = a[1];
    });

    /* thanh chuyen Nha Trai / Nha Gai */
    var tabs = document.createElement('div'); tabs.id = 'wc-qr-tabs';
    tabs.innerHTML = '<button type="button" data-k="groom">Nhà Trai</button><button type="button" data-k="bride">Nhà Gái</button>';
    document.body.appendChild(tabs);

    function show(k) {
      Object.keys(P).forEach(function (key) { P[key].classList.toggle('wc-open', key === k); P[key].classList.toggle('d-none', key !== k); });
      tabs.querySelectorAll('button').forEach(function (b) { b.classList.toggle('on', b.getAttribute('data-k') === k); });
      P[k].querySelectorAll('.is-animation').forEach(function (n) { n.classList.add('animation'); });
    }
    function open(k) { backdrop.classList.remove('d-none'); tabs.classList.add('show'); show(k || 'groom'); }
    function close() {
      backdrop.classList.add('d-none'); tabs.classList.remove('show');
      Object.keys(P).forEach(function (key) { P[key].classList.remove('wc-open'); P[key].classList.add('d-none'); });
    }
    btn.style.cursor = 'pointer';
    btn.addEventListener('click', function (e) { e.preventDefault(); open('groom'); });
    tabs.addEventListener('click', function (e) { var b = e.target.closest('button'); if (b) show(b.getAttribute('data-k')); });
    backdrop.addEventListener('click', close);
    ['w-w7jquvg1', 'w-tc72d3cx'].forEach(function (id) { var x = $(id); if (x) { x.style.cursor = 'pointer'; x.addEventListener('click', close); } });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  });
})();
