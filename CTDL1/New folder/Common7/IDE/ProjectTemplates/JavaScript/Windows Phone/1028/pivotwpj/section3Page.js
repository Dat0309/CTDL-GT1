(function () {
    "use strict";

    var ControlConstructor = WinJS.UI.Pages.define("/pages/hub/section3Page.html", {
        // 呼叫這個函式的時機是在載入頁面控制項
        // 內容、啟用控制項，且將產生的項目
        // 設為 DOM 的父代之後。
        ready: function (element, options) {
            options = options || {};

            var listView = element.querySelector(".itemslist").winControl;

            listView.itemDataSource = options.dataSource;
            listView.layout = options.layout;
            listView.oniteminvoked = options.oniteminvoked;
        }
    });

    // 下面幾行會將這個控制項建構函式公開為全域的。
    // 這樣可讓您使用此控制項，做為 data-win-control 屬性內的
    // 宣告式控制項。

    WinJS.Namespace.define("HubApps_SectionControls", {
        Section3Control: ControlConstructor
    });
})();