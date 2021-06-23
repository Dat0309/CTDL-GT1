// Úvod do šablony Pivot najdete v následující dokumentaci:
// http://go.microsoft.com/fwlink/?LinkID=392284
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

            hookUpBackButtonGlobalEventHandlers();
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
        // TODO: Tato aplikace bude pozastavena. Uložte všechny stavy,
        // které je potřeba zachovat mezi pozastaveními. Pokud potřebujete 
        // dokončit asynchronní operaci předtím, než je aplikace 
        // pozastavena, zavolejte args.setPromise().
        app.sessionState.history = nav.history;
    };

    function hookUpBackButtonGlobalEventHandlers() {
        // Přihlašuje se k odběru globálních událostí objektu okna.
        window.addEventListener('keyup', backButtonGlobalKeyUpHandler, false)
    }

    // KONSTANTY
    var KEY_LEFT = "Left";
    var KEY_BROWSER_BACK = "BrowserBack";
    var MOUSE_BACK_BUTTON = 3;

    function backButtonGlobalKeyUpHandler(event) {
        // Přechází zpět při uvolnění kláves Alt + šipka vlevo nebo tlačítka Zpět v prohlížeči (BrowserBack).
        if ((event.key === KEY_LEFT && event.altKey && !event.shiftKey && !event.ctrlKey) || (event.key === KEY_BROWSER_BACK)) {
            nav.back();
        }
    }

    app.start();
})();
