(function () {
    "use strict";

    var ControlConstructor = WinJS.UI.Pages.define("/pages/hub/section3Page.html", {
        // La funzione è chiamata una volta che il contenuto del controllo pagina 
        // è stato caricato, i controlli sono stati attivati e 
        // gli elementi risultanti sono stati associati al DOM padre. 
        ready: function (element, options) {
            options = options || {};

            var listView = element.querySelector(".itemslist").winControl;

            listView.itemDataSource = options.dataSource;
            listView.layout = options.layout;
            listView.oniteminvoked = options.oniteminvoked;
        }
    });

    // Le seguenti righe espongono il costruttore del controllo come globale. 
    // In tal modo è possibile utilizzare il controllo come controllo dichiarativo all'interno 
    // dell'attributo data-win-control. 

    WinJS.Namespace.define("HubApps_SectionControls", {
        Section3Control: ControlConstructor
    });
})();