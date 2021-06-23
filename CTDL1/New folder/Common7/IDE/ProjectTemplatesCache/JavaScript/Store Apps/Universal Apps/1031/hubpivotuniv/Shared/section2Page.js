(function () {
    "use strict";

    var ControlConstructor = WinJS.UI.Pages.define("/pages/hub/section2Page.html", {
        // Diese Funktion wird aufgerufen, nachdem die Inhalte der Seitensteuerelemente 
        // geladen wurden, die Steuerelemente aktiviert wurden und 
        // die resultierenden Elemente dem DOM untergeordnet wurden. 
        ready: function (element, options) {
            options = options || {};
        },
    });

    // Mit den folgenden Zeilen wird dieser Steuerelementkonstruktur global verfügbar gemacht. 
    // Dadurch können Sie das Steuerelement als deklaratives Steuerelement innerhalb 
    // innerhalb des "data-win-control"-Attributs verwenden. 

    WinJS.Namespace.define("HubApps_SectionControls", {
        Section2Control: ControlConstructor
    });
})();