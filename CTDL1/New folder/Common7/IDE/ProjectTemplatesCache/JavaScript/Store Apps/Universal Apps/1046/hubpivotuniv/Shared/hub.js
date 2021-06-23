(function () {
    "use strict";

    var nav = WinJS.Navigation;
    var session = WinJS.Application.sessionState;
    var util = WinJS.Utilities;

    // Obtenha os grupos usados pelas seções associadas a dados do Hub.
    var section3Group = Data.resolveGroupReference("group4");
    var section3Items = Data.getItemsFromGroup(section3Group);

    WinJS.UI.Pages.define("/pages/hub/hub.html", {
        processed: function (element) {
            return WinJS.Resources.processAll(element);
        },

        // Essa função é chamada sempre que um usuário navegar para essa página. Ela
        // preenche os elementos da página com os dados do aplicativo.
        ready: function (element, options) {
            var hub = element.querySelector(".hub").winControl;
            hub.onheaderinvoked = function (args) {
                args.detail.section.onheaderinvoked(args);
            };
            hub.onloadingstatechanged = function (args) {
                if (args.srcElement === hub.element && args.detail.loadingState === "complete") {
                    hub.onloadingstatechanged = null;
                }
            }

            // TODO: Inicialize a página aqui.
        },

        section3DataSource: section3Items.dataSource,

        section3HeaderNavigate: util.markSupportedForProcessing(function (args) {
            nav.navigate("/pages/section/section.html", { title: args.detail.section.header, groupKey: section3Group.key });
        }),

        section3ItemNavigate: util.markSupportedForProcessing(function (args) {
            var item = Data.getItemReference(section3Items.getAt(args.detail.itemIndex));
            nav.navigate("/pages/item/item.html", { item: item });
        }),

        unload: function () {
            // TODO: Responda a navegações fora desta página.
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Responda a alterações no layout.
        },
    });
})();