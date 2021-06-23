﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Resources;
using System.Text;
using Office = Microsoft.Office.Core;
using Outlook = Microsoft.Office.Interop.Outlook;

namespace $rootnamespace$
{
    public partial class $safeitemrootname$
    {
        #region Form Region Factory 

        $formregionattributes$ public partial class $safeitemrootname$Factory
        {
            private void InitializeManifest()
            {
                ResourceManager resources = new ResourceManager(typeof($safeitemrootname$));
                $manifestinitialization$
            }

            // Occurs before the form region is initialized.
            // To prevent the form region from appearing, set e.Cancel to true.
            // Use e.OutlookItem to get a reference to the current Outlook item.
            private void $safeitemrootname$Factory_FormRegionInitializing(object sender, Microsoft.Office.Tools.Outlook.FormRegionInitializingEventArgs e)
            {
            }
        }

        #endregion

        // Occurs before the form region is displayed.
        // Use this.OutlookItem to get a reference to the current Outlook item.
        // Use this.OutlookFormRegion to get a reference to the form region.
        private void $safeitemrootname$_FormRegionShowing(object sender, System.EventArgs e)
        {
        }

        // Occurs when the form region is closed.
        // Use this.OutlookItem to get a reference to the current Outlook item.
        // Use this.OutlookFormRegion to get a reference to the form region.
        private void $safeitemrootname$_FormRegionClosed(object sender, System.EventArgs e)
        {
        }
    }
}
