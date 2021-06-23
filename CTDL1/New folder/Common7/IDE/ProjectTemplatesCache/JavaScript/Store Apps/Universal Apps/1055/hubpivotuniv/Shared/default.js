// Hub/Özet şablonuna giriş için aşağıdaki belgelere bakın:
// http://go.microsoft.com/fwlink/?LinkID=392285
(function () {
    "use strict";

    var activation = Windows.ApplicationModel.Activation;
    var app = WinJS.Application;
    var nav = WinJS.Navigation;
    var sched = WinJS.Utilities.Scheduler;
    var ui = WinJS.UI;

    app.addEventListener("activated", function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: Bu uygulama yeni başlatıldı. Başlat
                // uygulamanız burada.
            } else {
                // TODO: Bu uygulama askı durumundan etkinleştirildi.
                // geri yükleme uygulama durumu burada.
            }

            hookUpBackButtonGlobalEventHandlers();
            nav.history = app.sessionState.history || {};
            nav.history.current.initialPlaceholder = true;

            // Uygulamanın yükünü iyileştirin ve giriş ekranı gösterildiği sırasında yüksek öncelikli zamanlanan çalışmaları gerçekleştirin.
            ui.disableAnimations();
            var p = ui.processAll().then(function () {
                return nav.navigate(nav.location || Application.navigator.home, nav.state);
            }).then(function () {
                return sched.requestDrain(sched.Priority.aboveNormal + 1);
            }).then(function () {
                ui.enableAnimations();
            });

            args.setPromise(p);
        }
    });

    app.oncheckpoint = function (args) {
        // TODO: Bu uygulama askıya alınma hakkında. Herhangi bir durumda kaydet
        // burada askıya alınmalar arasında devam etmesi gerekiyor. Uygulamanız 
        // askıya alınmadan önce zaman uyumsuz bir işlemi tamamlamanız 
        // gerekiyorsa, args.setPromise() değerini çağırın.
        app.sessionState.history = nav.history;
    };

    function hookUpBackButtonGlobalEventHandlers() {
        // Pencere nesnesinde genel olaylara abone olur
        window.addEventListener('keyup', backButtonGlobalKeyUpHandler, false)
    }

    // SABİTLER
    var KEY_LEFT = "Left";
    var KEY_BROWSER_BACK = "BrowserBack";
    var MOUSE_BACK_BUTTON = 3;

    function backButtonGlobalKeyUpHandler(event) {
        // (alt + sol ok) veya BrowserBack tuşları bırakıldığında geriye gider.
        if ((event.key === KEY_LEFT && event.altKey && !event.shiftKey && !event.ctrlKey) || (event.key === KEY_BROWSER_BACK)) {
            nav.back();
        }
    }

    app.start();
})();
