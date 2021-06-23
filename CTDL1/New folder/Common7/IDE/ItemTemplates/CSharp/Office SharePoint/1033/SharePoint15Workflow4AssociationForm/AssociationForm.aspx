<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>
<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="WorkflowServices" Namespace="Microsoft.SharePoint.WorkflowServices.ApplicationPages" Assembly="Microsoft.SharePoint.WorkflowServices.ApplicationPages, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<asp:Content ID="Content1" ContentPlaceHolderId="PlaceHolderAdditionalPageHead" runat="server">
</asp:Content>

<asp:Content ID="Content4" ContentPlaceHolderId="PlaceHolderPageTitleInTitleArea" runat="server">
    Custom Workflow Association Form
</asp:Content>

<%--    
        $loc_UpdateAssocFormUrlComment$
--%>

<asp:Content ID="Content5" ContentPlaceHolderId="PlaceHolderMain" runat="server">
<%--    
        $loc_AssocFormCodeSampleComment$ 
--%>

    <WorkflowServices:WorkflowAssociationFormContextControl ID="WorkflowAssociationFormContextControl1" runat="server" />
    
    <h1><label id="wfHeader"></label></h1>

    <div>
        <table>
            <tr><td colspan="2">String:<br /><textarea id="strInput" rows="1" cols="50"></textarea><br /><br /></td></tr>
            <tr><td colspan="2">Integer:<br /><textarea id="intInput" rows="1" cols="50"></textarea><br /><br /></td></tr>
            <tr><td colspan="2">DateTime: <SharePoint:DateTimeControl ID="dateTimeInput" DatePickerFrameUrl="../_layouts/15/iframe.aspx" LocaleId="1033"   DateOnly="false" runat="server"  /><br /><br /></td></tr>
            <tr>
                <td><button id="Save" onclick="return runAssocWFTask()">Save</button></td>
                <td><button id="Cancel" onclick="location.href = cancelRedirectUrl; return false;">Cancel</button></td>
            </tr>
        </table>

        <script type="text/javascript">
            var errorMessage = "An error occured when saving the workflow association.";
            var dlg = null;
            var complete = 0;
            var CID_O15WorkflowTask = "0x0108003365C4474CAE8C42BCE396314E88E51F";

            // ---------- $loc_SaveButtonClickComment$ ----------
            function runAssocWFTask() {
                // $loc_ResolveUsersComment$
                var peoplePickerDict = SPClientPeoplePicker.SPClientPeoplePickerDict;
                for (var pickerId in peoplePickerDict) {
                    peoplePickerDict[pickerId].AddUnresolvedUserFromEditor(false);
                    peoplePickerDict[pickerId].ResolveAllUsers();
                }

                var form = SPClientForms.ClientFormManager.GetClientForm('Workflow');
                if (form.SubmitClientForm()) {
                    // $loc_ValidationErrorsComment$ 
                    return false;
                }

                var button = document.getElementById("Save");
                var cb = new SP.Utilities.CommandBlock(null, associateWF, assocComplete);
                var task = new SP.Utilities.Task(button, SP.Utilities.Task.TaskType.autoCancel, 0, cb, inProgressDialog, null, null);
                task.start();

                return false;
            }

            function assocComplete() {
                if (dlg != null) {
                    dlg.close();
                }
            }

            function inProgressDialog() {
                if (dlg == null) {
                    dlg = SP.UI.ModalDialog.showWaitScreenWithNoClose("associating workflow", "custom workflow association", null, null);
                }
            }

            // ---------- $loc_SaveWorkflowAssociationComment$ ----------
            function associateWF(state, pauseFunction) {
                if (complete != 0)
                    return complete;

                var historyListId = "";
                var taskListId = "";
                var metadata = new Object();

                // $loc_GetInputValuesComment$
                var strInputValue = document.getElementById("strInput").value;
                if (strInputValue) {
                    metadata['strArg'] = strInputValue;
                }
                var intInputValue = document.getElementById("intInput").value;
                if (intInputValue) {
                    var intValue = parseInt(intInputValue);
                    if (intValue)
                        metadata['intArg'] = intValue;
                }
                var dateTimeInputValue = document.getElementById("ctl00_PlaceHolderMain_dateTimeInput_dateTimeInputDate").value;
                if (dateTimeInputValue) {
                    var dateTimeValue = new Date(document.getElementById("ctl00_PlaceHolderMain_dateTimeInput_dateTimeInputDate").value);
                    if (dateTimeValue)
                        metadata['dateTimeArg'] = dateTimeValue;
                }

                var context = SP.ClientContext.get_current();
                var web = context.get_web();
                var wfManager = SP.WorkflowServices.WorkflowServicesManager.newObject(context, web);

                var newHistoryList = null;
                var taskList = null;

                // $loc_setHistoryListComment$
                if (historyListName) {
                    if (historyListName[0] == 'z') {
                        // $loc_needToCreateNewHistoryListComment$
                        historyListName = historyListName.substring(1); //remove the 'z'
                        var listCreationInfo = new SP.ListCreationInformation();
                        listCreationInfo.set_templateType(SP.ListTemplateType.workflowHistory);
                        listCreationInfo.set_title(historyListName);
                        listCreationInfo.set_description(historyListDescription);
                        newHistoryList = web.get_lists().add(listCreationInfo);
                        context.load(newHistoryList, 'Id');
                    }
                    else {
                        // $loc_GetHistoryListComment$ 
                        historyListId = historyListName;
                    }
                }

                // $loc_setTaskListComment$ 
                if (taskListName) {
                    if (taskListName[0] == 'z') {
                        // $loc_needToCreateNewTaskListComment$
                        taskListName = taskListName.substring(1); 
                        var listCreationInfo = new SP.ListCreationInformation();
                        listCreationInfo.set_templateType(SP.ListTemplateType.tasksWithTimelineAndHierarchy);
                        listCreationInfo.set_title(taskListName);
                        listCreationInfo.set_description(taskListDescription);
                        taskList = web.get_lists().add(listCreationInfo);
                    }
                    else {
                        var listCollection = web.get_lists();
                        taskList = listCollection.getById(taskListName);
                    }
                    context.load(taskList, 'Id');
                    var contentTypeCollection = web.get_availableContentTypes();
                    var contentType = contentTypeCollection.getById(CID_O15WorkflowTask);
                    context.load(contentType, 'Name');
                    var taskListContentTypeCollection = taskList.get_contentTypes();
                    context.load(taskListContentTypeCollection, 'Include(Name)');
                }

                //  $loc_checkTaskListOOTBComment$

                context.executeQueryAsync(function (sender, args) {

                    complete = 0.66;

                    if (newHistoryList != null) {
                        historyListId = newHistoryList.get_id().toString();
                    }
                    taskListId = taskList.get_id().toString();

                    metadata["HistoryListId"] = historyListId;
                    metadata["TaskListId"] = taskListId;

                    var eventTypes = new Array();
                    if (autoStartCreate) {
                        eventTypes.push("ItemAdded");
                    }
                    if (autoStartChange) {
                        eventTypes.push("ItemUpdated");
                    }
                    if (allowManual) {
                        eventTypes.push("WorkflowStart");
                    }

                    // $loc_AssociationExistsOrSubscribeComment$

                    if (subscriptionId != null && subscriptionId != "") {
                        // $loc_UpdateSubscriptionComment$
                        var subscription = wfManager.getWorkflowSubscriptionService().getSubscription(subscriptionId);
                        subscription.set_name(workflowName);
                        subscription.set_eventTypes(eventTypes);
                        for (var key in metadata) {
                            subscription.setProperty(key, metadata[key]);
                        }
                        // $loc_PublishComment$
                        wfManager.getWorkflowSubscriptionService().publishSubscription(subscription);
                        context.executeQueryAsync(
                            function (sender, args) {
                                // $loc_SuccessComment$
                                complete = 1;
                                location.href = redirectUrl;
                            },
                            function (sender, args) {
                                // $loc_ErrorComment$
                                complete = 1;
                                alert(errorMessage + " " + args.get_message());
                            }
                        );
                    }
                    else {
                        // $loc_AddNewAssociationComment$
                        var newSubscription = SP.WorkflowServices.WorkflowSubscription.newObject(context);
                        newSubscription.set_definitionId(definitionId);
                        newSubscription.set_eventSourceId(eventSourceId);
                        newSubscription.set_eventTypes(eventTypes);
                        newSubscription.set_name(workflowName);
                        for (var key in metadata) {
                            newSubscription.setProperty(key, metadata[key]);
                        }
                        // $loc_PublishComment$
                        wfManager.getWorkflowSubscriptionService().publishSubscriptionForList(newSubscription, listId);

                        context.executeQueryAsync(
                            function (sender, args) {
                                // $loc_SuccessComment$
                                complete = 1;
                                location.href = redirectUrl;
                            },
                            function (sender, args) {
                                // $loc_ErrorComment$
                                complete = 1;
                                alert(errorMessage + " " + args.get_message());
                            }
                        );
                    }
                },
                function (sender, args) {
                    // $loc_ErrorComment$
                    complete = 1;
                    alert(errorMessage + " " + args.get_message());
                })

                complete = 0.33;
                return complete;
            }

            function setHeader() {
                var headerLabel = document.getElementById('wfHeader');
                if (headerLabel != null)
                    headerLabel.innerText = headerString;
            }

            Sys.Application.add_load(setHeader);
    </script>
</div>
</asp:Content>