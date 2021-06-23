(function () {
    "use strict";

    var nav = WinJS.Navigation;
    var ui = WinJS.UI;

    ui.Pages.define("/pages/groupedItems/groupedItems.html", {
        // Эта функция вызывается для инициализации страницы.
        init: function (element, options) {
            this.groupHeaderInvoked = ui.eventHandler(this._groupHeaderInvoked.bind(this));
            this.itemInvoked = ui.eventHandler(this._itemInvoked.bind(this));
        },

        // Эта функция вызывается каждый раз, когда пользователь переходит на данную страницу.
        ready: function (element, options) {
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Ответ на изменения в макете.
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
