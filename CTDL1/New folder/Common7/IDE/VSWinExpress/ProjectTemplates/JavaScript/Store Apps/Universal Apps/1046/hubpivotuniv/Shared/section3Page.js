(function () {
    "use strict";

    var ControlConstructor = WinJS.UI.Pages.define("/pages/hub/section3Page.html", {
        // Esta função é chamada depois que o conteúdo de controle da página 
        // é carregado, os controles são ativados e 
        // os elementos resultantes têm o parentesco definido para o DOM. 
        ready: function (element, options) {
            options = options || {};

            var listView = element.querySelector(".itemslist").winControl;

            listView.itemDataSource = options.dataSource;
            listView.layout = options.layout;
            listView.oniteminvoked = options.oniteminvoked;
        }
    });

    // As linhas a seguir expõem este construtor de controle como global. 
    // Isso permite usar o controle como controle declarativo dentro do 
    // atributo data-win-control. 

    WinJS.Namespace.define("HubApps_SectionControls", {
        Section3Control: ControlConstructor
    });
})();