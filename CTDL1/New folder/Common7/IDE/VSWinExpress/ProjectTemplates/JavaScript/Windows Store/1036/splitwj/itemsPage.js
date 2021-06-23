(function () {
    "use strict";

    var ui = WinJS.UI;

    ui.Pages.define("/pages/items/items.html", {
        // Cette fonction est appelée pour initialiser la page.
        init: function (element, options) {
            this.itemInvoked = ui.eventHandler(this._itemInvoked.bind(this));
        },

        // Cette fonction est appelée chaque fois qu'un utilisateur accède à cette page.
        ready: function (element, options) {
        },

        // Cette fonction met à jour la mise en page en réponse aux modifications de disposition.
        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: répondez aux modifications de la disposition.
        },

        _itemInvoked: function (args) {
            var groupKey = Data.groups.getAt(args.detail.itemIndex).key;
            WinJS.Navigation.navigate("/pages/split/split.html", { groupKey: groupKey });
        }
    });
})();
