var Main = new Vue({
    el: '#page_main',
    data: {
        message: 'JS נטען בהצלחה'
    },

    methods: {

        change_page_example: function() {

            // Load pages/different.html
            App.LoadPage('different');
            
        },

        change_progress: function() {
            this.update_progress(Math.random()*80 + 20);
        },

        show_alert: function() {
            alert('שלום זוהי התראה');
        },

        update_progress: function(precent) {
            var element = document.getElementById('circle');
            precent = precent < 0 ? 0 : (precent > 100 ? 100 : precent);
            var val = parseInt(window.getComputedStyle(element)['stroke-dasharray'].slice(0, -1));
            var calc = val * (1 - (precent / 100));
            element.style['stroke-dashoffset'] = calc + 'px';
            document.getElementById('counter_text').innerHTML = (Math.round(precent / 100 * 60)) + ' שעות';
        },

        onLoad: function() {
            debug('\'Main\' module initialized.');

            // Hide the loading animation
            App.HideLoadingAnimation();
        }

    }
});

// Trigger the main function
Main.onLoad();
