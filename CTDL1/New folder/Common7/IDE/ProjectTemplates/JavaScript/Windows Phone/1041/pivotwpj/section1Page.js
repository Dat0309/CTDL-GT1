(function () {
    "use strict";

    var ControlConstructor = WinJS.UI.Pages.define("/pages/hub/section1Page.html", {
        // この関数は、ページ コントロール コンテンツ
        // が読み込まれ、結果の要素の親が DOM に
        // 設定された後で呼び出されます。
        ready: function (element, options) {
            options = options || {};
        },
    });

    // 次の行で、このコントロール コンストラクターがグローバルとして公開されます。
    // これによって、このコントロールを data-win-control 属性内で
    // 宣言型制御として使用できるようになります。 

    WinJS.Namespace.define("HubApps_SectionControls", {
        Section1Control: ControlConstructor
    });
})();