#!/usr/bin/python

import sys

page_name = str(sys.argv[1]).lower()
c_page_name = page_name.capitalize()

print('Creating ' + c_page_name)


# Create the CSS File
text_file = open("www/css/pages/" + page_name + ".css", "w")
text_file.close()

# Create the JS File
text_file = open("www/js/pages/" + c_page_name + ".js", "w")
long_string_js = """
var %CAPITAL_NAME% = new Vue({

   // The page element id
   el: '#page_%NAME%',

   // Data variables
   data: {

   },

   // Methods
   methods: {

       // The main function
       onLoad: function() {
           debug('\\'%CAPITAL_NAME%\\' module initialized.');

           // Hide the loading animation
           App.HideLoadingAnimation();
       }

   },
});

// Trigger the main function
%CAPITAL_NAME%.onLoad();
""".replace('%CAPITAL_NAME%', c_page_name).replace('%NAME%', page_name)
text_file.write(long_string_js)
text_file.close()


# Create the HTML File
string_text  = '<!-- File: ' + c_page_name  + '.html !-->'
text_file = open("www/pages/" + page_name + ".html", "w")
text_file.write(string_text)
text_file.close()
