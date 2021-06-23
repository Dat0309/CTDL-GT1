(function () {
    "use strict";

    var ui = WinJS.UI;

    ui.Pages.define("/pages/items/items.html", {
        // Zavolání této funkce inicializuje stránku.
        init: function (element, options) {
            this.itemInvoked = ui.eventHandler(this._itemInvoked.bind(this));
        },

        // Tato funkce je volána vždy, kdy uživatel přejde na tuto stránku.
        ready: function (element, options) {
        },

        // Tato funkce aktualizuje rozložení stránky v reakci na změny rozložení.
        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Reagovat na změny v rozložení.
        },

        _itemInvoked: function (args) {
            var groupKey = Data.groups.getAt(args.detail.itemIndex).key;
            WinJS.Navigation.navigate("/pages/split/split.html", { groupKey: groupKey });
        }
    });
})();
