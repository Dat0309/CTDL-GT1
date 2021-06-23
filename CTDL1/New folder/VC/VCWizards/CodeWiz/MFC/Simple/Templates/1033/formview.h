#pragma once



// [!output CLASS_NAME] form view

class [!output CLASS_NAME] : public CFormView
{
	DECLARE_DYNCREATE([!output CLASS_NAME])

protected:
	[!output CLASS_NAME]();           // protected constructor used by dynamic creation
	virtual ~[!output CLASS_NAME]();

public:
	enum { IDD = [!output IDD_DIALOG] };
[!if AUTOMATION || CREATABLE]

	virtual void OnFinalRelease();
[!endif]
#ifdef _DEBUG
	virtual void AssertValid() const;
#ifndef _WIN32_WCE
	virtual void Dump(CDumpContext& dc) const;
#endif
#endif

protected:
	virtual void DoDataExchange(CDataExchange* pDX);    // DDX/DDV support

	DECLARE_MESSAGE_MAP()
[!if CREATABLE]
	DECLARE_OLECREATE([!output CLASS_NAME])
[!endif]
[!if AUTOMATION || CREATABLE]
	DECLARE_DISPATCH_MAP()
	DECLARE_INTERFACE_MAP()
[!endif]
};


