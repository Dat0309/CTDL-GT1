// Eine Einführung zur Navigationsvorlage finden Sie in der folgenden Dokumentation:
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
                // TODO: Diese Anwendung wurde neu gestartet. Die Anwendung
                // hier initialisieren.
            } else {
                // TODO: Diese Anwendung war angehalten und wurde reaktiviert.
                // Anwendungszustand hier wiederherstellen.
            }

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

    app.start();
})();
