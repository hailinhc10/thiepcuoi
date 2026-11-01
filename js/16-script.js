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
        
