/* $loc_script_Visualization_App_js_comment1$ */

var app = (function () {
    'use strict';

    var app = {};

    app.bindingID = 'myBinding';

    // $loc_script_Visualization_App_js_comment3$
    app.initialize = function () {
        $('body').append(
            '<div id="notification-message">' +
                '<div class="padding">' +
                    '<div id="notification-message-close"></div>' +
                    '<div id="notification-message-header"></div>' +
                    '<div id="notification-message-body"></div>' +
                '</div>' +
            '</div>');

        $('#notification-message-close').click(function () {
            $('#notification-message').hide();
        });


        // $loc_script_Visualization_App_js_comment4$
        app.showNotification = function (header, text) {
            $('#notification-message-header').text(header);
            $('#notification-message-body').text(text);
            $('#notification-message').slideDown('fast');
        };
    };

    return app;
})();