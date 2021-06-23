// Основные сведения о шаблоне навигации см. в следующей документации:
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
                // TODO: Это приложение было вновь запущено. Инициализируйте
                // приложение здесь.
            } else {
                // TODO: Это приложение вновь активировано после приостановки.
                // Восстановите состояние приложения здесь.
            }

            nav.history = app.sessionState.history || {};
            nav.history.current.initialPlaceholder = true;

            // Оптимизация загрузки приложений и выполнение запланированных задач с высоким приоритетом во время отображения экрана-заставки.
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
        // TODO: Это приложение будет приостановлено. Сохраните все состояния,
        // которые должны сохраняться во время приостановки. Если необходимо 
        // завершить асинхронную операцию, прежде чем приложение 
        // будет приостановлено, вызовите args.setPromise().
        app.sessionState.history = nav.history;
    };

    app.start();
})();
