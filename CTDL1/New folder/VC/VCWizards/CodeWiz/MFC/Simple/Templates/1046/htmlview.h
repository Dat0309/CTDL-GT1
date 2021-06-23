#pragma once

#ifdef _WIN32_WCE
#error "CHtmlView não suportado para Windows CE."
#endif 

// [!output CLASS_NAME] modo de visualização html

class [!output CLASS_NAME] : public CHtmlView
{
	DECLARE_DYNCREATE([!output CLASS_NAME])

protected:
	[!output CLASS_NAME]();           // construtor protegido utilizado para criação dinâmica
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
	virtual void DoDataExchange(CDataExchange* pDX);    // Suporte DDX/DDV

	DECLARE_MESSAGE_MAP()
[!if CREATABLE]
	DECLARE_OLECREATE([!output CLASS_NAME])
[!endif]
[!if AUTOMATION || CREATABLE]
	DECLARE_DISPATCH_MAP()
	DECLARE_INTERFACE_MAP()
[!endif]
};


