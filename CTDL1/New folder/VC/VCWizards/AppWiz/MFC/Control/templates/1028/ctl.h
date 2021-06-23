#pragma once

// [!output CONTROL_HEADER] : [!output CONTROL_CLASS] ActiveX ������O���ŧi�C


// [!output CONTROL_CLASS] : ������@�аѾ\ [!output CONTROL_IMPL]�C

class [!output CONTROL_CLASS] : public COleControl
{
	DECLARE_DYNCREATE([!output CONTROL_CLASS])

// �غc�禡
public:
	[!output CONTROL_CLASS]();

// �мg
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

// �{���X��@
protected:
	~[!output CONTROL_CLASS]();

[!if RUNTIME_LICENSE]
	BEGIN_OLEFACTORY([!output CONTROL_CLASS])        // Class Factory �M GUID
		virtual BOOL VerifyUserLicense();
		virtual BOOL GetLicenseKey(DWORD, BSTR *);
	END_OLEFACTORY([!output CONTROL_CLASS])

[!else]
	DECLARE_OLECREATE_EX([!output CONTROL_CLASS])    // Class Factory �M GUID
[!endif]
	DECLARE_OLETYPELIB([!output CONTROL_CLASS])      // GetTypeInfo
	DECLARE_PROPPAGEIDS([!output CONTROL_CLASS])     // �ݩʭ� ID
	DECLARE_OLECTLTYPE([!output CONTROL_CLASS])		// �����W�٤Ψ�L���A

[!if SUBCLASS_WINDOW]
	// �l�ͤl���O����䴩
	BOOL IsSubclassedControl();
	LRESULT OnOcmCommand(WPARAM wParam, LPARAM lParam);

[!endif]
// �T������
	DECLARE_MESSAGE_MAP()

// ��������
	DECLARE_DISPATCH_MAP()
[!if ABOUT_BOX]

	afx_msg void AboutBox();
[!endif]

// �ƥ����
	DECLARE_EVENT_MAP()

// �����M�ƥ� ID
public:
	enum {
	};
};
