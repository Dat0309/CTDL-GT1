#pragma once



// [!output CLASS_NAME]

class [!output CLASS_NAME] : public CPropertySheet
{
[!if CREATABLE]
	DECLARE_DYNCREATE([!output CLASS_NAME])
protected:
	[!output CLASS_NAME]() { };           // protected constructor used by dynamic creation
[!else]
	DECLARE_DYNAMIC([!output CLASS_NAME])
[!endif]

public:
	[!output CLASS_NAME](UINT nIDCaption, CWnd* pParentWnd = NULL, UINT iSelectPage = 0);
	[!output CLASS_NAME](LPCTSTR pszCaption, CWnd* pParentWnd = NULL, UINT iSelectPage = 0);
	virtual ~[!output CLASS_NAME]();
[!if AUTOMATION || CREATABLE]

	virtual void OnFinalRelease();
[!endif]

protected:
	DECLARE_MESSAGE_MAP()
[!if CREATABLE]
	DECLARE_OLECREATE([!output CLASS_NAME])
[!endif]
[!if AUTOMATION || CREATABLE]
	DECLARE_DISPATCH_MAP()
	DECLARE_INTERFACE_MAP()
[!endif]
};


