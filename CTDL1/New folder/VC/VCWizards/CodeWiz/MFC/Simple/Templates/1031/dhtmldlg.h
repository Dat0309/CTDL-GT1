#pragma once

#ifdef _WIN32_WCE
#error "CDHtmlDialog wird für Windows CE nicht unterstützt."
#endif 

// [!output CLASS_NAME]-Dialogfeld

class [!output CLASS_NAME] : public CDHtmlDialog
{
	DECLARE_DYNCREATE([!output CLASS_NAME])

public:
	[!output CLASS_NAME](CWnd* pParent = NULL);   // Standardkonstruktor
	virtual ~[!output CLASS_NAME]();
// Überschreibungen
[!if AUTOMATION || CREATABLE]

	virtual void OnFinalRelease();
[!endif]
	HRESULT OnButtonOK(IHTMLElement *pElement);
	HRESULT OnButtonCancel(IHTMLElement *pElement);

// Dialogfelddaten
	enum { IDD = [!output IDD_DIALOG], IDH = [!output HTML_ID] };

protected:
	virtual void DoDataExchange(CDataExchange* pDX);    // DDX/DDV-Unterstützung
	virtual BOOL OnInitDialog();

	DECLARE_MESSAGE_MAP()
	DECLARE_DHTML_EVENT_MAP()
[!if CREATABLE]
	DECLARE_OLECREATE([!output CLASS_NAME])
[!endif]
[!if AUTOMATION || CREATABLE]
	DECLARE_DISPATCH_MAP()
	DECLARE_INTERFACE_MAP()
[!endif]
};
