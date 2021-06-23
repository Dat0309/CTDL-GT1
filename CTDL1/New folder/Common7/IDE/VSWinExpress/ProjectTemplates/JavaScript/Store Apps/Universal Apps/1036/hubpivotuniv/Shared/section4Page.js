(function () {
    "use strict";

    var ControlConstructor = WinJS.UI.Pages.define("/pages/hub/section4Page.html", {
        // Cette fonction est appelée une fois que le contenu du contrôle de page 
        // a été chargé, que les contrôles ont été activés et que 
        // les éléments résultants ont été apparentés au modèle DOM. 
        ready: function (element, options) {
            options = options || {};
        },
    });

    // Les lignes suivantes exposent ce constructeur de contrôle comme global. 
    // Cela vous permet d'utiliser le contrôle comme un contrôle déclaratif dans 
    // l'attribut data-win-control. 

    WinJS.Namespace.define("HubApps_SectionControls", {
        Section4Control: ControlConstructor
    });
})();