            // Generate external id for pixel tracking
            window.getPixelExternalID = () => ( () => {
                var match = document.cookie.match(/(?:^|; )external_id=([^;]*)/);
                var id = match && match[1];

                if (!id) {
                    id = 'xxxxxxxxxxxxxxxx'.replace(/x/g, function() {
                        return Math.floor(Math.random() * 62).toString(36);
                    });
                    document.cookie = 'external_id=' + encodeURIComponent(id) + '; expires=' + new Date(Date.now() + 30 * 864e5).toUTCString() + '; path=/';
                }

                return decodeURIComponent(id);
            }
            )();
            window.pixel_external_id = window.getPixelExternalID();
        
