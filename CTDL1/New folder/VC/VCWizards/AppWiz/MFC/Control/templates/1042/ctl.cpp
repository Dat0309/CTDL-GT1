// [!output CONTROL_IMPL] : [!output CONTROL_CLASS] ActiveX ��Ʈ�� Ŭ������ �����Դϴ�.

#include "stdafx.h"
#include "[!output PROJECT_NAME].h"
#include "[!output CONTROL_HEADER]"
#include "[!output PROPERTY_PAGE_HEADER]"
#include "afxdialogex.h"

#ifdef _DEBUG
#define new DEBUG_NEW
#endif

IMPLEMENT_DYNCREATE([!output CONTROL_CLASS], COleControl)

// �޽��� ���Դϴ�.

BEGIN_MESSAGE_MAP([!output CONTROL_CLASS], COleControl)
[!if SUBCLASS_WINDOW]
	ON_MESSAGE(OCM_COMMAND, &[!output CONTROL_CLASS]::OnOcmCommand)
[!endif]
[!if INSERTABLE]
	ON_OLEVERB(AFX_IDS_VERB_EDIT, OnEdit)
[!endif]
	ON_OLEVERB(AFX_IDS_VERB_PROPERTIES, OnProperties)
END_MESSAGE_MAP()

// ����ġ ���Դϴ�.

BEGIN_DISPATCH_MAP([!output CONTROL_CLASS], COleControl)
[!if ASYNC_PROPERTY_LOAD]
	DISP_STOCKPROP_READYSTATE()
[!endif]
[!if ABOUT_BOX]
	DISP_FUNCTION_ID([!output CONTROL_CLASS], "AboutBox", DISPID_ABOUTBOX, AboutBox, VT_EMPTY, VTS_NONE)
[!endif]
END_DISPATCH_MAP()

// �̺�Ʈ ���Դϴ�.

BEGIN_EVENT_MAP([!output CONTROL_CLASS], COleControl)
[!if ASYNC_PROPERTY_LOAD]
	EVENT_STOCK_READYSTATECHANGE()
[!endif]
END_EVENT_MAP()

// �Ӽ� �������Դϴ�.

// TODO: �ʿ信 ���� �Ӽ� �������� �߰��մϴ�.  ī��Ʈ�� �̿� ���� �����ؾ� �մϴ�.
BEGIN_PROPPAGEIDS([!output CONTROL_CLASS], 1)
	PROPPAGEID([!output PROPERTY_PAGE_CLASS]::guid)
END_PROPPAGEIDS([!output CONTROL_CLASS])

// Ŭ���� ���͸��� GUID�� �ʱ�ȭ�մϴ�.

[!if CONTROL_TYPE_ID_SET]
IMPLEMENT_OLECREATE_EX([!output CONTROL_CLASS], "[!output CONTROL_TYPE_ID]",
	[!output CONTROL_CLSID_IMPLEMENT_OLECREATE_FORMAT])
[!else]
IMPLEMENT_OLECREATE_NOREGNAME([!output CONTROL_CLASS],
	[!output CONTROL_CLSID_IMPLEMENT_OLECREATE_FORMAT])
[!endif]

// ���� ���̺귯�� ID�� �����Դϴ�.

IMPLEMENT_OLETYPELIB([!output CONTROL_CLASS], _tlid, _wVerMajor, _wVerMinor)

// �������̽� ID�Դϴ�.

const IID IID_D[!output SAFE_PROJECT_IDENTIFIER_NAME] = [!output PRIMARY_IID_STATIC_CONST_GUID_FORMAT];
const IID IID_D[!output SAFE_PROJECT_IDENTIFIER_NAME]Events = [!output EVENT_IID_STATIC_CONST_GUID_FORMAT];

// ��Ʈ�� ���� �����Դϴ�.

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
// [!output CONTROL_CLASS]���� �ý��� ������Ʈ�� �׸��� �߰��ϰų� �����մϴ�.

