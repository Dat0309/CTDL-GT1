/// <reference path="../App.js" />

(function () {
    "use strict";

    // $loc_script_Basic_Home_js_comment1$
    Office.initialize = function (reason) {
        $(document).ready(function () {
            app.initialize();

            $('#get-data-from-selection').click(getDataFromSelection);
        });
    };

    // $loc_script_Basic_Home_js_comment2$
    function getDataFromSelection() {
        if (Office.context.document.getSelectedDataAsync) {
            Office.context.document.getSelectedDataAsync(Office.CoercionType.Text,
                function (result) {
                    if (result.status === Office.AsyncResultStatus.Succeeded) {
                        app.showNotification('$loc_script_Basic_Home_js_comment3$', '"' + result.value + '"');
                    } else {
                        app.showNotification('$loc_script_Basic_Home_js_comment4$', result.error.message);
                    }
                }
            );
        } else {
            app.showNotification('$loc_script_Basic_Home_js_comment5$', '$loc_script_Basic_Home_js_comment6$');
        }
    }
})();