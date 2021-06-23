/// <reference path="../App.js" />

(function () {
    "use strict";

    // $loc_home_initialize$
    Office.initialize = function (reason) {
        $(document).ready(function () {
            app.initialize();

            $('#get-data-from-selection').click(getDataFromSelection);
        });
    };

    // $loc_home_getDataFromSelection$
    function getDataFromSelection() {
        Office.context.document.getSelectedDataAsync(Office.CoercionType.Text,
            function (result) {
                if (result.status === Office.AsyncResultStatus.Succeeded) {
                    app.showNotification('$loc_home_NotificationTitle$', '"' + result.value + '"');
                } else {
                    app.showNotification('$loc_home_error$', result.error.message);
                }
            }
        );
    }
})();