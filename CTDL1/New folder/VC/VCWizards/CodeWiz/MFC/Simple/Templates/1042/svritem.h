#pragma once

#ifdef _WIN32_WCE
#error "Windows CE에서는 COleServerItem이 지원되지 않습니다."
#endif 

// [!output CLASS_NAME] 문서입니다.

class [!output CLASS_NAME] : public COleServerItem
{
[!if CREATABLE]
	DECLARE_DYNCREATE([!output CLASS_NAME])
[!else]
	DECLARE_DYNAMIC([!output CLASS_NAME])
[!endif]

public:
	[!output CLASS_NAME](COleServerDoc* pServerDoc = NULL, BOOL bAutoDelete = FALSE);
	virtual ~[!output CLASS_NAME]();

[!if AUTOMATION || CREATABLE]
	virtual void OnFinalRelease();
[!endif]
#ifndef _WIN32_WCE
	virtual void Serialize(CArchive& ar);   // 문서 입/출력을 위해 재정의되었습니다.
#endif
	virtual BOOL OnDraw(CDC* pDC, CSize& rSize);

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
