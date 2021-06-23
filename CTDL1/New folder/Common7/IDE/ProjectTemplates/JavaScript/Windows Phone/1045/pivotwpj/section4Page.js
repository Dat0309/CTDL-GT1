(function () {
    "use strict";

    var ControlConstructor = WinJS.UI.Pages.define("/pages/hub/section4Page.html", {
        // Ta funkcja jest wywoływana po załadowaniu treści kontrolki strony, 
        // uaktywnieniu kontrolek i uczynieniu 
        // wynikowych elementów nadrzędnymi dla DOM. 
        ready: function (element, options) {
            options = options || {};
        },
    });

    // Poniższe wiersze ujawniają tę kontrolkę konstruktora jako globalną. 
    // To pozwala używać kontrolki jako deklaratywnej wewnątrz 
    // atrybutu data-win-control. 

    WinJS.Namespace.define("HubApps_SectionControls", {
        Section4Control: ControlConstructor
    });
})();