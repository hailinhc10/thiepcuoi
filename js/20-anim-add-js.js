            (function () {
                var els = [].slice.call(document.querySelectorAll('.is-animation'));
                function play(el) { el.classList.add('animation'); }

                /* 1. Hiệu ứng khi lướt tới: thêm class "animation" -> kích hoạt animate.css đã khai báo sẵn cho từng phần tử */
                if (!('IntersectionObserver' in window)) { els.forEach(play); }
                else {
                    var io = new IntersectionObserver(function (es) {
                        var k = 0;
                        es.forEach(function (e) {
                            if (e.isIntersecting) {
                                /* so le nhẹ 0.12s giữa các phần tử cùng xuất hiện, tối đa 0.5s */
                                e.target.style.setProperty('--wc-d', Math.min(k++ * 0.12, 0.5) + 's');
                                play(e.target); io.unobserve(e.target);
                            }
                        });
                    }, { threshold: 0.1 });
                    els.forEach(function (el) { io.observe(el); });
                }

                /* 2. Bấm vào thiệp để mở: ẩn thiệp đóng, hiện thiệp mở, ảnh trượt lên, tên cô dâu chú rể */
                function g(id) { return document.getElementById('w-' + id); }
                function show(id) { var e = g(id); if (e) e.style.display = 'block'; }
                function hide(id) { var e = g(id); if (e) e.style.display = 'none'; }
                var card = g('3subauj7');
                if (card) {
                    card.setAttribute('role', 'button'); card.setAttribute('tabindex', '0'); card.setAttribute('aria-label', 'Mở thiệp mời');
                    card.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.click(); } });
                    card.addEventListener('click', function () {
                        hide('3subauj7'); hide('1qpgocgm');
                        show('q1wlsumy'); show('7garfe9k'); show('3udt7eao');
                        show('dqyi2rbc'); show('oob4nyp3');
                        /* FIX: go lazy + chay animation ngay khi bam (khong cho luot xuong) */
                        ['q1wlsumy','7garfe9k','3udt7eao','dqyi2rbc','oob4nyp3'].forEach(function (id) {
                            var el = g(id); if (!el) return;
                            el.querySelectorAll('.lazy').forEach(function (n) { n.classList.remove('lazy'); });
                            if (el.classList.contains('lazy')) el.classList.remove('lazy');
                            if (el.classList.contains('is-animation')) {
                                requestAnimationFrame(function () { el.classList.add('animation'); });
                            }
                        });
                        if (typeof handleLazyLoad === 'function') setTimeout(handleLazyLoad, 50);
                    });
                }
            })();
        
