// [!output ROWSET_IMPL] : Implementation of [!output COMMAND_CLASS]

#include "stdafx.h"
#include "[!output ROWSET_HEADER]"
#include "[!output DATASOURCE_HEADER]"

// [!output COMMAND_CLASS]

HRESULT [!output COMMAND_CLASS]::Execute(IUnknown * pUnkOuter, REFIID riid, DBPARAMS * pParams, 
								 LONG * pcRowsAffected, IUnknown ** ppRowset)
{
	[!output ROWSET_CLASS]* pRowset;
	return CreateRowset(pUnkOuter, riid, pParams, pcRowsAffected, ppRowset, pRowset);
}

