(function () {
    "use strict";

    var ui = WinJS.UI;

    ui.Pages.define("/pages/items/items.html", {
        // La funzione è chiamata per inizializzare la pagina.
        init: function (element, options) {
            this.itemInvoked = ui.eventHandler(this._itemInvoked.bind(this));
        },

        // La funzione viene chiamata quando un utente passa a questa pagina.
        ready: function (element, options) {
        },

        // La funzione aggiorna il layout della pagina in risposta alle modifiche di layout.
        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: rispondere alle modifiche nel layout.
        },

        _itemInvoked: function (args) {
            var groupKey = Data.groups.getAt(args.detail.itemIndex).key;
            WinJS.Navigation.navigate("/pages/split/split.html", { groupKey: groupKey });
        }
    });
})();
