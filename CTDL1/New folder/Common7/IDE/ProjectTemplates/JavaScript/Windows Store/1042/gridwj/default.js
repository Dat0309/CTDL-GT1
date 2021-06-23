// 모눈 템플릿에 대한 소개는 다음 문서를 참조하십시오.
// http://go.microsoft.com/fwlink/?LinkID=232446
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
                // TODO: 이 응용 프로그램은 새로 시작되었습니다. 여기서
                // 응용 프로그램을 초기화하십시오.
            } else {
                // TODO: 이 응용 프로그램은 일시 중단되었다가 다시 활성화되었습니다.
                // 여기서 응용 프로그램 상태를 복원하십시오.
            }

            nav.history = app.sessionState.history || {};
            nav.history.current.initialPlaceholder = true;

            // 응용 프로그램의 로드를 최적화하고 시작 화면이 표시되는 동안 우선 순위가 높은 예약된 작업을 실행합니다.
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
        // TODO: 이 응용 프로그램은 곧 일시 중단됩니다. 여러 일시 중단에서
        // 유지해야 하는 상태를 저장하십시오. 
        //  응용 프로그램이 일시 중단되기 전에 비동기 작업을 완료해야 하는 경우 
        // args.setPromise()를 호출하십시오.
        app.sessionState.history = nav.history;
    };

    app.start();
})();
