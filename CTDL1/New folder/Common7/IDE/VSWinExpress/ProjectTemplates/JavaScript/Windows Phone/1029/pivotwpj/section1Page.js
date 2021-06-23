(function () {
    "use strict";

    var ControlConstructor = WinJS.UI.Pages.define("/pages/hub/section1Page.html", {
        // Tato funkce je volána po načtení obsahu ovládacího prvku 
        // stránky, aktivování ovládacích prvků a nastavení nadřazených 
        // elementů pro výsledné elementy v modelu DOM. 
        ready: function (element, options) {
            options = options || {};
        },
    });

    // Následující řádky zveřejňují tento konstruktor ovládacího prvku jako globální. 
    // To vám umožňuje použít ovládací prvek jako deklarativní ovládací 
    // prvek v rámci atributu data-win-control. 

    WinJS.Namespace.define("HubApps_SectionControls", {
        Section1Control: ControlConstructor
    });
})();