#pragma once



// [!output CLASS_NAME]-Ansicht

class [!output CLASS_NAME] : public CScrollView
{
	DECLARE_DYNCREATE([!output CLASS_NAME])

protected:
	[!output CLASS_NAME]();           // Dynamische Erstellung verwendet geschützten Konstruktor
	virtual ~[!output CLASS_NAME]();

public:
#ifdef _DEBUG
	virtual void AssertValid() const;
#ifndef _WIN32_WCE
	virtual void Dump(CDumpContext& dc) const;
#endif
#endif
[!if AUTOMATION || CREATABLE]
	virtual void OnFinalRelease();
[!endif]

protected:
	virtual void OnDraw(CDC* pDC);      // Überladen, um diese Ansicht darzustellen
	virtual void OnInitialUpdate();     // Erster Aufruf nach Erstellung

	DECLARE_MESSAGE_MAP()
[!if CREATABLE]
	DECLARE_OLECREATE([!output CLASS_NAME])
[!endif]
[!if AUTOMATION || CREATABLE]
	DECLARE_DISPATCH_MAP()
	DECLARE_INTERFACE_MAP()
[!endif]
};


