(function () {
  function ready(fn){ if (document.readyState !== 'loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }
  ready(function () {
    var $ = function (id) { return document.getElementById(id); };
    var CFG = (typeof CONFIG !== 'undefined' ? CONFIG : (window.CONFIG || {})), IMG = CFG.images || {};   /* CONFIG khai báo bằng const nên không nằm trên window */
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

    /* Mỗi link chỉ hiện đúng popup của bên mình: ?side=gai -> Nhà Gái, còn lại -> Nhà Trai (không còn thanh chọn) */
    var SIDE_KEY = (CFG.side === 'gai') ? 'bride' : 'groom';


    /* ---- Nút sao chép số tài khoản ---- */
    var ICON_COPY = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 0 1 2-2h9"/></svg>';
    var ICON_OK = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
    function copyText(t) {
      if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(t);
      return new Promise(function (res, rej) {
        try {
          var ta = document.createElement('textarea'); ta.value = t; ta.setAttribute('readonly', '');
          ta.style.cssText = 'position:fixed;top:-1000px;opacity:0'; document.body.appendChild(ta); ta.select();
          var ok = document.execCommand('copy'); document.body.removeChild(ta); ok ? res() : rej();
        } catch (e) { rej(e); }
      });
    }
    var toast = document.createElement('div'); toast.className = 'wc-toast'; document.body.appendChild(toast);
    var toastTimer;
    function showToast(msg) { toast.textContent = msg; toast.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(function () { toast.classList.remove('show'); }, 1800); }
    function addCopyButton(boxId) {
      var box = $(boxId); if (!box) return;
      var h = box.querySelector('.text-block-css'); if (!h) return;
      /* tìm dòng chữ cuối cùng có nội dung = dòng số tài khoản */
      var node = null;
      for (var i = h.childNodes.length - 1; i >= 0; i--) { var n = h.childNodes[i]; if (n.nodeType === 3 && n.nodeValue.trim()) { node = n; break; } }
      if (!node) return;
      var digits = node.nodeValue.replace(/\D/g, ''); if (digits.length < 6) return;
      var wrap = document.createElement('span'); wrap.className = 'wc-acc';
      node.parentNode.insertBefore(wrap, node); wrap.appendChild(node);
      var b = document.createElement('button'); b.type = 'button'; b.className = 'wc-copy';
      b.title = 'Sao chép số tài khoản'; b.setAttribute('aria-label', 'Sao chép số tài khoản'); b.innerHTML = ICON_COPY;
      b.addEventListener('click', function (e) {
        e.preventDefault(); e.stopPropagation();
        copyText(digits).then(function () {
          b.innerHTML = ICON_OK; b.classList.add('done'); showToast('Đã sao chép số tài khoản');
          setTimeout(function () { b.innerHTML = ICON_COPY; b.classList.remove('done'); }, 1800);
        }, function () { showToast('Không sao chép được, bạn hãy giữ vào số để chép nhé'); });
      });
      wrap.appendChild(b);
    }
    addCopyButton('w-k0vu3e5e'); addCopyButton('w-mfcmc4sy');

    function show(k) {
      Object.keys(P).forEach(function (key) { P[key].classList.toggle('wc-open', key === k); P[key].classList.toggle('d-none', key !== k); });
      P[k].querySelectorAll('.is-animation').forEach(function (n) { n.classList.add('animation'); });
    }
    function open() { backdrop.classList.remove('d-none'); show(SIDE_KEY); }
    function close() {
      backdrop.classList.add('d-none');
      Object.keys(P).forEach(function (key) { P[key].classList.remove('wc-open'); P[key].classList.add('d-none'); });
    }
    btn.style.cursor = 'pointer';
    btn.addEventListener('click', function (e) { e.preventDefault(); open(); });
    backdrop.addEventListener('click', close);
    ['w-w7jquvg1', 'w-tc72d3cx'].forEach(function (id) { var x = $(id); if (x) { x.style.cursor = 'pointer'; x.addEventListener('click', close); } });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  });
})();
