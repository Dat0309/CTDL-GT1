// Gezinti şablonuna giriş için aşağıdaki belgelere bakın:
// http://go.microsoft.com/fwlink/?LinkID=329110
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

    app.start();
})();
