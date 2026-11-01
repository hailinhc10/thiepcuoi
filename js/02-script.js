            /* Thiệp thiết kế rộng 420px. Chỉ đặt width=420: trình duyệt điện thoại tự co/giãn vừa khít màn hình,
               không phụ thuộc innerWidth (lúc mới load có thể là 980px nên tính scale tay sẽ bị lệch). */
            (function (d) {
                window.DISPLAY = "mobile";
                var m = d.querySelector('meta[name="viewport"]');
                if (!m) { m = d.createElement("meta"); m.name = "viewport"; d.head.appendChild(m); }
                m.setAttribute("content", "width=420, viewport-fit=cover");
            })(document);
        
