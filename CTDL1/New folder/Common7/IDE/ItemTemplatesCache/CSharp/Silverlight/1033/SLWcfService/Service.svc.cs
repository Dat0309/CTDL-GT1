using System;
$if$ ($targetframeworkversion$ >= 3.5)using System.Linq;
$endif$using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Activation;

namespace $rootnamespace$
{
	[ServiceContract(Namespace="")]
	[AspNetCompatibilityRequirements(RequirementsMode=AspNetCompatibilityRequirementsMode.Allowed)]
	public class $safeitemrootname$
	{
		[OperationContract]
		public void DoWork()
		{
			// Add your operation implementation here
			return;
		}

		// Add more operations here and mark them with [OperationContract]
	}
}
