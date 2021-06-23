using System;
using System.ComponentModel;
using System.ComponentModel.Design;
using System.Collections;
$if$ ($targetframeworkversion$ >= 3.5)using System.Linq;$endif$
using System.Workflow.ComponentModel;
using System.Workflow.ComponentModel.Design;
using System.Workflow.ComponentModel.Compiler;
using System.Workflow.ComponentModel.Serialization;
using System.Workflow.Runtime;
using System.Workflow.Activities;
using System.Workflow.Activities.Rules;

namespace $rootnamespace$
{
	public partial class $safeitemname$: SequenceActivity
	{
		public $safeitemname$()
		{
			InitializeComponent();
		}
	}
}
