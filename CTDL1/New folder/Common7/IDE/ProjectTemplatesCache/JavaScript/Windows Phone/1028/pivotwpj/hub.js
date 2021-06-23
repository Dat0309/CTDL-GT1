(function () {
    "use strict";

    var nav = WinJS.Navigation;
    var session = WinJS.Application.sessionState;
    var util = WinJS.Utilities;

    // 取得中樞的資料繫結區段所使用的群組。
    var section3Group = Data.resolveGroupReference("group4");
    var section3Items = Data.getItemsFromGroup(section3Group);

    WinJS.UI.Pages.define("/pages/hub/hub.html", {
        processed: function (element) {
            return WinJS.Resources.processAll(element);
        },

        // 每當使用者巡覽至此頁面時，就會呼叫這個函式。它
        // 會將應用程式的資料填入頁面項目。
        ready: function (element, options) {
            var hub = element.querySelector(".hub").winControl;
            hub.onheaderinvoked = function (args) {
                args.detail.section.onheaderinvoked(args);
            };
            hub.onloadingstatechanged = function (args) {
                if (args.srcElement === hub.element && args.detail.loadingState === "complete") {
                    hub.onloadingstatechanged = null;
                    hub.element.focus();
                }
            }

            // TODO: 在此初始化頁面。
        },

        section3DataSource: section3Items.dataSource,

        section3ItemNavigate: util.markSupportedForProcessing(function (args) {
            var item = Data.getItemReference(section3Items.getAt(args.detail.itemIndex));
            nav.navigate("/pages/item/item.html", { item: item });
        }),

        unload: function () {
            // TODO: 回應離開這個頁面的導覽。
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: 回應配置的變更。
        },
    });
})();