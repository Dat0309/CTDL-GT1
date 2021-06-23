using System;
using System.ComponentModel;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using Microsoft.SharePoint;
using Microsoft.SharePoint.WebControls;

namespace $rootnamespace$.$subnamespace$
{
    [ToolboxItemAttribute(false)]
    public class $safeitemrootname$ : WebPart
    {
        // $loc_ascxPath_comment$
        private const string _ascxPath = @"~/_CONTROLTEMPLATES/15/$rootnamespace$/$fileinputname$/$fileinputname$UserControl.ascx";

        protected override void CreateChildControls()
        {
            Control control = Page.LoadControl(_ascxPath);
            Controls.Add(control);
        }
    }
}
