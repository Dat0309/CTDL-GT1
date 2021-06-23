// [!output ROWSET_HEADER] : Declaration of the [!output ROWSET_CLASS]

#pragma once

#include "resource.h"       // main symbols
[!if !ATTRIBUTED]
#include "[!output MIDL_H_FILENAME]"
[!endif]

using namespace ATL;

class C[!output SHORT_NAME]WindowsFile: 
	public WIN32_FIND_DATA
{
public:

BEGIN_PROVIDER_COLUMN_MAP(C[!output SHORT_NAME]WindowsFile)
	PROVIDER_COLUMN_ENTRY("FileAttributes", 1, dwFileAttributes)
	PROVIDER_COLUMN_ENTRY("FileSizeHigh", 2, nFileSizeHigh)
	PROVIDER_COLUMN_ENTRY("FileSizeLow", 3, nFileSizeLow)
	PROVIDER_COLUMN_ENTRY_STR("FileName", 4, cFileName)
	PROVIDER_COLUMN_ENTRY_STR("AltFileName", 5, cAlternateFileName)
END_PROVIDER_COLUMN_MAP()

};

// [!output COMMAND_CLASS]
[!if ATTRIBUTED]
[
	coclass,
	noncreatable,
	uuid("[!output CLSID_COMMAND_REGISTRY_FORMAT]"),
	threading(apartment),
	registration_script("none")
]
[!endif]
class ATL_NO_VTABLE [!output COMMAND_CLASS] : 
[!if !ATTRIBUTED]
	public CComObjectRootEx<CComSingleThreadModel>,
[!endif]
	public IAccessorImpl<[!output COMMAND_CLASS]>,
	public ICommandTextImpl<[!output COMMAND_CLASS]>,
	public ICommandPropertiesImpl<[!output COMMAND_CLASS]>,
	public IObjectWithSiteImpl<[!output COMMAND_CLASS]>,
	public IConvertTypeImpl<[!output COMMAND_CLASS]>,
	public IColumnsInfoImpl<[!output COMMAND_CLASS]>,
	public IInternalCommandConnectionImpl<[!output COMMAND_CLASS]>

{
public:

[!if !ATTRIBUTED]
BEGIN_COM_MAP([!output COMMAND_CLASS])
	COM_INTERFACE_ENTRY(ICommand)
	COM_INTERFACE_ENTRY(IObjectWithSite)
	COM_INTERFACE_ENTRY(IAccessor)
	COM_INTERFACE_ENTRY(ICommandProperties)
	COM_INTERFACE_ENTRY2(ICommandText, ICommand)
	COM_INTERFACE_ENTRY(IColumnsInfo)
	COM_INTERFACE_ENTRY(IConvertType)
	COM_INTERFACE_ENTRY(IInternalConnection)
END_COM_MAP()
[!endif]

// ICommand
public:

	HRESULT FinalConstruct()
	{
		HRESULT hr = CConvertHelper::FinalConstruct();
		if (FAILED (hr))
			return hr;
		hr = IAccessorImpl<[!output COMMAND_CLASS]>::FinalConstruct();
		if (FAILED(hr))
			return hr;
		return CUtlProps<[!output COMMAND_CLASS]>::FInit();
	}
	void FinalRelease()
	{
		IAccessorImpl<[!output COMMAND_CLASS]>::FinalRelease();
	}

	HRESULT WINAPI Execute(IUnknown * pUnkOuter, REFIID riid, DBPARAMS * pParams, 
						  LONG * pcRowsAffected, IUnknown ** ppRowset);

	static ATLCOLUMNINFO* GetColumnInfo([!output COMMAND_CLASS]* pv, ULONG* pcInfo)
	{
		return C[!output SHORT_NAME]WindowsFile::GetColumnInfo(pv,pcInfo);
	}

BEGIN_PROPSET_MAP([!output COMMAND_CLASS])
	BEGIN_PROPERTY_SET(DBPROPSET_ROWSET)
		PROPERTY_INFO_ENTRY(IAccessor)
		PROPERTY_INFO_ENTRY(IColumnsInfo)
		PROPERTY_INFO_ENTRY(IConvertType)
		PROPERTY_INFO_ENTRY(IRowset)
		PROPERTY_INFO_ENTRY(IRowsetIdentity)
		PROPERTY_INFO_ENTRY(IRowsetInfo)
		PROPERTY_INFO_ENTRY(IRowsetLocate)
		PROPERTY_INFO_ENTRY(BOOKMARKS)
		PROPERTY_INFO_ENTRY(BOOKMARKSKIPPED)
		PROPERTY_INFO_ENTRY(BOOKMARKTYPE)
		PROPERTY_INFO_ENTRY(CANFETCHBACKWARDS)
		PROPERTY_INFO_ENTRY(CANHOLDROWS)
		PROPERTY_INFO_ENTRY(CANSCROLLBACKWARDS)
		PROPERTY_INFO_ENTRY(LITERALBOOKMARKS)
		PROPERTY_INFO_ENTRY(ORDEREDBOOKMARKS)
	END_PROPERTY_SET(DBPROPSET_ROWSET)
END_PROPSET_MAP()

};

class [!output ROWSET_CLASS] : 
	public CRowsetImpl< [!output ROWSET_CLASS], C[!output SHORT_NAME]WindowsFile, [!output COMMAND_CLASS]>
{
public:

	HRESULT Execute(DBPARAMS * /*pParams*/, LONG* pcRowsAffected)
	{
		HANDLE hFile;

		CW2TEX<_MAX_PATH> szDir(m_strCommandText == L"" ? L"*.*" : m_strCommandText);

		C[!output SHORT_NAME]WindowsFile wf;
		hFile = FindFirstFile(szDir, &wf);
		if (hFile == INVALID_HANDLE_VALUE)
			return DB_E_ERRORSINCOMMAND;
		LONG cFiles = 1;
		BOOL bMoreFiles = TRUE;
		while (bMoreFiles)
		{
			_ATLTRY
			{
				m_rgRowData.Add(wf);
			}
			_ATLCATCH( e )
			{
				_ATLDELETEEXCEPTION( e )
				return E_OUTOFMEMORY;
			}
			bMoreFiles = FindNextFile(hFile, &wf);
			cFiles++;
		}
		FindClose(hFile);
		if (pcRowsAffected != NULL)
			*pcRowsAffected = cFiles;
		return S_OK;
	}
};


