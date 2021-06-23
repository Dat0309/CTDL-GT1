(function () {
    "use strict";

    var ui = WinJS.UI;

    ui.Pages.define("/pages/items/items.html", {
        // 이 함수는 페이지를 초기화하기 위해 호출됩니다.
        init: function (element, options) {
            this.itemInvoked = ui.eventHandler(this._itemInvoked.bind(this));
        },

        // 이 함수는 사용자가 이 페이지로 이동할 때마다 호출됩니다.
        ready: function (element, options) {
        },

        // 이 함수는 레이아웃 변경 내용에 응답하여 페이지 레이아웃을 업데이트합니다.
        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: 레이아웃 변경 내용에 응답합니다.
        },

        _itemInvoked: function (args) {
            var groupKey = Data.groups.getAt(args.detail.itemIndex).key;
            WinJS.Navigation.navigate("/pages/split/split.html", { groupKey: groupKey });
        }
    });
})();
