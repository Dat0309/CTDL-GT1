(function () {
    "use strict";

    var ui = WinJS.UI;

    ui.Pages.define("/pages/items/items.html", {
        // 初始化该页面时将调用此函数。
        init: function (element, options) {
            this.itemInvoked = ui.eventHandler(this._itemInvoked.bind(this));
        },

        // 每当用户导航至该页面时都要调用此函数。
        ready: function (element, options) {
        },

        // 此功能更新页面布局以响应布局更改。
        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO:  响应布局的更改。
        },

        _itemInvoked: function (args) {
            var groupKey = Data.groups.getAt(args.detail.itemIndex).key;
            WinJS.Navigation.navigate("/pages/split/split.html", { groupKey: groupKey });
        }
    });
})();
