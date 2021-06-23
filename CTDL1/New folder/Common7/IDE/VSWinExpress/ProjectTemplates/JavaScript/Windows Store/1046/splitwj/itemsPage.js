(function () {
    "use strict";

    var ui = WinJS.UI;

    ui.Pages.define("/pages/items/items.html", {
        // Esta função é chamada para inicializar a página.
        init: function (element, options) {
            this.itemInvoked = ui.eventHandler(this._itemInvoked.bind(this));
        },

        // Esta função é chamada sempre que um usuário navega para esta página.
        ready: function (element, options) {
        },

        // Esta função atualiza o layout da página em resposta a alterações do layout.
        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Responda a alterações no layout.
        },

        _itemInvoked: function (args) {
            var groupKey = Data.groups.getAt(args.detail.itemIndex).key;
            WinJS.Navigation.navigate("/pages/split/split.html", { groupKey: groupKey });
        }
    });
})();
