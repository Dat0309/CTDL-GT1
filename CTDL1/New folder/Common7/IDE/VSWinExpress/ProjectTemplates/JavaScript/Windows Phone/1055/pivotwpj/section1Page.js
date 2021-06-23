(function () {
    "use strict";

    var ControlConstructor = WinJS.UI.Pages.define("/pages/hub/section1Page.html", {
        // Bu işlev sayfa denetimi içerikleri yüklendikten,
        // denetimler etkinleştirildikten ve sonuç olarak oluşturulan öğeler
        // DOM'a üst öğe olarak atandıktan sonra çağırılır. 
        ready: function (element, options) {
            options = options || {};
        },
    });

    // Aşağıdaki satırlar bu denetim oluşturucusunu bir genel öğe olarak sunar. 
    // Bu, denetimi data-win-control özniteliğinde bildirime dayalı bir denetim
    // olarak kullanmanıza olanak verir. 

    WinJS.Namespace.define("HubApps_SectionControls", {
        Section1Control: ControlConstructor
    });
})();