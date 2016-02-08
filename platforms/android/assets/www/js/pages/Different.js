// THIS IS AN EXAMPLE.

var Different = new Vue({
    el: '#page_different',

    data: {

        // Data here
        msg: 'הצג מיקום'

    },

    methods: {

        // Methods here
        show_alert: function() {
            this.msg = 'משיג מיקום...';

            getCurrentLocation(
                function(position) {
                    var loc = position.coords.latitude + ', ' + position.coords.longitude;

                    // Get the name of the place from the server
                    App.SendRequest(
                        'address',
                        {
                            address: loc
                        },

                        // Success
                        function(response) {
                            alert(response.city);
                            this.msg = "הצג מקום";
                        }.bind(this),

                        // Error
                        function() {
                            alert('Error reaching the server!');
                            this.msg = "הצג מקום";
                        }.bind(this)
                    );

                }.bind(this),

                function(error) {
                    alert('שגיאה: ' + error);
                    this.msg = "הצג מקום";
                }.bind(this)
            );
        },

        onLoad: function() {
            debug('\'Different\' module initialized.');

            // Hide the loading animation
            App.HideLoadingAnimation();
        }

    }
});

Different.onLoad();
