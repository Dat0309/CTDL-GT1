// [!output CONTROL_IMPL] :  [!output CONTROL_CLASS] ActiveX �R���g���[�� �N���X�̎���

#include "stdafx.h"
#include "[!output PROJECT_NAME].h"
#include "[!output CONTROL_HEADER]"
#include "[!output PROPERTY_PAGE_HEADER]"
#include "afxdialogex.h"

#ifdef _DEBUG
#define new DEBUG_NEW
#endif

IMPLEMENT_DYNCREATE([!output CONTROL_CLASS], COleControl)

// ���b�Z�[�W �}�b�v

BEGIN_MESSAGE_MAP([!output CONTROL_CLASS], COleControl)
[!if SUBCLASS_WINDOW]
	ON_MESSAGE(OCM_COMMAND, &[!output CONTROL_CLASS]::OnOcmCommand)
[!endif]
[!if INSERTABLE]
	ON_OLEVERB(AFX_IDS_VERB_EDIT, OnEdit)
[!endif]
	ON_OLEVERB(AFX_IDS_VERB_PROPERTIES, OnProperties)
END_MESSAGE_MAP()

// �f�B�X�p�b�` �}�b�v

BEGIN_DISPATCH_MAP([!output CONTROL_CLASS], COleControl)
[!if ASYNC_PROPERTY_LOAD]
	DISP_STOCKPROP_READYSTATE()
[!endif]
[!if ABOUT_BOX]
	DISP_FUNCTION_ID([!output CONTROL_CLASS], "AboutBox", DISPID_ABOUTBOX, AboutBox, VT_EMPTY, VTS_NONE)
[!endif]
END_DISPATCH_MAP()

// �C�x���g �}�b�v

BEGIN_EVENT_MAP([!output CONTROL_CLASS], COleControl)
[!if ASYNC_PROPERTY_LOAD]
	EVENT_STOCK_READYSTATECHANGE()
[!endif]
END_EVENT_MAP()

// �v���p�e�B �y�[�W

// TODO: �v���p�e�B �y�[�W��ǉ����āABEGIN �s�̍Ō�ɂ���J�E���g�𑝂₵�Ă��������B
BEGIN_PROPPAGEIDS([!output CONTROL_CLASS], 1)
	PROPPAGEID([!output PROPERTY_PAGE_CLASS]::guid)
END_PROPPAGEIDS([!output CONTROL_CLASS])

// �N���X �t�@�N�g������� GUID �����������܂��B

[!if CONTROL_TYPE_ID_SET]
IMPLEMENT_OLECREATE_EX([!output CONTROL_CLASS], "[!output CONTROL_TYPE_ID]",
	[!output CONTROL_CLSID_IMPLEMENT_OLECREATE_FORMAT])
[!else]
IMPLEMENT_OLECREATE_NOREGNAME([!output CONTROL_CLASS],
	[!output CONTROL_CLSID_IMPLEMENT_OLECREATE_FORMAT])
[!endif]

// �^�C�v ���C�u���� ID ����уo�[�W����

IMPLEMENT_OLETYPELIB([!output CONTROL_CLASS], _tlid, _wVerMajor, _wVerMinor)

// �C���^�[�t�F�C�X ID

const IID IID_D[!output SAFE_PROJECT_IDENTIFIER_NAME] = [!output PRIMARY_IID_STATIC_CONST_GUID_FORMAT];
const IID IID_D[!output SAFE_PROJECT_IDENTIFIER_NAME]Events = [!output EVENT_IID_STATIC_CONST_GUID_FORMAT];

// �R���g���[���̎�ނ̏��

static const DWORD _dw[!output SAFE_PROJECT_IDENTIFIER_NAME]OleMisc =
[!if SIMPLE_FRAME]
	OLEMISC_SIMPLEFRAME |
[!endif]
[!if INVISIBLE_AT_RUNTIME]
	OLEMISC_INVISIBLEATRUNTIME |
