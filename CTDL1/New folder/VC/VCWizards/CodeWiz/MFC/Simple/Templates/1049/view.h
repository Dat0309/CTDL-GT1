#pragma once


// представление [!output CLASS_NAME]

class [!output CLASS_NAME] : public [!output BASE_CLASS]
{
	DECLARE_DYNCREATE([!output CLASS_NAME])

protected:
	[!output CLASS_NAME]();           // защищенный конструктор, используемый при динамическом создании
	virtual ~[!output CLASS_NAME]();

public:
[!if AUTOMATION || CREATABLE]
	virtual void OnFinalRelease();
[!endif]
[!if CVIEW]
	virtual void OnDraw(CDC* pDC);      // для отрисовки этого представления
[!endif]
#ifdef _DEBUG
	virtual void AssertValid() const;
#ifndef _WIN32_WCE
	virtual void Dump(CDumpContext& dc) const;
#endif
#endif

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


