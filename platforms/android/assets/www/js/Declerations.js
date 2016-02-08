/**
 * @author Eyal Godovich <eyal@godovich.com>
 */

// Override alert
window.alert = function(msg, title) {
    phonon.alert(msg, title == undefined ? "הודעה" : title, false, "אישור");
};

// Create the debug function
window.debug = function(msg, type) {
    StackTrace.get().then(
        function(stack) {
            console['debug'](
                '\n%c' + Array(50).join('-') +
                (window.frameElement ? ('\nDevice  : ' + (window.frameElement.id.split('-')[0] == 'iphone' ? 'iOS' : 'Android')) : '') +
                '\nFile    : ' + stack[2 + (type == 'error' ? 1 : 0)].fileName.replace(/^.*[\\\/]/, '') +
                '\nFunction: ' + stack[2 + (type == 'error' ? 1 : 0)].functionName +
                '\nLine    : ' + stack[2 + (type == 'error' ? 1 : 0)].lineNumber +
                '\nTime    : ' + new Date() +
                '\nMesesage: %c' +
                (msg.indexOf('\n') != -1 ? '\n\t' + msg.replace(/(?:\r\n|\r|\n)/g, '\n\t') : msg) +
                '\n%c' + Array(50).join('-') + '\n',

                'color:blue;',
                (type == 'error' ? 'color: red' : 'color: green'),
                'color: blue;'
            );
        }
    );
};

// Create the error function
window.error = function(msg) {
    window.debug(msg, 'error');
}
