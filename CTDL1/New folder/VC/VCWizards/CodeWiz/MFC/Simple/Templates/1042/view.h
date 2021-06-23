#pragma once


// [!output CLASS_NAME] 뷰입니다.

class [!output CLASS_NAME] : public [!output BASE_CLASS]
{
	DECLARE_DYNCREATE([!output CLASS_NAME])

protected:
	[!output CLASS_NAME]();           // 동적 만들기에 사용되는 protected 생성자입니다.
	virtual ~[!output CLASS_NAME]();

public:
[!if AUTOMATION || CREATABLE]
	virtual void OnFinalRelease();
[!endif]
[!if CVIEW]
	virtual void OnDraw(CDC* pDC);      // 이 뷰를 그리기 위해 재정의되었습니다.
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


