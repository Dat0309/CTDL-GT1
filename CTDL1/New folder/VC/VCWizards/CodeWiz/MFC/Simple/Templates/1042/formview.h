#pragma once



// [!output CLASS_NAME] 폼 뷰입니다.

class [!output CLASS_NAME] : public CFormView
{
	DECLARE_DYNCREATE([!output CLASS_NAME])

protected:
	[!output CLASS_NAME]();           // 동적 만들기에 사용되는 protected 생성자입니다.
	virtual ~[!output CLASS_NAME]();

public:
	enum { IDD = [!output IDD_DIALOG] };
[!if AUTOMATION || CREATABLE]

	virtual void OnFinalRelease();
[!endif]
#ifdef _DEBUG
	virtual void AssertValid() const;
#ifndef _WIN32_WCE
	virtual void Dump(CDumpContext& dc) const;
#endif
#endif

protected:
	virtual void DoDataExchange(CDataExchange* pDX);    // DDX/DDV 지원입니다.

	DECLARE_MESSAGE_MAP()
[!if CREATABLE]
	DECLARE_OLECREATE([!output CLASS_NAME])
[!endif]
[!if AUTOMATION || CREATABLE]
	DECLARE_DISPATCH_MAP()
	DECLARE_INTERFACE_MAP()
[!endif]
};


