#pragma once


// okno dialogowe [!output CLASS_NAME]

class [!output CLASS_NAME] : public [!output BASE_CLASS]
{
[!if CREATABLE]
	DECLARE_DYNCREATE([!output CLASS_NAME])
[!else]
	DECLARE_DYNAMIC([!output CLASS_NAME])
[!endif]

public:
[!if CPROPERTYPAGE]
	[!output CLASS_NAME]();
[!else]
	[!output CLASS_NAME](CWnd* pParent = NULL);   // konstruktor standardowy
[!endif]
	virtual ~[!output CLASS_NAME]();
[!if AUTOMATION || CREATABLE]

	virtual void OnFinalRelease();
[!endif]

// Dane okna dialogowego
	enum { IDD = [!output IDD_DIALOG] };

protected:
	virtual void DoDataExchange(CDataExchange* pDX);    // obs�uga DDX/DDV

	DECLARE_MESSAGE_MAP()
[!if CREATABLE]
	DECLARE_OLECREATE([!output CLASS_NAME])
[!endif]
[!if AUTOMATION || CREATABLE]
	DECLARE_DISPATCH_MAP()
	DECLARE_INTERFACE_MAP()
[!endif]
};
