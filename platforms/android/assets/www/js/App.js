/**
 * @author Eyal Godovich <eyal@godovich.com>
 */
var App = {

    // Application Constructor
    initialize: function() {

        // Debug
        debug('App started.');

        // Bind Events
        document.addEventListener('deviceready', App.onDeviceReady, true);
        document.addEventListener("backbutton", App.onBackKeyDown, true);

    },

    // onDeviceReady event callback
    onDeviceReady: function() {

        // Hide splash screen after a second
        setTimeout(navigator.splashscreen.hide, 1000);

    },

    onBackKeyDown: function() {

        if(document.querySelectorAll('.dialog.active').length > 0) {
            return;
        }

        // Get the pages
        var pages  = document.getElementById('content').children;

        // Exit the application if there's only one page
        if(pages.length <= 1) {

            // Ask the user once
            if(document.getElementsByClassName('dialog').length == 0) {
                var confirm = phonon.confirm("האם ברצונך לצאת מהאפליקציה?", "יציאה", true, "צא", "חזור");
                confirm.on('confirm', navigator.app.exitApp);
            }

            return;
        }

        // Set the previous page as the new current page
        pages[pages.length - 2].className = "current_page";

        // Get the current page
        var page = pages[pages.length - 1];

        // Remove the associated script
        document.getElementById("js_" + page.id).remove();

        // Remove the associated stylesheet
        document.getElementById("css_" + page.id).disabled = true;
        document.getElementById("css_" + page.id).remove();

        // Remove the page
        page.remove();
    },

    ShowLoadingAnimation: function() {
        document.getElementById('loading').className = "loading";
        document.getElementById('content').style = "display: none;";
    },

    HideLoadingAnimation: function() {
        document.getElementById('loading').className = "loading hidden";
        document.getElementById('content').style = "";
    },

    // Page mechanism
    LoadPage: function(page, callback) {

        App.ShowLoadingAnimation();

        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState === 4) {
                if(xmlhttp.status === 200) {

                    // Remove the old page
                    var current = document.getElementsByClassName('current_page');
                    if(current.length > 0) current[0].className = "hidden_page";

                    // Create a new page
                    var page_element = document.createElement("div");
                    page_element.id = "page_" + page;
                    page_element.className ="current_page";
                    page_element.innerHTML = xmlhttp.responseText;

                    // Load the script for the page
                    var script = document.createElement('script');
                    script.type = "text/javascript";
                    script.src = "js/pages/" + page.charAt(0).toUpperCase() + page.slice(1) + ".js";
                    script.id = "js_page_" + page;
                    document.getElementById('pages_scripts').appendChild(script);

                    // Load the style for the page
                    var link = document.createElement('link');
                    link.href = "css/pages/" + page + ".css";
                    link.rel = "stylesheet";
                    link.id = "css_page_" + page;
                    document.head.appendChild(link);

                    // Add the content
                    document.getElementById('content').appendChild(page_element);

                    debug('Loaded \'pages/' + page + '.html\'' );
                    if(callback != undefined) callback();

                    return;
                }

                error('XMLHTTP Request failed.\nFile: ' + page + '\nError Code: ' + xmlhttp.status);
            }
        };

        xmlhttp.open("GET", 'pages/' + page + '.html' , true);
        xmlhttp.send();
    },

    SendRequest: function(type, data, callback, failed) {

        // Create the Http request object
        var xhttp = new XMLHttpRequest();

        // Set the url
        xhttp.open("POST", "http://46.101.219.123/api/" + type, true);

        // Set the headers
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");

        // Build the parameter list
        var params = "";
        for (var key in data) {
            params += (params != "" ? "&" : "") + key + "=" + encodeURIComponent(data[key]);
        }

        // Set callback
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4) {
                if(xhttp.status == 200) {
                    if(callback != undefined) callback(JSON.parse(xhttp.responseText));
                    return;
                }
                else {
                    if(failed != undefined) failed();
                    return false;
                }
            }
        };

        // Send the request
        xhttp.send(params);
    }
};


App.LoadPage("main", App.initialize);
