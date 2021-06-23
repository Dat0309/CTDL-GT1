(function () {
    "use strict";

    var ui = WinJS.UI;

    ui.Pages.define("/pages/groupDetail/groupDetail.html", {
        /// <field type="WinJS.Binding.List" />
        _items: null,

        // この関数は、ページを初期化するために呼び出されます。
        init: function (element, options) {
            var group = Data.resolveGroupReference(options.groupKey);
            this._items = Data.getItemsFromGroup(group);
            this._pageTitle = group.title;
            var pageList = this._items.createGrouped(
                function groupKeySelector(item) { return group.key; },
                function groupDataSelector(item) { return group; }
            );
            this.groupDataSource = pageList.groups.dataSource;
            this.itemDataSource = pageList.dataSource;
            this.itemInvoked = ui.eventHandler(this._itemInvoked.bind(this));
        },

        // この関数は、ユーザーがこのページに移動するたびに呼び出されます 
        ready: function (element, options) {
            element.querySelector("header[role=banner] .pagetitle").textContent = this._pageTitle;
        },

        unload: function () {
            this._items.dispose();
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO:  レイアウトの変更に対応します。
        },

        _itemInvoked: function (args) {
            var item = this._items.getAt(args.detail.itemIndex);
            WinJS.Navigation.navigate("/pages/itemDetail/itemDetail.html", { item: Data.getItemReference(item) });
        }
    });
})();