[!endif]
[!if ACTIVATE_WHEN_VISIBLE]
	OLEMISC_ACTIVATEWHENVISIBLE |
[!if MOUSE_NOTIFICATIONS]
	OLEMISC_IGNOREACTIVATEWHENVISIBLE |
[!endif]
[!endif]
	OLEMISC_SETCLIENTSITEFIRST |
	OLEMISC_INSIDEOUT |
	OLEMISC_CANTLINKINSIDE |
	OLEMISC_RECOMPOSEONRESIZE;

IMPLEMENT_OLECTLTYPE([!output CONTROL_CLASS], IDS_[!output UPPER_CASE_SAFE_PROJECT_IDENTIFIER_NAME], _dw[!output SAFE_PROJECT_IDENTIFIER_NAME]OleMisc)

// [!output CONTROL_CLASS]::[!output CONTROL_CLASS]Factory::UpdateRegistry -
// [!output CONTROL_CLASS] �̃V�X�e�� ���W�X�g�� �G���g����ǉ��܂��͍폜���܂��B

BOOL [!output CONTROL_CLASS]::[!output CONTROL_CLASS]Factory::UpdateRegistry(BOOL bRegister)
{
	// TODO: �R���g���[���� apartment ���f���̃X���b�h�����̋K���ɏ]���Ă��邱�Ƃ�
	// �m�F���Ă��������B�ڍׂɂ��Ă� MFC �̃e�N�j�J�� �m�[�g 64 ���Q�Ƃ��Ă��������B
	// �A�p�[�g�����g ���f���̃X���b�h�����̋K���ɏ]��Ȃ��R���g���[���̏ꍇ�́A6 �Ԗ�
	// �̃p�����[�^�[���ȉ��̂悤�ɕύX���Ă��������B
[!if INSERTABLE]
	// afxRegInsertable | afxRegApartmentThreading �� afxRegInsertable �֕ύX���Ă��������B
[!else]
	// afxRegApartmentThreading �� 0 �ɐݒ肵�܂��B
[!endif]

	if (bRegister)
		return AfxOleRegisterControlClass(
			AfxGetInstanceHandle(),
			m_clsid,
			m_lpszProgID,
			IDS_[!output UPPER_CASE_SAFE_PROJECT_IDENTIFIER_NAME],
			IDB_[!output UPPER_CASE_SAFE_PROJECT_IDENTIFIER_NAME],
[!if INSERTABLE]
			afxRegInsertable | afxRegApartmentThreading,
[!else]
			afxRegApartmentThreading,
[!endif]
			_dw[!output SAFE_PROJECT_IDENTIFIER_NAME]OleMisc,
			_tlid,
			_wVerMajor,
			_wVerMinor);
	else
		return AfxOleUnregisterClass(m_clsid, m_lpszProgID);
}

[!if RUNTIME_LICENSE]

// ���C�Z���X������

static const TCHAR _szLicFileName[] = _T("[!output PROJECT_NAME].lic");
static const WCHAR _szLicString[] = L"Copyright (c) [!output YEAR] [!output COMPANY_NAME]";

// [!output CONTROL_CLASS]::[!output CONTROL_CLASS]Factory::VerifyUserLicense -
// ���[�U�[ ���C�Z���X�̗L�����m�F

BOOL [!output CONTROL_CLASS]::[!output CONTROL_CLASS]Factory::VerifyUserLicense()
{
	return AfxVerifyLicFile(AfxGetInstanceHandle(), _szLicFileName,
		_szLicString);
}

// [!output CONTROL_CLASS]::[!output CONTROL_CLASS]Factory::GetLicenseKey -
// �����^�C�� ���C�Z���X �L�[��Ԃ��܂��B

BOOL [!output CONTROL_CLASS]::[!output CONTROL_CLASS]Factory::GetLicenseKey(DWORD dwReserved,
	BSTR *pbstrKey)
{
	if (pbstrKey == NULL)
		return FALSE;

	*pbstrKey = SysAllocString(_szLicString);
	return (*pbstrKey != NULL);
}

