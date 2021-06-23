(function () {
    "use strict";

    var nav = WinJS.Navigation;
    var ui = WinJS.UI;

    ui.Pages.define("/pages/groupedItems/groupedItems.html", {
        // 呼叫這個函式以初始化頁面。
        init: function (element, options) {
            this.groupHeaderInvoked = ui.eventHandler(this._groupHeaderInvoked.bind(this));
            this.itemInvoked = ui.eventHandler(this._itemInvoked.bind(this));
        },

        // 每當使用者巡覽至此頁面時，就會呼叫這個函式。
        ready: function (element, options) {
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO:  回應配置的變更。
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
