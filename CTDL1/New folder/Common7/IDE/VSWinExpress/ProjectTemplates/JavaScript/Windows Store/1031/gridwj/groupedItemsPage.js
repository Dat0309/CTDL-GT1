(function () {
    "use strict";

    var nav = WinJS.Navigation;
    var ui = WinJS.UI;

    ui.Pages.define("/pages/groupedItems/groupedItems.html", {
        // Diese Funktion wird zum Initialisieren der Seite aufgerufen.
        init: function (element, options) {
            this.groupHeaderInvoked = ui.eventHandler(this._groupHeaderInvoked.bind(this));
            this.itemInvoked = ui.eventHandler(this._itemInvoked.bind(this));
        },

        // Diese Funktion wird immer aufgerufen, wenn ein Benutzer zu dieser Seite wechselt.
        ready: function (element, options) {
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Auf Änderungen im Layout reagieren.
        },

        _groupHeaderInvoked: function (args) {
            var group = Data.groups.getAt(args.detail.groupHeaderIndex);
            nav.navigate("/pages/groupDetail/groupDetail.html", { groupKey: group.key });
        },

        _itemInvoked: function (args) {
            var item = Data.items.getAt(args.detail.itemIndex);
            nav.navigate("/pages/itemDetail/itemDetail.html", { item: Data.getItemReference(item) });
        }
    });
})();
