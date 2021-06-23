#pragma once

#ifdef _WIN32_WCE
#error "CHtmlView non è supportato per Windows CE."
#endif 

// visualizzazione HTML [!output CLASS_NAME]

class [!output CLASS_NAME] : public CHtmlView
{
	DECLARE_DYNCREATE([!output CLASS_NAME])

protected:
	[!output CLASS_NAME]();           // costruttore protetto utilizzato dalla creazione dinamica
	virtual ~[!output CLASS_NAME]();

public:
#ifdef _DEBUG
	virtual void AssertValid() const;
	virtual void Dump(CDumpContext& dc) const;
#endif
[!if AUTOMATION || CREATABLE]
	virtual void OnFinalRelease();
[!endif]

protected:
	virtual void DoDataExchange(CDataExchange* pDX);    // Supporto DDX/DDV

	DECLARE_MESSAGE_MAP()
[!if CREATABLE]
	DECLARE_OLECREATE([!output CLASS_NAME])
[!endif]
[!if AUTOMATION || CREATABLE]
	DECLARE_DISPATCH_MAP()
	DECLARE_INTERFACE_MAP()
[!endif]
};


