// [!output HEADER_FILE]: объ€вление классов оболочки дл€ элементов управлени€ ActiveX, созданных при помощи Microsoft Visual C++

#pragma once

/////////////////////////////////////////////////////////////////////////////
// [!output CLASS_NAME]

class [!output CLASS_NAME] : public CWnd
{
protected:
	DECLARE_DYNCREATE([!output CLASS_NAME])
public:
	CLSID const& GetClsid()
	{
		static CLSID const clsid
			= [!output CONTROL_CLSID];
		return clsid;
	}
	virtual BOOL Create(LPCTSTR lpszClassName, LPCTSTR lpszWindowName, DWORD dwStyle,
						const RECT& rect, CWnd* pParentWnd, UINT nID, 
						CCreateContext* pContext = NULL)
	{ 
		return CreateControl(GetClsid(), lpszWindowName, dwStyle, rect, pParentWnd, nID); 
	}

    BOOL Create(LPCTSTR lpszWindowName, DWORD dwStyle, const RECT& rect, CWnd* pParentWnd, 
				UINT nID, CFile* pPersist = NULL, BOOL bStorage = FALSE,
				BSTR bstrLicKey = NULL)
	{ 
		return CreateControl(GetClsid(), lpszWindowName, dwStyle, rect, pParentWnd, nID,
		pPersist, bStorage, bstrLicKey); 
	}

// јтрибуты
public:

// ќперации
public:

[!output CLASS_TEXT]

};
