/// <reference path="../App.js" />

(function () {
    "use strict";

    // $loc_script_Read_Home_js_comment1$
    Office.initialize = function (reason) {
        $(document).ready(function () {
            app.initialize();

            displayItemDetails();
        });
    };

    // $loc_script_Read_Home_js_comment2$
    function displayItemDetails() {
        var item = Office.cast.item.toItemRead(Office.context.mailbox.item);
        $('#subject').text(item.subject);

        var from;
        if (item.itemType === Office.MailboxEnums.ItemType.Message) {
            from = Office.cast.item.toMessageRead(item).from;
        } else if (item.itemType === Office.MailboxEnums.ItemType.Appointment) {
            from = Office.cast.item.toAppointmentRead(item).organizer;
        }

        if (from) {
            $('#from').text(from.displayName);
            $('#from').click(function () {
                app.showNotification(from.displayName, from.emailAddress);
            });
        }
    }
})();