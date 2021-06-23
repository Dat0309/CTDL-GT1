using System;
using System.Collections;
using System.Configuration;
using System.Data;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using Microsoft.SharePoint;
using Microsoft.SharePoint.WebControls;
using Microsoft.SharePoint.Workflow;
using Microsoft.SharePoint.Utilities;

namespace $rootnamespace$
{
    public partial class $safeitemrootname$ : LayoutsPageBase
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            InitializeParams();

            // $loc_PrePopulateComment$
        }

        // $loc_GetInitDataSummary$
        private string GetInitiationData()
        {
            // $loc_GetInitDataComment$
            return string.Empty;
        }

        protected void StartWorkflow_Click(object sender, EventArgs e)
        {
            // $loc_StartWorkflowClickComment$
            try
            {
                HandleStartWorkflow();
            }
            catch (Exception)
            {
                SPUtility.TransferToErrorPage(SPHttpUtility.UrlKeyValueEncode("$loc_WorkflowFailedStartError$"));
            }
        }

        protected void Cancel_Click(object sender, EventArgs e)
        {
            SPUtility.Redirect("Workflow.aspx", SPRedirectFlags.RelativeToLayoutsPage, HttpContext.Current, Page.ClientQueryString);
        }

        #region $loc_InitiationCodeRegion$
        
        private string associationGuid;
        private SPList workflowList;
        private SPListItem workflowListItem;

        private void InitializeParams()
        {
            try
            {
                this.associationGuid = Request.Params["TemplateID"];

                // $loc_SiteWorkflowComment$
                if (!String.IsNullOrEmpty(Request.Params["List"]) && !String.IsNullOrEmpty(Request.Params["ID"]))
                {
                    this.workflowList = this.Web.Lists[new Guid(Request.Params["List"])];
                    this.workflowListItem = this.workflowList.GetItemById(Convert.ToInt32(Request.Params["ID"]));
                }
            }
            catch (Exception)
            {
                SPUtility.TransferToErrorPage(SPHttpUtility.UrlKeyValueEncode("$loc_ParamsFailedLoadingError$"));
            }
        }

        private void HandleStartWorkflow()
        {
            if (this.workflowList != null && this.workflowListItem != null)
            {
                StartListWorkflow();
            }
            else
            {
                StartSiteWorkflow();
            }
        }

        private void StartSiteWorkflow()
        {
            SPWorkflowAssociation association = this.Web.WorkflowAssociations[new Guid(this.associationGuid)];
            this.Web.Site.WorkflowManager.StartWorkflow((object)null, association, GetInitiationData(), SPWorkflowRunOptions.Synchronous);
            SPUtility.Redirect(this.Web.Url, SPRedirectFlags.UseSource, HttpContext.Current);
        }

        private void StartListWorkflow()
        {
            SPWorkflowAssociation association = this.workflowList.WorkflowAssociations[new Guid(this.associationGuid)];
            this.Web.Site.WorkflowManager.StartWorkflow(workflowListItem, association, GetInitiationData());
            SPUtility.Redirect(this.workflowList.DefaultViewUrl, SPRedirectFlags.UseSource, HttpContext.Current);
        }
        #endregion
    }
}