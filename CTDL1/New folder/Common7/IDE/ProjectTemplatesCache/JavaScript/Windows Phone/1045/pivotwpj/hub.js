(function () {
    "use strict";

    var nav = WinJS.Navigation;
    var session = WinJS.Application.sessionState;
    var util = WinJS.Utilities;

    // Pobierz grupy, używane przez sekcje Centrum, powiązane z danymi.
    var section3Group = Data.resolveGroupReference("group4");
    var section3Items = Data.getItemsFromGroup(section3Group);

    WinJS.UI.Pages.define("/pages/hub/hub.html", {
        processed: function (element) {
            return WinJS.Resources.processAll(element);
        },

        // Ta funkcja jest wywoływana, gdy użytkownik przechodzi do tej strony. To
        // wypełnia elementy strona danymi aplikacji.
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

            // TODO: Inicjuj stronę tutaj.
        },

        section3DataSource: section3Items.dataSource,

        section3ItemNavigate: util.markSupportedForProcessing(function (args) {
            var item = Data.getItemReference(section3Items.getAt(args.detail.itemIndex));
            nav.navigate("/pages/item/item.html", { item: item });
        }),

        unload: function () {
            // TODO: Odpowiedz na wyjście z tej strony.
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Odpowiedz na zmiany w układzie.
        },
    });
})();