(function () {
    "use strict";

    var ui = WinJS.UI;

    ui.Pages.define("/pages/items/items.html", {
        // Diese Funktion wird zum Initialisieren der Seite aufgerufen.
        init: function (element, options) {
            this.itemInvoked = ui.eventHandler(this._itemInvoked.bind(this));
        },

        // Diese Funktion wird immer aufgerufen, wenn ein Benutzer zu dieser Seite wechselt.
        ready: function (element, options) {
        },

        // Diese Funktion aktualisiert das Seitenlayout als Reaktion auf Layoutänderungen.
        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Auf Änderungen im Layout reagieren.
        },

        _itemInvoked: function (args) {
            var groupKey = Data.groups.getAt(args.detail.itemIndex).key;
            WinJS.Navigation.navigate("/pages/split/split.html", { groupKey: groupKey });
        }
    });
})();
