#pragma once

// [!output CONTROL_HEADER] : [!output CONTROL_CLASS] ActiveX 컨트롤 클래스의 선언입니다.


// [!output CONTROL_CLASS] : 구현을 보려면 [!output CONTROL_IMPL]을(를) 참조하십시오.

class [!output CONTROL_CLASS] : public COleControl
{
	DECLARE_DYNCREATE([!output CONTROL_CLASS])

// 생성자입니다.
public:
	[!output CONTROL_CLASS]();

// 재정의입니다.
public:
	virtual void OnDraw(CDC* pdc, const CRect& rcBounds, const CRect& rcInvalid);
[!if SUBCLASS_WINDOW]
	virtual BOOL PreCreateWindow(CREATESTRUCT& cs);
[!endif]
	virtual void DoPropExchange(CPropExchange* pPX);
	virtual void OnResetState();
[!if WINDOWLESS || UNCLIPPED_DEVICE_CONTEXT || FLICKER_FREE || MOUSE_NOTIFICATIONS || OPTIMIZED_DRAW]
	virtual DWORD GetControlFlags();
[!endif]

// 구현입니다.
protected:
	~[!output CONTROL_CLASS]();

[!if RUNTIME_LICENSE]
	BEGIN_OLEFACTORY([!output CONTROL_CLASS])        // 클래스 팩터리와 GUID입니다.
		virtual BOOL VerifyUserLicense();
		virtual BOOL GetLicenseKey(DWORD, BSTR *);
	END_OLEFACTORY([!output CONTROL_CLASS])

[!else]
	DECLARE_OLECREATE_EX([!output CONTROL_CLASS])    // 클래스 팩터리와 GUID입니다.
[!endif]
	DECLARE_OLETYPELIB([!output CONTROL_CLASS])      // GetTypeInfo
	DECLARE_PROPPAGEIDS([!output CONTROL_CLASS])     // 속성 페이지 ID입니다.
	DECLARE_OLECTLTYPE([!output CONTROL_CLASS])		// 형식 이름과 기타 상태입니다.

[!if SUBCLASS_WINDOW]
	// 서브클래싱된 컨트롤 지원입니다.
	BOOL IsSubclassedControl();
	LRESULT OnOcmCommand(WPARAM wParam, LPARAM lParam);

[!endif]
// 메시지 맵입니다.
	DECLARE_MESSAGE_MAP()

// 디스패치 맵입니다.
	DECLARE_DISPATCH_MAP()
[!if ABOUT_BOX]

	afx_msg void AboutBox();
[!endif]

// 이벤트 맵입니다.
	DECLARE_EVENT_MAP()

// 디스패치와 이벤트 ID입니다.
public:
	enum {
	};
};

