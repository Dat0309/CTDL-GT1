#pragma once

// [!output CONTROL_HEADER] : [!output CONTROL_CLASS] ActiveX ��Ʈ�� Ŭ������ �����Դϴ�.


// [!output CONTROL_CLASS] : ������ ������ [!output CONTROL_IMPL]��(��) �����Ͻʽÿ�.

class [!output CONTROL_CLASS] : public COleControl
{
	DECLARE_DYNCREATE([!output CONTROL_CLASS])

// �������Դϴ�.
public:
	[!output CONTROL_CLASS]();

// �������Դϴ�.
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

// �����Դϴ�.
protected:
	~[!output CONTROL_CLASS]();

[!if RUNTIME_LICENSE]
	BEGIN_OLEFACTORY([!output CONTROL_CLASS])        // Ŭ���� ���͸��� GUID�Դϴ�.
		virtual BOOL VerifyUserLicense();
		virtual BOOL GetLicenseKey(DWORD, BSTR *);
	END_OLEFACTORY([!output CONTROL_CLASS])

[!else]
	DECLARE_OLECREATE_EX([!output CONTROL_CLASS])    // Ŭ���� ���͸��� GUID�Դϴ�.
[!endif]
	DECLARE_OLETYPELIB([!output CONTROL_CLASS])      // GetTypeInfo
	DECLARE_PROPPAGEIDS([!output CONTROL_CLASS])     // �Ӽ� ������ ID�Դϴ�.
	DECLARE_OLECTLTYPE([!output CONTROL_CLASS])		// ���� �̸��� ��Ÿ �����Դϴ�.

[!if SUBCLASS_WINDOW]
	// ����Ŭ���̵� ��Ʈ�� �����Դϴ�.
	BOOL IsSubclassedControl();
	LRESULT OnOcmCommand(WPARAM wParam, LPARAM lParam);

[!endif]
// �޽��� ���Դϴ�.
	DECLARE_MESSAGE_MAP()

// ����ġ ���Դϴ�.
	DECLARE_DISPATCH_MAP()
[!if ABOUT_BOX]

	afx_msg void AboutBox();
[!endif]

// �̺�Ʈ ���Դϴ�.
	DECLARE_EVENT_MAP()

// ����ġ�� �̺�Ʈ ID�Դϴ�.
public:
	enum {
	};
};

