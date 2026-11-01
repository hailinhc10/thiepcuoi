/* ==== 12-script.js ==== */
window.gtracks = [];
            window.gga = "";
            window.ggt = "";
            window.ggads = "";
;
/* ==== 13-script.js ==== */
window.pageViewConverID = "webcake.1vtfygp8jt";
            window.viewContentConverID = "webcake.zlrkehslev"
;
/* ==== 14-script.js ==== */
window.page_language = "default"
            window.page_currency = "VND"

            Object.defineProperty(window, 'ORGANIZATION_ID', {
                value: 89397,
                writable: false,
                configurable: false
            })
;
/* ==== 15-service-worker.js ==== */
if ('serviceWorker' in navigator) {
                navigator.serviceWorker.getRegistrations().then(registrations => {
                    registrations.forEach(registration => registration.unregister())
                }
                )
                //  navigator.serviceWorker.register("/render_v4/sw-1d007bdb785710dc7184fc543acf7fa3.js?vsn=d", {scope: './'}).then(function() {
                //    console.log('Register service Worker successful!')
                //  }).catch(function(error) {
                //    console.log(error, 'error register service worker!')
                //  });
            }
;
/* ==== 16-script.js ==== */
;(function() {
                const params = new URLSearchParams(window.location.search)
                const ref_url = params.get('ref_url')
                if (ref_url) {
                    window.open(ref_url, '_self')
                }
            }
            )()

            // Check if user interacted with page
            window.__user_interacted = false
            const handleInteraction = () => {
                window.__user_interacted = true

                document.removeEventListener('click', handleInteraction)
            }
            document.addEventListener('click', handleInteraction)
;
/* ==== 17-script.js ==== */
// Ignore animate on url params
            ;(function() {
                const params = new URLSearchParams(window.location.search)
                const urlParams = new URLSearchParams(window.location.search);
                const animate = urlParams.get("animate");
                if (animate === 'false') {
                    const style = document.createElement('style')
                    style.textContent = '.no-animate * { transition: none!important; animation: none!important; }'
                    document.head.appendChild(style)
                    document.querySelector('.pageview')?.classList.add('no-animate')
                }
            }
            )()
;
/* ==== 18-script.js ==== */
const windowHeight = () => {
                const doc = document.documentElement
                doc.style.setProperty('--viewport-height', `${window.innerHeight}px`)
            }
            window.addEventListener('resize', windowHeight)
            windowHeight()
;
/* ==== 19-script.js ==== */
( () => {
                const SOURCE = ['facebook', 'fbclid', 'google', 'gclid', 'tiktok', 'ttclid', 'zalo', 'gidzl', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'utm_id', 'aff', 'wbraid', 'gbraid', 'ybai'];
                const params = new URLSearchParams(window.location.search);
                let found = false;
                // Try to restore previous referrerVars if present
                let referrerVars = {};
                try {
                    const cookieMatch = document.cookie.match(/(?:^|; )referrer_vars=([^;]*)/);
                    if (cookieMatch && cookieMatch[1]) {
                        referrerVars = JSON.parse(decodeURIComponent(cookieMatch[1]));
                    }
                } catch (e) {
                    referrerVars = {};
                }

                for (const key of SOURCE) {
                    if (params.has(key)) {
                        referrerVars[key] = params.get(key);
                        found = true;
                    }
                }

                if (found) {
                    // 30 days
                    referrerVars.referrer = window.location.href;
                    const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString();
                    document.cookie = `referrer_vars=${encodeURIComponent(JSON.stringify(referrerVars))}; expires=${expires}; path=${window.location.pathname}; samesite=none; secure`;
                }
            }
            )()
;
