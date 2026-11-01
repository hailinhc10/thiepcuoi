        (function () {
            var C = CONFIG, T = C.telegram || {}, Y = C.thankYou || {};
            var form = document.getElementById('hl53suyf'), btnBox = document.getElementById('w-klql4ysp');
            if (!form || !btnBox) return;
            var btnText = btnBox.querySelector('.button-text'), sending = false, orig = btnText ? btnText.textContent : '';
            /* chống spam: ô bẫy ẩn cho bot + giãn cách giữa các lần gửi */
            var trap = document.createElement('input'); trap.type = 'text'; trap.name = 'website'; trap.tabIndex = -1; trap.autocomplete = 'off'; trap.setAttribute('aria-hidden', 'true');
            trap.style.cssText = 'position:absolute;left:-9999px;width:1px;height:1px;opacity:0'; form.appendChild(trap);
            var COOL = ((T.cooldownSeconds != null ? T.cooldownSeconds : 30) * 1000);
            function lastSent() { try { return +localStorage.getItem('rsvp_last') || 0; } catch (e) { return 0; } }
            function markSent() { try { localStorage.setItem('rsvp_last', String(Date.now())); } catch (e) {} }

            /* popup cảm ơn */
            var wrap = document.createElement('div'); wrap.id = 'ty-wrap'; wrap.setAttribute('role', 'dialog'); wrap.setAttribute('aria-modal', 'true');
            wrap.innerHTML = '<div id="ty-box"><div id="ty-heart">&#10084;</div><div id="ty-title"></div><div id="ty-msg"></div><button id="ty-btn" type="button"></button></div>';
            document.body.appendChild(wrap);
            var toastEl = document.createElement('div'); toastEl.id = 'rsvp-toast'; toastEl.setAttribute('role', 'status'); document.body.appendChild(toastEl);
            function toast(t) { toastEl.textContent = t; toastEl.classList.add('show'); clearTimeout(toast._t); toast._t = setTimeout(function () { toastEl.classList.remove('show'); }, 2800); }
            function closeTy() { wrap.classList.remove('show'); }
            wrap.addEventListener('click', function (e) { if (e.target === wrap) closeTy(); });
            document.getElementById('ty-btn').addEventListener('click', closeTy);
            document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeTy(); });
            function hearts() {
                if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
                for (var i = 0; i < 16; i++) {
                    var h = document.createElement('span'); h.className = 'ty-fall'; h.textContent = '\u2764';
                    h.style.cssText = 'left:' + (Math.random() * 100) + 'vw;font-size:' + (14 + Math.random() * 18) + 'px;animation-duration:' + (3 + Math.random() * 3) + 's;animation-delay:' + (Math.random() * 1.2) + 's;--dx:' + ((Math.random() - .5) * 120) + 'px';
                    document.body.appendChild(h); setTimeout(function (x) { return function () { x.remove(); }; }(h), 7000);
                }
            }
            function showThanks(name) {
                document.getElementById('ty-title').textContent = Y.title || 'Cảm Ơn Bạn!';
                document.getElementById('ty-msg').textContent = String(Y.message || '').replace(/\{name\}/g, name);
                document.getElementById('ty-btn').textContent = Y.button || 'ĐÓNG';
                wrap.classList.add('show'); hearts(); document.getElementById('ty-btn').focus();
            }

            /* gửi tin nhắn */
            function cut(v, n) { v = String(v || '').trim(); return v.length > n ? v.slice(0, n) + '...' : v; }
            async function send(d) {
                var guestLink = new URLSearchParams(location.search).get('guest');
                var text = ['\uD83D\uDC8C LỜI CHÚC MỚI TỪ THIỆP CƯỚI',
                    '\uD83D\uDC64 Tên: ' + d.name,
                    '\uD83E\uDD1D Quan hệ: ' + (d.relation || '(không điền)'),
                    (d.attend.indexOf('Không') === 0 ? '\u274C' : '\u2705') + ' Tham dự: ' + d.attend,
                    '\uD83D\uDCAC Lời chúc: ' + (d.wish || '(không điền)'),
                    guestLink ? '\uD83D\uDD17 Link mời: ' + guestLink : '',
                    '\uD83D\uDD52 ' + new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })
                ].filter(Boolean).join('\n');
                if (T.endpoint) {
                    var r1 = await fetch(T.endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text: text, data: d }) });
                    if (!r1.ok) throw new Error('endpoint ' + r1.status);
                    return true;
                }
                if (T.botToken && T.chatId) {
                    var r2 = await fetch('https://api.telegram.org/bot' + T.botToken + '/sendMessage', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ chat_id: T.chatId, text: text, disable_web_page_preview: true }) });
                    var j = await r2.json();
                    if (!j.ok) throw new Error(j.description || 'telegram error');
                    return true;
                }
                console.warn('[RSVP] Chưa cấu hình Telegram trong CONFIG.telegram nên tin nhắn chưa được gửi đi.');
                return false;
            }

            async function handle() {
                if (sending) return;
                var name = form.querySelector('[name="full_name"]').value.trim();
                var sel = form.querySelector('[name="select_1"]');
                if (!name) { toast('Bạn vui lòng nhập tên nhé!'); form.querySelector('[name="full_name"]').focus(); return; }
                if (!sel.value) { toast('Bạn vui lòng chọn có tham dự hay không nhé!'); return; }
                var data = { name: cut(name, 100), relation: cut(form.querySelector('[name="text_input_1"]').value, 100), wish: cut(form.querySelector('[name="text_input_2"]').value, 1000), attend: sel.value };
                if (trap.value) { form.reset(); showThanks(data.name); return; }
                if (Date.now() - lastSent() < COOL) { toast('Bạn vừa gửi xong rồi, đợi một chút rồi gửi lại nhé!'); return; }
                sending = true; if (btnText) btnText.textContent = 'ĐANG GỬI...'; btnBox.style.opacity = '.7';
                var ok = false;
                try { await send(data); ok = true; }
                catch (err) { console.error('[RSVP]', err); toast('Gửi chưa được, bạn thử lại giúp mình nhé!'); }
                sending = false; if (btnText) btnText.textContent = orig; btnBox.style.opacity = '';
                if (ok) { markSent(); form.reset(); showThanks(data.name); }
            }
            btnBox.addEventListener('click', function (e) { e.preventDefault(); handle(); });
            form.addEventListener('submit', function (e) { e.preventDefault(); handle(); });
        })();
        
