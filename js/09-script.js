            !function() {
                var A, o;
                A = function(A) {
                    window.is_support_webp = A
                }
                ,
                (o = new Image).onload = function() {
                    A(o.width > 0 && o.height > 0)
                }
                ,
                o.onerror = function() {
                    A(!1)
                }
                ,
                o.src = "data:image/webp;base64," + ({
                    lossless: "UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA=="
                }).lossless
            }();
        
