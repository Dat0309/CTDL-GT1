using System;
using System.Collections.Generic;
$if$ ($targetframeworkversion$ == 3.5)using System.Linq;$endif$$if$ ($targetframeworkversion$ == 4.0)using System.Linq;
$endif$using System.Text;
using System.Windows.Forms;
using Office = Microsoft.Office.Core;

namespace $rootnamespace$
{
    partial class $safeitemrootname$: UserControl
    {
        public $safeitemrootname$()
        {
            InitializeComponent();
        }
    }
}
