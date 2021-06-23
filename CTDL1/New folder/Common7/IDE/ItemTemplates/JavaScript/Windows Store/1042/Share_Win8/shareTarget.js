// 공유 계약 템플릿에 대한 소개는 다음 문서를 참조하십시오.
// http://go.microsoft.com/fwlink/?LinkId=232513
$wizardcomment$
(function () {
    "use strict";

    var app = WinJS.Application;
    var share;

    function onShareSubmit() {
        document.querySelector(".progressindicators").style.visibility = "visible";
        document.querySelector(".commentbox").disabled = true;
        document.querySelector(".submitbutton").disabled = true;

        // TODO: 'share' 변수에 저장된 공유 데이터로 작업을 수행합니다.

        share.reportCompleted();
    }

    // 이 함수는 모든 응용 프로그램 활성화에 응답합니다.
    app.onactivated = function (args) {
        var thumbnail;

        if (args.detail.kind === Windows.ApplicationModel.Activation.ActivationKind.shareTarget) {
            document.querySelector(".submitbutton").onclick = onShareSubmit;
            share = args.detail.shareOperation;

            document.querySelector(".shared-title").textContent = share.data.properties.title;
            document.querySelector(".shared-description").textContent = share.data.properties.description;

            thumbnail = share.data.properties.thumbnail;
            if (thumbnail) {
                // 공유 데이터에 축소판 그림이 포함된 경우 이를 표시합니다.
                args.setPromise(thumbnail.openReadAsync().done(function displayThumbnail(stream) {
                    document.querySelector(".shared-thumbnail").src = window.URL.createObjectURL(stream);
                }));
            } else {
                // 축소판 그림이 없는 경우 설명 및 제목 요소를 확장하여
                // 사용하지 않는 공간을 채웁니다.
                document.querySelector("section[role=main] header").style.setProperty("-ms-grid-columns", "0px 0px 1fr");
                document.querySelector(".shared-thumbnail").style.visibility = "hidden";
            }
        }
    };

    app.start();
})();
