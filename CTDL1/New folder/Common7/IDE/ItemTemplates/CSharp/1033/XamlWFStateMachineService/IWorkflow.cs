using System;
using System.Linq;
using System.Collections.Generic;
using System.Text;
using System.ServiceModel;

namespace $rootnamespace$
{
	// NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "$safeitemrootname$" in both code and config file together.
	[ServiceContract]
	public interface $safeitemrootname$
	{

		[OperationContract]
		string GetData(int value);

	}
}
