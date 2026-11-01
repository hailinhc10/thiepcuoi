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
        
