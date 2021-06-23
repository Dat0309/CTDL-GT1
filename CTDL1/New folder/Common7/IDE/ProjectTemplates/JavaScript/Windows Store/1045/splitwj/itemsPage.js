(function () {
    "use strict";

    var ui = WinJS.UI;

    ui.Pages.define("/pages/items/items.html", {
        // Funkcja wywoływana, aby zainicjować stronę.
        init: function (element, options) {
            this.itemInvoked = ui.eventHandler(this._itemInvoked.bind(this));
        },

        // Ta funkcja jest wywoływana, gdy użytkownik przechodzi do tej strony.
        ready: function (element, options) {
        },

        // Ta funkcja aktualizuje układ strony w odpowiedzi na zmiany układu.
        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Odpowiedz na zmiany w układzie.
        },

        _itemInvoked: function (args) {
            var groupKey = Data.groups.getAt(args.detail.itemIndex).key;
            WinJS.Navigation.navigate("/pages/split/split.html", { groupKey: groupKey });
        }
    });
})();
