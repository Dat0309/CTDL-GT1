#pragma once

#ifdef _WIN32_WCE
#error "CHtmlView n'est pas pris en charge pour Windows CE."
#endif 

// Mode HTML [!output CLASS_NAME]

class [!output CLASS_NAME] : public CHtmlView
{
	DECLARE_DYNCREATE([!output CLASS_NAME])

protected:
	[!output CLASS_NAME]();           // constructeur protégé utilisé par la création dynamique
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
	virtual void DoDataExchange(CDataExchange* pDX);    // Prise en charge de DDX/DDV

	DECLARE_MESSAGE_MAP()
[!if CREATABLE]
	DECLARE_OLECREATE([!output CLASS_NAME])
[!endif]
[!if AUTOMATION || CREATABLE]
	DECLARE_DISPATCH_MAP()
	DECLARE_INTERFACE_MAP()
[!endif]
};


