#pragma once

#ifdef _WIN32_WCE
#error "CDHtmlDialog non è supporto per Windows CE."
#endif 

// finestra di dialogo [!output CLASS_NAME]

class [!output CLASS_NAME] : public CDHtmlDialog
{
	DECLARE_DYNCREATE([!output CLASS_NAME])

public:
	[!output CLASS_NAME](CWnd* pParent = NULL);   // costruttore standard
	virtual ~[!output CLASS_NAME]();
// Override
[!if AUTOMATION || CREATABLE]

	virtual void OnFinalRelease();
[!endif]
	HRESULT OnButtonOK(IHTMLElement *pElement);
	HRESULT OnButtonCancel(IHTMLElement *pElement);

// Dati della finestra di dialogo
	enum { IDD = [!output IDD_DIALOG], IDH = [!output HTML_ID] };

protected:
	virtual void DoDataExchange(CDataExchange* pDX);    // Supporto DDX/DDV
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
