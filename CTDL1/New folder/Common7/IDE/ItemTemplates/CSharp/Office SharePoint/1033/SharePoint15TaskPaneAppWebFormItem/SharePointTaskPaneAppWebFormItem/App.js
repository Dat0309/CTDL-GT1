/* $loc_app_js_summary$ */

var app = (function () {
    "use strict";

    var app = {};

    // $loc_app_initialize$
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


        // $loc_app_showNotification$
        app.showNotification = function (header, text) {
            $('#notification-message-header').text(header);
            $('#notification-message-body').text(text);
            $('#notification-message').slideDown('fast');
        };
    };

    return app;
})();