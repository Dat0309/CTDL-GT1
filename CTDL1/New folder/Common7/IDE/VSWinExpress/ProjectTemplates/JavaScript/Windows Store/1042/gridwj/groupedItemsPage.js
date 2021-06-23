(function () {
    "use strict";

    var nav = WinJS.Navigation;
    var ui = WinJS.UI;

    ui.Pages.define("/pages/groupedItems/groupedItems.html", {
        // 이 함수는 페이지를 초기화하기 위해 호출됩니다.
        init: function (element, options) {
            this.groupHeaderInvoked = ui.eventHandler(this._groupHeaderInvoked.bind(this));
            this.itemInvoked = ui.eventHandler(this._itemInvoked.bind(this));
        },

        // 이 함수는 사용자가 이 페이지로 이동할 때마다 호출됩니다.
        ready: function (element, options) {
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: 레이아웃 변경 내용에 응답합니다.
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