[!endif]

// [!output CONTROL_CLASS]::[!output CONTROL_CLASS] - �R���X�g���N�^�[

[!output CONTROL_CLASS]::[!output CONTROL_CLASS]()
{
	InitializeIIDs(&IID_D[!output SAFE_PROJECT_IDENTIFIER_NAME], &IID_D[!output SAFE_PROJECT_IDENTIFIER_NAME]Events);
[!if SIMPLE_FRAME]

	EnableSimpleFrame();
[!endif]
[!if ASYNC_PROPERTY_LOAD]

	m_lReadyState = READYSTATE_LOADING;
	// TODO: readystate ���ύX���ꂽ�ꍇ InternalSetReadyState ���Ăяo���Ă�������
[!endif]
	// TODO: ���̈ʒu�ɃR���g���[���̃C���X�^���X �f�[�^�̏�����������ǉ����Ă�������
}

// [!output CONTROL_CLASS]::~[!output CONTROL_CLASS] - �f�X�g���N�^�[

[!output CONTROL_CLASS]::~[!output CONTROL_CLASS]()
{
	// TODO: ���̈ʒu�ɃR���g���[���̃C���X�^���X �f�[�^�̌㏈���p�̃R�[�h��ǉ����Ă�������
}

// [!output CONTROL_CLASS]::OnDraw - �`��֐�

void [!output CONTROL_CLASS]::OnDraw(
			CDC* pdc, const CRect& rcBounds, const CRect& /* rcInvalid */)
{
	if (!pdc)
		return;

[!if SUBCLASS_WINDOW]
	DoSuperclassPaint(pdc, rcBounds);
[!else]
	// TODO: �ȉ��̃R�[�h��`��p�̃R�[�h�ɒu�������Ă�������
	pdc->FillRect(rcBounds, CBrush::FromHandle((HBRUSH)GetStockObject(WHITE_BRUSH)));
	pdc->Ellipse(rcBounds);
[!endif]
[!if OPTIMIZED_DRAW]

	if (!IsOptimizedDraw())
	{
		// �R���e�i�[�͍œK�����ꂽ�`����T�|�[�g���Ă��܂���B

		// TODO: *pdc �f�o�C�X �R���e�L�X�g���� GDI �I�u�W�F�N�g��I�������ꍇ��
		//		���̈ʒu�ňȑO�ɑI�����ꂽ�I�u�W�F�N�g�𕜌����Ă��������B
	}
[!endif]
}

// [!output CONTROL_CLASS]::DoPropExchange - �i�����̃T�|�[�g

void [!output CONTROL_CLASS]::DoPropExchange(CPropExchange* pPX)
{
	ExchangeVersion(pPX, MAKELONG(_wVerMinor, _wVerMajor));
	COleControl::DoPropExchange(pPX);

	// TODO: �i�����������e�J�X�^�� �v���p�e�B�p�� PX_ �֐����Ăяo���܂��B
}

[!if WINDOWLESS || UNCLIPPED_DEVICE_CONTEXT || FLICKER_FREE || MOUSE_NOTIFICATIONS || OPTIMIZED_DRAW]

