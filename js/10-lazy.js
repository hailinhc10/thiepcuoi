            let elements = [];
            function handleLazyLoad() {
                let e = new WeakMap;
                elements.forEach(t => {
                    let a = window.scrollY || window.scrollTop || 0
                      , l = window.innerHeight || window.clientHeight || 0
                      , r = t.getBoundingClientRect();
                    if (!r.top && !r.left && !r.right && !r.bottom)
                        return;
                    let s = (r.y || r.top) + a;
                    !(s >= a + 2 * l || s + t.offsetHeight <= a) && (e.set(t, 1),
                    t.classList.contains("lazy") && t.classList.remove("lazy"),
                    t.hasAttribute("data-src") && (t.src = t.getAttribute("data-src"),
                    t.removeAttribute("data-src")))
                }
                ),
                (elements = elements.filter(t => !e.get(t))).length || window.removeEventListener("scroll", handleLazyLoad, {
                    passive: !0
                })
            }
            document.querySelectorAll(".lazy, [data-src]").forEach(e => elements.push(e)),
            elements.sort( (e, t) => ~~getComputedStyle(e).getPropertyValue("--type") - getComputedStyle(t).getPropertyValue("--type")),
            window.addEventListener("scroll", handleLazyLoad, {
                passive: !0
            }),
            "interactive" == document.readyState ? handleLazyLoad() : document.addEventListener("DOMContentLoaded", () => handleLazyLoad());
        
