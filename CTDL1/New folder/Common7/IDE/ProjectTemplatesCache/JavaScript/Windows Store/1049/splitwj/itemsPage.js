(function () {
    "use strict";

    var ui = WinJS.UI;

    ui.Pages.define("/pages/items/items.html", {
        // Эта функция вызывается для инициализации страницы.
        init: function (element, options) {
            this.itemInvoked = ui.eventHandler(this._itemInvoked.bind(this));
        },

        // Эта функция вызывается каждый раз, когда пользователь переходит на данную страницу.
        ready: function (element, options) {
        },

        // Эта функция обновляет макет страницы в ответ на изменения макета.
        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Ответ на изменения в макете.
        },

        _itemInvoked: function (args) {
            var groupKey = Data.groups.getAt(args.detail.itemIndex).key;
            WinJS.Navigation.navigate("/pages/split/split.html", { groupKey: groupKey });
        }
    });
})();
