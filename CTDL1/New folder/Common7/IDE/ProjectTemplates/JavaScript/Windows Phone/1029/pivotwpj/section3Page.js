(function () {
    "use strict";

    var ControlConstructor = WinJS.UI.Pages.define("/pages/hub/section3Page.html", {
        // Tato funkce je volána po načtení obsahu ovládacího prvku 
        // stránky, aktivování ovládacích prvků a nastavení nadřazených 
        // elementů pro výsledné elementy v modelu DOM. 
        ready: function (element, options) {
            options = options || {};

            var listView = element.querySelector(".itemslist").winControl;

            listView.itemDataSource = options.dataSource;
            listView.layout = options.layout;
            listView.oniteminvoked = options.oniteminvoked;
        }
    });

    // Následující řádky zveřejňují tento konstruktor ovládacího prvku jako globální. 
    // To vám umožňuje použít ovládací prvek jako deklarativní ovládací 
    // prvek v rámci atributu data-win-control. 

    WinJS.Namespace.define("HubApps_SectionControls", {
        Section3Control: ControlConstructor
    });
})();