// [!output IMPL_FILE] : Implementation of [!output CLASS_NAME]

#include "stdafx.h"
#include "[!output HEADER_FILE]"


// [!output CLASS_NAME]

[!if !ATTRIBUTED]
[!if SUPPORT_ERROR_INFO]
STDMETHODIMP [!output CLASS_NAME]::InterfaceSupportsErrorInfo(REFIID riid)
{
	static const IID* const arr[] = 
	{
		&IID_[!output INTERFACE_NAME]
	};

	for (int i=0; i < sizeof(arr) / sizeof(arr[0]); i++)
	{
		if (InlineIsEqualGUID(*arr[i],riid))
			return S_OK;
	}
	return S_FALSE;
}
[!endif]
[!endif]
