// Aby obejrzeć wprowadzenie do szablonu podziału, zobacz następującą dokumentację:
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
                // TODO: Ta aplikacja została niedawno uruchomiona. Zainicjuj
                // aplikację tutaj.
            } else {
                // TODO: Ta aplikacja została reaktywowana z zawieszenia.
                // Przywróć tutaj stan aplikacji.
            }

            nav.history = app.sessionState.history || {};
            nav.history.current.initialPlaceholder = true;

            // Optymalizacja ładowania aplikacji i wykonywanie zadań zaplanowanych z wysokim priorytetem w czasie wyświetlania ekranu powitalnego.
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
        // TODO: Ta aplikacja zostanie zawieszona. Zapisz tutaj stan,
        // który musi być zachowany po zawieszeniu. Jeśli musisz 
        // zakończyć operację asynchroniczną, zanim aplikacja zostanie 
        // zawieszona, wywołaj args.setPromise().
        app.sessionState.history = nav.history;
    };

    app.start();
})();
