        (function () {
            var C = CONFIG, $ = function (i) { return document.getElementById(i); };
            function lines(el, t) {
                if (!el) return; el.textContent = '';
                String(t).split('\n').forEach(function (l) { el.appendChild(document.createTextNode(l)); el.appendChild(document.createElement('br')); });
            }
            document.title = C.title;
            if (C.description) { ['meta-desc', 'og-desc'].forEach(function (i) { var m = $(i); if (m) m.setAttribute('content', C.description); }); }
            var og = document.querySelector('meta[property="og:title"]'); if (og) og.setAttribute('content', C.title);

            /* Ảnh: gắn link trong CONFIG.images vào từng vị trí */
            var SLOTS = {"cardClosed": ["3subauj7"], "coverHeart": ["1qpgocgm"], "coverCornerBottom": ["nror0kl3", "12xknuxq"], "coverCornerTop": ["8yk4v0gc", "tbqkrbr8"], "cardOpenBack": ["q1wlsumy"], "envelopePhoto": ["7garfe9k"], "cardOpenFront": ["3udt7eao"], "coverSmallIcon": ["ohkl2lnj"], "inviteIcon": ["1u5rhi6o"], "inviteRing": ["1vrm5g0n"], "mainPhoto": ["4ccowrr5"], "trioLeft": ["oaf388po"], "trioMiddle": ["ilyy52iz"], "trioRight": ["cs7r30qb"], "mapIcon": ["q59jdd9d"], "album1": ["7m08afme"], "album2": ["gfr8kgrk"], "album3": ["je4g36sy"], "album4": ["hsmpqzdg"], "album5": ["izpls7dm"], "album6": ["qg9pg53z"], "album7": ["3i6z5fev"], "album8": ["z6mhywwk"], "album9": ["0g7le2fx"], "album10": ["v1luuevp"], "album11": ["lf73c5qo"], "closingBackground": ["sj86rf1m"], "closingFlower": ["iylwpged", "yuinkxlf"], "qrGroom": ["p8etkpq1"], "qrBride": ["olx95uxv"], "popupBackground": ["__popup_default__"]};
            Object.keys(SLOTS).forEach(function (k) {
                var u = C.images[k]; if (!u) return;
                SLOTS[k].forEach(function (id) {
                    var el = document.querySelector('#w-' + id + (id === '__popup_default__' ? ' .popup-background' : ' .image-background'));
                    if (el) el.style.backgroundImage = 'url("' + u + '")';
                });
            });

            /* Bản đồ */
            var a = $('w-i7ym6cbi'); if (a) { a.href = C.venue.mapLink; a.title = C.venue.mapLink; }
            var f = $('map-frame'); if (f) f.src = C.venue.mapEmbed;

            /* Nhạc */
            var au = $('background-music'); if (au) au.src = C.music.src;
            if ($('play-icon')) $('play-icon').src = C.music.playIcon;
            if ($('pause-icon')) $('pause-icon').src = C.music.pauseIcon;

            /* Số tài khoản */
            lines(document.querySelector('#w-k0vu3e5e .text-block-css'), C.bank.groom);
            lines(document.querySelector('#w-mfcmc4sy .text-block-css'), C.bank.bride);

            /* Chân trang */
            if ($('ft-quote')) $('ft-quote').textContent = '"' + C.footer.quote + '"';
            if ($('ft-names')) $('ft-names').textContent = C.footer.names;

            /* Tên khách: link dạng ...?guest=Tên */
            var guest = new URLSearchParams(location.search).get('guest') || C.guestDefault;
            lines(document.querySelector('#w-sods5ita .text-block-css'), guest);
        })();
        
