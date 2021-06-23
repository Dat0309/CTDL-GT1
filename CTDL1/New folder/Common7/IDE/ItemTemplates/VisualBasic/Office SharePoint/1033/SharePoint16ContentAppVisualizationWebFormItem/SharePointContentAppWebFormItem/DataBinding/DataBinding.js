/// <reference path="../App.js" />
/// <reference path="../Visualization.js" />

(function () {
    'use strict';

    // $loc_script_Visualization_DataBinding_js_comment1$
    Office.initialize = function (reason) {
        $(document).ready(function () {
            app.initialize();

            $('#bind-to-existing-data').click(bindToExistingData);

            if (dataInsertionSupported()) {
                $('#insert-sample-data').show();
                $('#insert-sample-data').click(insertSampleData);
            }
        });
    };

    // $loc_script_Visualization_DataBinding_js_comment2$
    function bindToExistingData() {
        Office.context.document.bindings.addFromPromptAsync(
            Office.BindingType.Table,
            { id: app.bindingID, sampleData: visualization.generateSampleData() },
            function (result) {
                if (result.status === Office.AsyncResultStatus.Succeeded) {
                    window.location.href = '../Home/Home.html';
                } else {
                    app.showNotification(result.error.name, result.error.message);
                }
            }
        );
    }

    // $loc_script_Visualization_DataBinding_js_comment3$
    function dataInsertionSupported() {
        return Office.context.document.setSelectedDataAsync &&
            (Office.context.document.bindings &&
            Office.context.document.bindings.addFromSelectionAsync);
    }

    // $loc_script_Visualization_DataBinding_js_comment4$
    function insertSampleData() {
        Office.context.document.setSelectedDataAsync(visualization.generateSampleData(),
            function (result) {
                if (result.status === Office.AsyncResultStatus.Succeeded) {
                    Office.context.document.bindings.addFromSelectionAsync(
                        Office.BindingType.Table, { id: app.bindingID },
                        function (result) {
                            if (result.status === Office.AsyncResultStatus.Succeeded) {
                                window.location.href = '../Home/Home.html';
                            } else {
                                app.showNotification(result.error.name, result.error.message);
                            }
                        }
                    );
                } else {
                    app.showNotification(result.error.name, result.error.message);
                }
            }
        );
    }

})();
