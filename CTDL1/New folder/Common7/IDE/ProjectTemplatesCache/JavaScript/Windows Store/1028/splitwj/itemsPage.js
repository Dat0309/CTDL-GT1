(function () {
    "use strict";

    var ui = WinJS.UI;

    ui.Pages.define("/pages/items/items.html", {
        // 呼叫這個函式以初始化頁面。
        init: function (element, options) {
            this.itemInvoked = ui.eventHandler(this._itemInvoked.bind(this));
        },

        // 每當使用者巡覽至此頁面時，就會呼叫這個函式。
        ready: function (element, options) {
        },

        // 此函式會更新頁面配置以回應配置變更。
        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO:  回應配置的變更。
        },

        _itemInvoked: function (args) {
            var groupKey = Data.groups.getAt(args.detail.itemIndex).key;
            WinJS.Navigation.navigate("/pages/split/split.html", { groupKey: groupKey });
        }
    });
})();