BOOL [!output CONTROL_CLASS]::[!output CONTROL_CLASS]Factory::UpdateRegistry(BOOL bRegister)
{
	// TODO: ��Ʈ���� ����Ʈ �� ������ ��Ģ�� �ؼ��ϴ���
	// Ȯ���մϴ�. �ڼ��� ������ MFC Technical Note 64��
	// �����Ͻʽÿ�. ��Ʈ���� ����Ʈ �� ��Ģ��
	// ���� �ʴ� ��� �������� ���� ��° �Ű� ������ �����մϴ�.
[!if INSERTABLE]
	// afxRegInsertable | afxRegApartmentThreading���� afxRegInsertable�� �����մϴ�.
[!else]
	// afxRegApartmentThreading�� 0���� �����մϴ�.
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

// ���̼��� ���ڿ��Դϴ�.

static const TCHAR _szLicFileName[] = _T("[!output PROJECT_NAME].lic");
static const WCHAR _szLicString[] = L"Copyright (c) [!output YEAR] [!output COMPANY_NAME]";

// [!output CONTROL_CLASS]::[!output CONTROL_CLASS]Factory::VerifyUserLicense -
// �����  ���̼����� �ִ��� �˻��մϴ�.

BOOL [!output CONTROL_CLASS]::[!output CONTROL_CLASS]Factory::VerifyUserLicense()
{
	return AfxVerifyLicFile(AfxGetInstanceHandle(), _szLicFileName,
		_szLicString);
}

// [!output CONTROL_CLASS]::[!output CONTROL_CLASS]Factory::GetLicenseKey -
// ��Ÿ��  ���̼��� Ű�� ��ȯ�մϴ�.

BOOL [!output CONTROL_CLASS]::[!output CONTROL_CLASS]Factory::GetLicenseKey(DWORD dwReserved,
	BSTR *pbstrKey)
{
	if (pbstrKey == NULL)
		return FALSE;

	*pbstrKey = SysAllocString(_szLicString);
	return (*pbstrKey != NULL);
}

[!endif]

// [!output CONTROL_CLASS]::[!output CONTROL_CLASS] - �������Դϴ�.

[!output CONTROL_CLASS]::[!output CONTROL_CLASS]()
{
	InitializeIIDs(&IID_D[!output SAFE_PROJECT_IDENTIFIER_NAME], &IID_D[!output SAFE_PROJECT_IDENTIFIER_NAME]Events);
[!if SIMPLE_FRAME]

	EnableSimpleFrame();
[!endif]
[!if ASYNC_PROPERTY_LOAD]

	m_lReadyState = READYSTATE_LOADING;
	// TODO: readystate�� ����Ǹ� InternalSetReadyState�� ȣ���մϴ�.
[!endif]
	// TODO: ���⿡�� ��Ʈ���� �ν��Ͻ� �����͸� �ʱ�ȭ�մϴ�.
}

// [!output CONTROL_CLASS]::~[!output CONTROL_CLASS] - �Ҹ����Դϴ�.

[!output CONTROL_CLASS]::~[!output CONTROL_CLASS]()
{
	// TODO: ���⿡�� ��Ʈ���� �ν��Ͻ� �����͸� �����մϴ�.
}

// [!output CONTROL_CLASS]::OnDraw - �׸��� �Լ��Դϴ�.

void [!output CONTROL_CLASS]::OnDraw(
			CDC* pdc, const CRect& rcBounds, const CRect& /* rcInvalid */)
{
	if (!pdc)
		return;

[!if SUBCLASS_WINDOW]
	DoSuperclassPaint(pdc, rcBounds);
[!else]
	// TODO: ���� �ڵ带 ����ڰ� ���� �ۼ��� �׸��� �ڵ�� �ٲٽʽÿ�.
	pdc->FillRect(rcBounds, CBrush::FromHandle((HBRUSH)GetStockObject(WHITE_BRUSH)));
	pdc->Ellipse(rcBounds);
[!endif]
[!if OPTIMIZED_DRAW]

	if (!IsOptimizedDraw())
	{
		// �����̳ʿ��� ����ȭ�� �׸��⸦ �������� �ʽ��ϴ�.

		// TODO: GDI ��ü�� ��ġ ���ؽ�Ʈ *pdc�� ������ ���� ���
		//		�̸� ������ ��ü�� ���⿡�� �����մϴ�.
	}
[!endif]
}

// [!output CONTROL_CLASS]::DoPropExchange - ���Ӽ� �����Դϴ�.

void [!output CONTROL_CLASS]::DoPropExchange(CPropExchange* pPX)
{
	ExchangeVersion(pPX, MAKELONG(_wVerMinor, _wVerMajor));
	COleControl::DoPropExchange(pPX);

	// TODO: �������� ����� ���� �Ӽ� ��ο� ���� PX_ functions�� ȣ���մϴ�.
}

[!if WINDOWLESS || UNCLIPPED_DEVICE_CONTEXT || FLICKER_FREE || MOUSE_NOTIFICATIONS || OPTIMIZED_DRAW]

// [!output CONTROL_CLASS]::GetControlFlags -
// MFC�� ActiveX ��Ʈ�� ������ ����� �����ϴ� �÷����Դϴ�.
//
DWORD [!output CONTROL_CLASS]::GetControlFlags()
{
	DWORD dwFlags = COleControl::GetControlFlags();

[!if UNCLIPPED_DEVICE_CONTEXT]
	// ��Ʈ���� ����� Ŭ���ε��� �ʽ��ϴ�.
	// ��Ʈ���� Ŭ���̾�Ʈ �簢����
	// �ٱ��ʿ��� ĥ���� �ʽ��ϴ�.
	dwFlags &= ~clipPaintDC;
[!endif]
[!if WINDOWLESS]

	// ��Ʈ���� â�� ������ �ʰ� Ȱ��ȭ�� �� �ֽ��ϴ�.
	// TODO: �ش� ��Ʈ���� �޽��� ó���⸦ �ۼ��� ����
	//		��� ���� m_hWnd�� ���� NULL�� �ƴ���
	//		���� Ȯ���� �Ŀ� ����մϴ�.
	dwFlags |= windowlessActivate;
[!endif]
[!if FLICKER_FREE]

	// Ȱ�� �� ��Ȱ�� ���� ���̿��� ��ȯ�� ����
	// ��Ʈ���� �ٽ� �׸� �� �����ϴ�.
	dwFlags |= noFlickerActivate;
[!endif]
[!if MOUSE_NOTIFICATIONS]

	// ��Ʈ���� ��Ȱ�� ������ �� ���콺 �˸��� ���� �� �ֽ��ϴ�.
	// TODO: WM_SETCURSOR �� WM_MOUSEMOVE�� ó���⸦ �ۼ��� ����
	//		��� ���� m_hWnd�� ���� NULL�� �ƴ���
	//		���� Ȯ���� �Ŀ� ����մϴ�.
	dwFlags |= pointerInactive;
[!endif]
[!if OPTIMIZED_DRAW]

	// ��Ʈ���� ��ġ ���ؽ�Ʈ�� �ִ� ���� GDI ��ü�� �������� �ʴ� ����� ����
	// OnDraw �޼��带 ����ȭ�� �� �ֽ��ϴ�.
	dwFlags |= canOptimizeDraw;
[!endif]
	return dwFlags;
}

[!endif]

// [!output CONTROL_CLASS]::OnResetState - ��Ʈ���� �⺻ ���·� �ٽ� �����մϴ�.

void [!output CONTROL_CLASS]::OnResetState()
{
	COleControl::OnResetState();  // DoPropExchange�� ��� �ִ� �⺻���� �ٽ� �����մϴ�.

	// TODO: ���⿡�� �ٸ� ��� ��Ʈ���� ���¸� �ٽ� �����մϴ�.
}

[!if ABOUT_BOX]

// [!output CONTROL_CLASS]::AboutBox - "����" ��ȭ ���ڸ� ����ڿ��� ���� �ݴϴ�.

void [!output CONTROL_CLASS]::AboutBox()
{
	CDialogEx dlgAbout(IDD_ABOUTBOX_[!output UPPER_CASE_SAFE_PROJECT_IDENTIFIER_NAME]);
	dlgAbout.DoModal();
}

[!endif]
[!if SUBCLASS_WINDOW]

// [!output CONTROL_CLASS]::PreCreateWindow - CreateWindowEx�� �Ű� ������ �����մϴ�.

BOOL [!output CONTROL_CLASS]::PreCreateWindow(CREATESTRUCT& cs)
{
[!if SUBCLASS_WINDOW]
	cs.lpszClass = _T("[!output WINDOW_CLASS]");
[!else]
	// TODO: ����Ŭ������ â Ŭ������ �̸��� �Է��մϴ�.
	cs.lpszClass = _T("");
[!endif]
	return COleControl::PreCreateWindow(cs);
}

// [!output CONTROL_CLASS]::IsSubclassedControl - ����Ŭ���̵� ��Ʈ���Դϴ�.

BOOL [!output CONTROL_CLASS]::IsSubclassedControl()
{
	return TRUE;
}

// [!output CONTROL_CLASS]::OnOcmCommand - �ڵ� ��� �޽����Դϴ�.

LRESULT [!output CONTROL_CLASS]::OnOcmCommand(WPARAM wParam, LPARAM lParam)
{
	WORD wNotifyCode = HIWORD(wParam);

	// TODO: ���⿡�� wNotifyCode�� ��ȯ�մϴ�.

	return 0;
}

[!endif]

// [!output CONTROL_CLASS] �޽��� ó�����Դϴ�.
