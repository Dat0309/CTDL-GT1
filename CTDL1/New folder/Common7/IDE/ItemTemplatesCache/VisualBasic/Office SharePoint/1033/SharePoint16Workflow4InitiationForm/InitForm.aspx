<%@ Page language="VB" MasterPageFile="~masterurl/default.master" Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<asp:Content ID="Content2" ContentPlaceHolderId="PlaceHolderAdditionalPageHead" runat="server">
    <script type="text/javascript" src="../_layouts/15/sp.runtime.js"></script>
    <script type="text/javascript" src="../_layouts/15/sp.js"></script>
    <script type="text/javascript" src="../_layouts/15/sp.workflowservices.js"></script>
</asp:Content>

<%--    
        $loc_UpdateInitFormUrlComment$
--%>

<asp:Content ID="Content3" ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
    Page Title
</asp:Content>

<asp:Content ID="Content4" ContentPlaceHolderId="PlaceHolderMain" runat="server">
<%--    
        $loc_InitFormCodeSampleComment$
--%>
    <table>
        <tr><td>String:<br /><textarea id="strInput" rows="1" cols="50"></textarea><br /><br /></td></tr>
        <tr><td>Integer:<br /><textarea id="intInput" rows="1" cols="50"></textarea><br /><br /></td></tr>
        <tr><td>DateTime: <SharePoint:DateTimeControl ID="dateTimeInput" DatePickerFrameUrl="../_layouts/15/iframe.aspx" LocaleId="1033"   DateOnly="false" runat="server"  /><br /><br /></td></tr>
        <tr><td>
               <input type="button" name="startWorkflowButton" value="Start" onClick="StartWorkflow()" />
               <input type="button" name="cancelButton" value="Cancel" onClick="RedirFromInitForm()" />
               <br />
        </td></tr>
    </table>
    <script type="text/javascript">
        // ---------- $loc_StartWorkflowComment$ ----------
        function StartWorkflow() {
            var errorMessage = "An error occured when starting the workflow.";
            var subscriptionId = "", itemId = "", redirectUrl = "";

            var urlParams = GetUrlParams();
            if (urlParams) {
                //itemGuid = urlParams["ItemGuid"];
                itemId = urlParams["ID"];
                redirectUrl = urlParams["Source"];
                subscriptionId = urlParams["TemplateID"];
            }

            if (subscriptionId == null || subscriptionId == "") {
                // $loc_CannotLoadSubscriptionComment$
                alert(errorMessage + "  Could not find the workflow subscription id.");
                RedirFromInitForm(redirectUrl);
            }
            else {
                // $loc_SetWorkflowParametersComment$
                var wfParams = new Object();

                var strInputValue = document.getElementById("strInput").value;
                if (strInputValue) {
                    wfParams['strArg'] = strInputValue;
                }
                var intInputValue = document.getElementById("intInput").value;
                if (intInputValue) {
                    var intValue = parseInt(intInputValue);
                    if (intValue)
                        wfParams['intArg'] = intValue;
                }
                var dateTimeInputValue = document.getElementById("ctl00_PlaceHolderMain_dateTimeInput_dateTimeInputDate").value;
                if (dateTimeInputValue) {
                    var dateTimeValue = new Date(document.getElementById("ctl00_PlaceHolderMain_dateTimeInput_dateTimeInputDate").value);
                    if (dateTimeValue)
                        wfParams['dateTimeArg'] = dateTimeValue;
                }

                // $loc_GetWorkflowParametersComment$
                var context = SP.ClientContext.get_current();
                var wfManager = SP.WorkflowServices.WorkflowServicesManager.newObject(context, context.get_web());
                var wfDeployService = wfManager.getWorkflowDeploymentService();
                var subscriptionService = wfManager.getWorkflowSubscriptionService();

                context.load(subscriptionService);
                context.executeQueryAsync(

                    function (sender, args) { // $loc_SuccessComment$
                        var subscription = null;
                        // $loc_LoadSubscriptionComment$
                        if (subscriptionId)
                            subscription = subscriptionService.getSubscription(subscriptionId);
                        if (subscription) {
                            if (itemId != null && itemId != "") {
                                // $loc_StartListWorkflowComment$
                                wfManager.getWorkflowInstanceService().startWorkflowOnListItem(subscription, itemId, wfParams);
                            }
                            else {
                                // $loc_StartSiteWorkflowComment$
                                wfManager.getWorkflowInstanceService().startWorkflow(subscription, wfParams);
                            }
                            context.executeQueryAsync(
                                function (sender, args) {
                                    // $loc_SuccessComment$
                                    RedirFromInitForm(redirectUrl);
                                },
                                function (sender, args) {
                                    // $loc_ErrorComment$
                                    alert(errorMessage + "  " + args.get_message());
                                    RedirFromInitForm(redirectUrl);
                                }
                            )
                        }
                        else {
                            // $loc_FailToLoadSubscriptionComment$
                            alert(errorMessage + "  Could not load the workflow subscription.");
                            RedirFromInitForm(redirectUrl);
                        }
                    },
                    function (sender, args) { // $loc_ErrorComment$
                        alert(errorMessage + "  " + args.get_message());
                        RedirFromInitForm(redirectUrl);
                    }
                )
            }
        }

        // ---------- $loc_RedirectFromPageComment$ ----------
        function RedirFromInitForm(redirectUrl) {
            window.location = redirectUrl;
        }

        // ---------- $loc_ReturnAssociativeArrayComment$ ----------
        function GetUrlParams() {
            var urlParams = null;
            if (urlParams == null) {
                urlParams = {};
                var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
                    urlParams[key] = decodeURIComponent(value);
                });
            }
            return urlParams;
        }
    </script>

</asp:Content>
