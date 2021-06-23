#pragma once

// [!output CLASS_NAME] 문서입니다.

class [!output CLASS_NAME] : public [!output BASE_CLASS]
{
	DECLARE_DYNCREATE([!output CLASS_NAME])

public:
	[!output CLASS_NAME]();
	virtual ~[!output CLASS_NAME]();
[!if AUTOMATION || CREATABLE]

	virtual void OnFinalRelease();
[!endif]
#ifndef _WIN32_WCE
	virtual void Serialize(CArchive& ar);   // 문서 입/출력을 위해 재정의되었습니다.
#endif
#ifdef _DEBUG
	virtual void AssertValid() const;
#ifndef _WIN32_WCE
	virtual void Dump(CDumpContext& dc) const;
#endif
#endif

protected:
	virtual BOOL OnNewDocument();
[!if COLESERVERDOC]
#ifndef _WIN32_WCE
	virtual COleServerItem* OnGetEmbeddedItem();
#endif
[!endif]

	DECLARE_MESSAGE_MAP()
[!if CREATABLE]
	DECLARE_OLECREATE([!output CLASS_NAME])
[!endif]
[!if AUTOMATION || CREATABLE]
	DECLARE_DISPATCH_MAP()
	DECLARE_INTERFACE_MAP()
[!endif]
};
