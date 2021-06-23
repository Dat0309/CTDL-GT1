// Eine Einführung zur Pivot-Vorlage finden Sie in der folgenden Dokumentation:
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
                // TODO: Diese Anwendung wurde neu gestartet. Die Anwendung
                // hier initialisieren.
            } else {
                // TODO: Diese Anwendung war angehalten und wurde reaktiviert.
                // Anwendungszustand hier wiederherstellen.
            }

            hookUpBackButtonGlobalEventHandlers();
            nav.history = app.sessionState.history || {};
            nav.history.current.initialPlaceholder = true;

            // Die Anwendungslast optimieren und während der Anzeige des Begrüßungsbildschirms geplante Arbeiten mit hoher Priorität ausführen.
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
        // TODO: Diese Anwendung wird gleich angehalten. Jeden Zustand,
        // der über Anhaltevorgänge hinweg beibehalten muss, hier speichern. Wenn ein asynchroner 
        // Vorgang vor dem Anhalten der Anwendung abgeschlossen werden muss, 
        // args.setPromise() aufrufen.
        app.sessionState.history = nav.history;
    };

    function hookUpBackButtonGlobalEventHandlers() {
        // Abonniert globale Ereignisse für das Windows-Objekt.
        window.addEventListener('keyup', backButtonGlobalKeyUpHandler, false)
    }

    // KONSTANTEN
    var KEY_LEFT = "Left";
    var KEY_BROWSER_BACK = "BrowserBack";
    var MOUSE_BACK_BUTTON = 3;

    function backButtonGlobalKeyUpHandler(event) {
        // Navigiert zurück, wenn ALT+NACH-LINKS oder die Schaltfläche "Zurück" des Browsers losgelassen wird.
        if ((event.key === KEY_LEFT && event.altKey && !event.shiftKey && !event.ctrlKey) || (event.key === KEY_BROWSER_BACK)) {
            nav.back();
        }
    }

    app.start();
})();
