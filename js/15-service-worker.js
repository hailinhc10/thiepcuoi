            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.getRegistrations().then(registrations => {
                    registrations.forEach(registration => registration.unregister())
                }
                )
                //  navigator.serviceWorker.register("/render_v4/sw-1d007bdb785710dc7184fc543acf7fa3.js?vsn=d", {scope: './'}).then(function() {
                //    console.log('Register service Worker successful!')
                //  }).catch(function(error) {
                //    console.log(error, 'error register service worker!')
                //  });
            }
        
