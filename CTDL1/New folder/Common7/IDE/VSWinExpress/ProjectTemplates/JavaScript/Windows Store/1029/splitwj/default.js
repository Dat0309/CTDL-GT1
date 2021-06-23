// Pro úvod do šablony Rozdělení, viz následující dokumentace:
// http://go.microsoft.com/fwlink/?LinkID=232447
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
                // TODO: Tato aplikace byla nově spuštěna. Inicializovat
                // zde aplikaci.
            } else {
                // TODO: Tato aplikace byla znovu aktivována z pozastavení.
                // Obnovit zde stav aplikace.
            }

            nav.history = app.sessionState.history || {};
            nav.history.current.initialPlaceholder = true;

            // Optimalizuje zatížení aplikace a zatímco je zobrazena úvodní obrazovka, provádí plánované úlohy s vysokou prioritou.
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
        // TODO: Tato aplikace bude pozastavena. Uložit všechny stavy,
        // které jsou potřeba k přetrvání pozastavení. Pokud potřebujete 
        // dokončit asynchronní operaci předtím, než je aplikace 
        // pozastavena, zavolejte args.setPromise().
        app.sessionState.history = nav.history;
    };

    app.start();
})();