// [!output CONTROL_CLASS]::GetControlFlags -
// MFC �� ActiveX �R���g���[���̎����̃J�X�^�}�C�Y�p�t���O�ł��B
//
DWORD [!output CONTROL_CLASS]::GetControlFlags()
{
	DWORD dwFlags = COleControl::GetControlFlags();

[!if UNCLIPPED_DEVICE_CONTEXT]
	// �R���g���[���̏o�͂̓N���b�v����܂���B
	// �R���g���[���̓N���C�A���g�̈�̎l�p�`�̊O����
	// �y�C���g���܂���B
	dwFlags &= ~clipPaintDC;
[!endif]
[!if WINDOWLESS]

	// �R���g���[���̓E�B���h�E���쐬�����ɃA�N�e�B�x�[�g�\�ł��B
	// TODO: �R���g���[���̃��b�Z�[�W �n���h���[���쐬����ꍇ�Am_hWnd
	//		m_hWnd �����o�[�ϐ��̒l�� NULL �ȊO�ł��邱�Ƃ��ŏ��Ɋm�F
	//		���Ă���g�p���Ă��������B
	dwFlags |= windowlessActivate;
[!endif]
[!if FLICKER_FREE]

	// �R���g���[���̓A�N�e�B�u�A��A�N�e�B�u��ԊԂ̈ڍs���ɂ�
	// �ĕ`�悳��܂���B
	dwFlags |= noFlickerActivate;
[!endif]
[!if MOUSE_NOTIFICATIONS]

	// �R���g���[���͔�A�N�e�B�u�Ƀ}�E�X�̒ʒm���󂯎�邱�Ƃ��\�ł��B
	// TODO: WM_SETCURSOR ����� WM_MOUSEMOVE �p�̃n���h���[���쐬����ꍇ�A
	//		m_hWnd �����o�[�ϐ��̒l�� NULL �ȊO�ł��邱�Ƃ��ŏ���
	//		�m�F���Ă���g�p���Ă��������B
	dwFlags |= pointerInactive;
[!endif]
[!if OPTIMIZED_DRAW]

	// �R���g���[���� OnDraw ���\�b�h���f�o�C�X �R���e�L�X�g���ŃI���W�i����
	// GDI �I�u�W�F�N�g�𕜌������ɍœK�����邱�Ƃ��\�ł��B
	dwFlags |= canOptimizeDraw;
[!endif]
	return dwFlags;
}

[!endif]

// [!output CONTROL_CLASS]::OnResetState - �R���g���[��������̏�ԂɃ��Z�b�g���܂��B

void [!output CONTROL_CLASS]::OnResetState()
{
	COleControl::OnResetState();  // DoPropExchange ���Ăяo���Ċ���l�Ƀ��Z�b�g

	// TODO: ���̈ʒu�ɃR���g���[���̏�Ԃ����Z�b�g���鏈����ǉ����Ă�������
}

[!if ABOUT_BOX]

// [!output CONTROL_CLASS]::AboutBox - "�o�[�W�������" �{�b�N�X�����[�U�[�ɕ\�����܂��B

void [!output CONTROL_CLASS]::AboutBox()
{
	CDialogEx dlgAbout(IDD_ABOUTBOX_[!output UPPER_CASE_SAFE_PROJECT_IDENTIFIER_NAME]);
	dlgAbout.DoModal();
}

[!endif]
[!if SUBCLASS_WINDOW]

// [!output CONTROL_CLASS]::PreCreateWindow - CreateWindowEx �̃p�����[�^�[��ύX���܂��B

BOOL [!output CONTROL_CLASS]::PreCreateWindow(CREATESTRUCT& cs)
{
[!if SUBCLASS_WINDOW]
	cs.lpszClass = _T("[!output WINDOW_CLASS]");
[!else]
	// TODO: �T�u�N���X�����ꂽ�E�B���h�E �N���X�����L�q���Ă��������B
	cs.lpszClass = _T("");
[!endif]
	return COleControl::PreCreateWindow(cs);
}

// [!output CONTROL_CLASS]::IsSubclassedControl - ����̓T�u�N���X �R���g���[���ł��B

BOOL [!output CONTROL_CLASS]::IsSubclassedControl()
{
	return TRUE;
}

// [!output CONTROL_CLASS]::OnOcmCommand - �R�}���h ���b�Z�[�W���������܂��B

LRESULT [!output CONTROL_CLASS]::OnOcmCommand(WPARAM wParam, LPARAM lParam)
{
	WORD wNotifyCode = HIWORD(wParam);

	// TODO: ���̈ʒu�ɃX�C�b�` �X�e�[�g�����g�� wNotifyCode ����������R�[�h��ǉ����Ă�������

	return 0;
}

[!endif]

// [!output CONTROL_CLASS] ���b�Z�[�W �n���h���[
