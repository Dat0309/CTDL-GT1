#pragma once

// [!output CONTROL_HEADER]: ���������� ������ �������� ���������� ActiveX ��� [!output CONTROL_CLASS].


// [!output CONTROL_CLASS]: ��� ���������� ��. [!output CONTROL_IMPL].

class [!output CONTROL_CLASS] : public COleControl
{
	DECLARE_DYNCREATE([!output CONTROL_CLASS])

// �����������
public:
	[!output CONTROL_CLASS]();

// ���������������
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

// ����������
protected:
	~[!output CONTROL_CLASS]();

[!if RUNTIME_LICENSE]
	BEGIN_OLEFACTORY([!output CONTROL_CLASS])        // ������� ������ � guid
		virtual BOOL VerifyUserLicense();
		virtual BOOL GetLicenseKey(DWORD, BSTR *);
	END_OLEFACTORY([!output CONTROL_CLASS])

[!else]
	DECLARE_OLECREATE_EX([!output CONTROL_CLASS])    // ������� ������ � guid
[!endif]
	DECLARE_OLETYPELIB([!output CONTROL_CLASS])      // GetTypeInfo
	DECLARE_PROPPAGEIDS([!output CONTROL_CLASS])     // �� �������� �������
	DECLARE_OLECTLTYPE([!output CONTROL_CLASS])		// ������� ��� � ������������� ���������

[!if SUBCLASS_WINDOW]
	// ��������� ��������� ���������� � ����������
	BOOL IsSubclassedControl();
	LRESULT OnOcmCommand(WPARAM wParam, LPARAM lParam);

[!endif]
// ����� ���������
	DECLARE_MESSAGE_MAP()

// ����� ���������� � ��������
	DECLARE_DISPATCH_MAP()
[!if ABOUT_BOX]

	afx_msg void AboutBox();
[!endif]

// ����� �������
	DECLARE_EVENT_MAP()

// ���������� � �������� � �� �������
public:
	enum {
	};
};

