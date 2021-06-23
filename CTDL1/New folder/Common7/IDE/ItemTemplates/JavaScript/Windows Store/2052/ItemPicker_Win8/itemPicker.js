// 有关“选取器协定”模板的简介，请参阅以下文档: 
// http://go.microsoft.com/fwlink/?LinkId=232514
$wizardcomment$
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var pickerUI;

    function fileRemovedFromPickerUI(args) {
        // TODO:  响应在选取器 UI 中取消选择的项。
    }

    function getPickerDataSource() {
        if (window.Data) {
            return Data.items.dataSource;
        } else {
            return new WinJS.Binding.List().dataSource;
        }
    }

    function updatePickerUI(args) {
        // TODO:  响应页面上选择的或取消选择的项。
    }

    app.onactivated = function activated(args) {
        if (args.detail.kind === Windows.ApplicationModel.Activation.ActivationKind.fileOpenPicker) {
            pickerUI = args.detail.fileOpenPickerUI;
            pickerUI.onfileremoved = fileRemovedFromPickerUI;
            args.setPromise(WinJS.UI.processAll()
                .then(function () {
                    var listView = document.querySelector(".pickerlist").winControl;
                    listView.itemDataSource = getPickerDataSource();
                    listView.itemTemplate = document.querySelector(".itemtemplate");
                    listView.onselectionchanged = updatePickerUI;
                    listView.element.focus();
                }));
        }
    };

    app.start();
})();