(function () {
    "use strict";

    var ControlConstructor = WinJS.UI.Pages.define("/pages/hub/section3Page.html", {
        // Se llama a esta función después de que el contenido de control de página 
        // se haya cargado, los controles se hayan activado y 
        // los elementos resultantes tengan un elemento primario en el DOM. 
        ready: function (element, options) {
            options = options || {};

            var listView = element.querySelector(".itemslist").winControl;

            listView.itemDataSource = options.dataSource;
            listView.layout = options.layout;
            listView.oniteminvoked = options.oniteminvoked;
        }
    });

    // En las líneas siguientes se expone este constructor de control como global. 
    // Esto permite usarlo como control declarativo en 
    // el atributo data-win-control. 

    WinJS.Namespace.define("HubApps_SectionControls", {
        Section3Control: ControlConstructor
    });
})();