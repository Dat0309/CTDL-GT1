(function () {
    "use strict";

    var ui = WinJS.UI;

    ui.Pages.define("/pages/items/items.html", {
        // この関数は、ページを初期化するために呼び出されます。
        init: function (element, options) {
            this.itemInvoked = ui.eventHandler(this._itemInvoked.bind(this));
        },

        // この関数は、ユーザーがこのページに移動するたびに呼び出されます
        ready: function (element, options) {
        },

        // この関数は、レイアウトの変更に応じてページ レイアウトを更新します。
        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO:  レイアウトの変更に対応します。
        },

        _itemInvoked: function (args) {
            var groupKey = Data.groups.getAt(args.detail.itemIndex).key;
            WinJS.Navigation.navigate("/pages/split/split.html", { groupKey: groupKey });
        }
    });
})();
