(function () {
    "use strict";

    var ui = WinJS.UI;

    ui.Pages.define("/pages/groupDetail/groupDetail.html", {
        /// <field type="WinJS.Binding.List" />
        _items: null,

        // 初始化该页面时将调用此函数。
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

        // 每当用户导航至该页面时都要调用此函数。
        ready: function (element, options) {
            element.querySelector("header[role=banner] .pagetitle").textContent = this._pageTitle;
        },

        unload: function () {
            this._items.dispose();
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO:  响应布局的更改。
        },

        _itemInvoked: function (args) {
            var item = this._items.getAt(args.detail.itemIndex);
            WinJS.Navigation.navigate("/pages/itemDetail/itemDetail.html", { item: Data.getItemReference(item) });
        }
    });
})();
