(function () {
    "use strict";

    var ui = WinJS.UI;

    ui.Pages.define("/pages/groupDetail/groupDetail.html", {
        /// <field type="WinJS.Binding.List" />
        _items: null,

        // 이 함수는 페이지를 초기화하기 위해 호출됩니다.
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

        // 이 함수는 사용자가 이 페이지로 이동할 때마다 호출됩니다. 
        ready: function (element, options) {
            element.querySelector("header[role=banner] .pagetitle").textContent = this._pageTitle;
        },

        unload: function () {
            this._items.dispose();
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: 레이아웃 변경 내용에 응답합니다.
        },

        _itemInvoked: function (args) {
            var item = this._items.getAt(args.detail.itemIndex);
            WinJS.Navigation.navigate("/pages/itemDetail/itemDetail.html", { item: Data.getItemReference(item) });
        }
    });
})();
