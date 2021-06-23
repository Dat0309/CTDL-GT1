(function () {
    "use strict";

    var ControlConstructor = WinJS.UI.Pages.define("/pages/hub/section4Page.html", {
        // 이 함수는 페이지 제어 콘텐츠 이후에 호출됩니다. 
        // 로드되었으며 컨트롤이 활성화되었고 
        // 결과 요소가 DOM의 부모로 지정되었습니다. 
        ready: function (element, options) {
            options = options || {};
        },
    });

    // 다음 줄은 이 제어 생성자를 전역으로 노출합니다. 
    // 이 경우 제어를 data-win-control 특성 안에 선언적 제어로 사용할 수 
    // 있습니다. 

    WinJS.Namespace.define("HubApps_SectionControls", {
        Section4Control: ControlConstructor
    });
})();