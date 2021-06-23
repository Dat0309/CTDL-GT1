#pragma once

// [!output CONTROL_HEADER] : [!output CONTROL_CLASS] ActiveX �R���g���[�� �N���X�̐錾�ł��B


// [!output CONTROL_CLASS] : �����Ɋւ��Ă� [!output CONTROL_IMPL] ���Q�Ƃ��Ă��������B

class [!output CONTROL_CLASS] : public COleControl
{
	DECLARE_DYNCREATE([!output CONTROL_CLASS])

// �R���X�g���N�^�[
public:
	[!output CONTROL_CLASS]();

// �I�[�o�[���C�h
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

// ����
protected:
	~[!output CONTROL_CLASS]();

[!if RUNTIME_LICENSE]
	BEGIN_OLEFACTORY([!output CONTROL_CLASS])        // �N���X �t�@�N�g�� �� guid
		virtual BOOL VerifyUserLicense();
		virtual BOOL GetLicenseKey(DWORD, BSTR *);
	END_OLEFACTORY([!output CONTROL_CLASS])

[!else]
	DECLARE_OLECREATE_EX([!output CONTROL_CLASS])    // �N���X �t�@�N�g�� �� guid
[!endif]
	DECLARE_OLETYPELIB([!output CONTROL_CLASS])      // GetTypeInfo
	DECLARE_PROPPAGEIDS([!output CONTROL_CLASS])     // �v���p�e�B �y�[�W ID
	DECLARE_OLECTLTYPE([!output CONTROL_CLASS])		// �^�C�v���Ƃ��̑��̃X�e�[�^�X

[!if SUBCLASS_WINDOW]
	// �T�u�N���X�����ꂽ�R���g���[���̃T�|�[�g
	BOOL IsSubclassedControl();
	LRESULT OnOcmCommand(WPARAM wParam, LPARAM lParam);

[!endif]
// ���b�Z�[�W �}�b�v
	DECLARE_MESSAGE_MAP()

// �f�B�X�p�b�` �}�b�v
	DECLARE_DISPATCH_MAP()
[!if ABOUT_BOX]

	afx_msg void AboutBox();
[!endif]

// �C�x���g �}�b�v
	DECLARE_EVENT_MAP()

// �f�B�X�p�b�` �� �C�x���g ID
public:
	enum {
	};
};

