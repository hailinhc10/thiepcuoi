                                    /**
 * ===================== TEXT REPLACER for WEBCAKE =====================
 * - Giữ nguyên markup/animation (không dùng innerHTML/textContent).
 * - Chỉ chỉnh nodeValue của text node.
 * - Tự bật white-space: pre-line nếu chuỗi có "\n".
 * =====================================================================
 */

                                    const MAPPING = buildMapping();

                                    /** Giữ markup: chỉ đổi nodeValue của text node */
                                    function setTextPreserve(el, newText) {
                                        if (!el)
                                            return;
                                        const tag = el.tagName?.toLowerCase?.();
                                        if (tag === "input" || tag === "textarea") {
                                            el.value = newText;
                                            return;
                                        }
                                        // Nếu có xuống dòng mà CSS chưa hiển thị, bật pre-line cục bộ
                                        if (newText.includes("\n")) {
                                            const ws = (el instanceof Element) ? getComputedStyle(el).whiteSpace : "normal";
                                            if (ws === "normal")
                                                el.style.whiteSpace = "pre-line";
                                        }
                                        // 1) ưu tiên text node trực tiếp
                                        const directText = Array.from(el.childNodes).find(n => n.nodeType === Node.TEXT_NODE && n.nodeValue.trim());
                                        if (directText) {
                                            directText.nodeValue = newText;
                                            return;
                                        }
                                        // 2) nếu text nằm sâu trong các span wrapper (phục vụ animation)
                                        const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, {
                                            acceptNode: n => n.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
                                        });
                                        const firstText = walker.nextNode();
                                        if (firstText)
                                            firstText.nodeValue = newText;
                                    }

                                    /** Đợi DOM + 1 frame: tránh ghi trước khi thư viện split text/animation chạy */
                                    function onReady(cb) {
                                        const run = () => requestAnimationFrame( () => setTimeout(cb, 0));
                                        if (document.readyState === "loading") {
                                            document.addEventListener("DOMContentLoaded", run, {
                                                once: true
                                            });
                                        } else {
                                            run();
                                        }
                                    }

                                    function applyMapping() {
                                        for (const {id, text} of MAPPING) {
                                            const el = document.getElementById(id);
                                            if (el)
                                                setTextPreserve(el, text);
                                        }
                                    }

                                    onReady(applyMapping);

                                    /** Nếu Webcake tái render/lazy → áp lại khi các ID mục tiêu xuất hiện */
                                    const idSet = new Set(MAPPING.map(m => m.id));
                                    const mo = new MutationObserver(muts => {
                                        for (const m of muts) {
                                            for (const node of m.addedNodes || []) {
                                                if (!(node instanceof Element))
                                                    continue;
                                                if (idSet.has(node.id)) {
                                                    applyMapping();
                                                    return;
                                                }
                                                for (const id of idSet) {
                                                    if (node.querySelector?.(`#${CSS.escape(id)}`)) {
                                                        applyMapping();
                                                        return;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    );
                                    mo.observe(document.documentElement, {
                                        childList: true,
                                        subtree: true
                                    });
                                
