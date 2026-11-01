                                    (function() {
                                        const HEART_SRC = CONFIG.calendar.heart;

                                        const titleEl = document.getElementById("wc-cal-title");
                                        const cal = document.getElementById("wc-cal-target");
                                        if (!cal || !titleEl)
                                            return;
                                        const gridEl = cal.querySelector("[data-cal-grid]");

                                        const dowsVi = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
                                        const dowsEn = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

                                        const monthFullEn = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];

                                        function renderCalendar(days, month, year) {
                                            if (!gridEl)
                                                return;

                                            // ⭐ TIÊU ĐỀ (ENGLISH ALL CAPS)
                                            if (CAL_LANG === "en") {
                                                titleEl.textContent = monthFullEn[month - 1] + " - " + year;
                                            } // ⭐ TIÊU ĐỀ VIỆT
                                            else {
                                                titleEl.textContent = "THÁNG " + month + " - " + year;
                                            }

                                            gridEl.innerHTML = "";

                                            const dows = (CAL_LANG === "en") ? dowsEn : dowsVi;
                                            dows.forEach(d => {
                                                const div = document.createElement("div");
                                                div.className = "wc-cal-dow";
                                                div.textContent = d;
                                                gridEl.appendChild(div);
                                            }
                                            );

                                            const first = new Date(year,month - 1,1);
                                            const total = new Date(year,month,0).getDate();

                                            let offset, isSundayColFn;

                                            if (CAL_LANG === "en") {
                                                offset = first.getDay();
                                                // 0=Sun..6=Sat
                                                isSundayColFn = col => col === 0;
                                            } else {
                                                offset = (first.getDay() + 6) % 7;
                                                isSundayColFn = col => col === 6;
                                            }

                                            for (let i = 0; i < offset; i++) {
                                                const empty = document.createElement("div");
                                                empty.className = "wc-cal-day wc-cal-empty";
                                                gridEl.appendChild(empty);
                                            }

                                            for (let d = 1; d <= total; d++) {
                                                const cell = document.createElement("div");
                                                cell.className = "wc-cal-day";

                                                const index = offset + (d - 1);
                                                const col = index % 7;

                                                if (isSundayColFn(col)) {
                                                    cell.classList.add("wc-cal-day--sun");
                                                }

                                                const span = document.createElement("span");
                                                span.className = "wc-cal-day-span";
                                                span.textContent = d;
                                                cell.appendChild(span);

                                                if (days.includes(d)) {
                                                    cell.classList.add("wc-cal-day--selected");
                                                    const img = document.createElement("img");
                                                    img.src = HEART_SRC;
                                                    img.className = "wc-cal-heart";
                                                    cell.appendChild(img);
                                                }

                                                gridEl.appendChild(cell);
                                            }
                                        }

                                        function parseInput(str) {
                                            const match = str.match(/^([\d,\s]+)[\/\.\-](\d{1,2})[\/\.\-](\d{4})$/);
                                            if (!match)
                                                return;

                                            const dayList = match[1].split(",").map(x => parseInt(x.trim(), 10)).filter(x => !isNaN(x));

                                            const month = parseInt(match[2], 10);
                                            const year = parseInt(match[3], 10);

                                            renderCalendar(dayList, month, year);
                                        }

                                        parseInput(DATE_INPUT || "");

                                    }
                                    )();
                                
