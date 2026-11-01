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
        
