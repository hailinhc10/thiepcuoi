                                    document.addEventListener("DOMContentLoaded", function() {
                                        const audio = document.getElementById("background-music");
                                        const toggleButton = document.getElementById("music-toggle");
                                        const playIcon = document.getElementById("play-icon");
                                        // PNG (nhạc tắt)
                                        const pauseIcon = document.getElementById("pause-icon");
                                        // GIF (nhạc bật)

                                        audio.volume = 0.6;
                                        let isPlaying = false;
                                        let hasStarted = false;

                                        function setUI(playing) {
                                            if (playing) {
                                                playIcon.style.display = "none";
                                                pauseIcon.style.display = "block";
                                                toggleButton.classList.add("vibrating");
                                            } else {
                                                playIcon.style.display = "block";
                                                pauseIcon.style.display = "none";
                                                toggleButton.classList.remove("vibrating");
                                            }
                                        }

                                        const startOnce = () => {
                                            if (!hasStarted) {
                                                audio.play().then( () => {
                                                    isPlaying = true;
                                                    hasStarted = true;
                                                    setUI(true);
                                                }
                                                ).catch( () => {
                                                    setUI(false);
                                                }
                                                );
                                            }
                                        }
                                        ;

                                        document.body.addEventListener("click", startOnce, {
                                            once: true
                                        });
                                        document.body.addEventListener("touchstart", startOnce, {
                                            once: true,
                                            passive: true
                                        });

                                        toggleButton.addEventListener("click", function(event) {
                                            event.stopPropagation();
                                            if (isPlaying) {
                                                audio.pause();
                                                isPlaying = false;
                                                setUI(false);
                                            } else {
                                                audio.play().then( () => {
                                                    isPlaying = true;
                                                    hasStarted = true;
                                                    setUI(true);
                                                }
                                                ).catch( () => {}
                                                );
                                            }
                                        });

                                        audio.addEventListener("play", () => {
                                            isPlaying = true;
                                            setUI(true);
                                        }
                                        );
                                        audio.addEventListener("pause", () => {
                                            isPlaying = false;
                                            setUI(false);
                                        }
                                        );
                                    });
                                
