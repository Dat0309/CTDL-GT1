// [!output CONTROL_IMPL] : [!output CONTROL_CLASS] ActiveX 컨트롤 클래스의 구현입니다.

#include "stdafx.h"
#include "[!output PROJECT_NAME].h"
#include "[!output CONTROL_HEADER]"
#include "[!output PROPERTY_PAGE_HEADER]"
#include "afxdialogex.h"

#ifdef _DEBUG
#define new DEBUG_NEW
#endif

IMPLEMENT_DYNCREATE([!output CONTROL_CLASS], COleControl)

// 메시지 맵입니다.

BEGIN_MESSAGE_MAP([!output CONTROL_CLASS], COleControl)
[!if SUBCLASS_WINDOW]
	ON_MESSAGE(OCM_COMMAND, &[!output CONTROL_CLASS]::OnOcmCommand)
[!endif]
[!if INSERTABLE]
	ON_OLEVERB(AFX_IDS_VERB_EDIT, OnEdit)
[!endif]
	ON_OLEVERB(AFX_IDS_VERB_PROPERTIES, OnProperties)
END_MESSAGE_MAP()

// 디스패치 맵입니다.

BEGIN_DISPATCH_MAP([!output CONTROL_CLASS], COleControl)
[!if ASYNC_PROPERTY_LOAD]
	DISP_STOCKPROP_READYSTATE()
[!endif]
[!if ABOUT_BOX]
	DISP_FUNCTION_ID([!output CONTROL_CLASS], "AboutBox", DISPID_ABOUTBOX, AboutBox, VT_EMPTY, VTS_NONE)
[!endif]
END_DISPATCH_MAP()

// 이벤트 맵입니다.

BEGIN_EVENT_MAP([!output CONTROL_CLASS], COleControl)
[!if ASYNC_PROPERTY_LOAD]
	EVENT_STOCK_READYSTATECHANGE()
[!endif]
END_EVENT_MAP()

// 속성 페이지입니다.

// TODO: 필요에 따라 속성 페이지를 추가합니다.  카운트도 이에 따라 증가해야 합니다.
BEGIN_PROPPAGEIDS([!output CONTROL_CLASS], 1)
	PROPPAGEID([!output PROPERTY_PAGE_CLASS]::guid)
END_PROPPAGEIDS([!output CONTROL_CLASS])

// 클래스 팩터리와 GUID를 초기화합니다.

[!if CONTROL_TYPE_ID_SET]
IMPLEMENT_OLECREATE_EX([!output CONTROL_CLASS], "[!output CONTROL_TYPE_ID]",
	[!output CONTROL_CLSID_IMPLEMENT_OLECREATE_FORMAT])
[!else]
IMPLEMENT_OLECREATE_NOREGNAME([!output CONTROL_CLASS],
	[!output CONTROL_CLSID_IMPLEMENT_OLECREATE_FORMAT])
[!endif]

// 형식 라이브러리 ID와 버전입니다.

IMPLEMENT_OLETYPELIB([!output CONTROL_CLASS], _tlid, _wVerMajor, _wVerMinor)

// 인터페이스 ID입니다.

const IID IID_D[!output SAFE_PROJECT_IDENTIFIER_NAME] = [!output PRIMARY_IID_STATIC_CONST_GUID_FORMAT];
const IID IID_D[!output SAFE_PROJECT_IDENTIFIER_NAME]Events = [!output EVENT_IID_STATIC_CONST_GUID_FORMAT];

// 컨트롤 형식 정보입니다.

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
// [!output CONTROL_CLASS]에서 시스템 레지스트리 항목을 추가하거나 제거합니다.

BOOL [!output CONTROL_CLASS]::[!output CONTROL_CLASS]Factory::UpdateRegistry(BOOL bRegister)
{
	// TODO: 컨트롤이 아파트 모델 스레딩 규칙을 준수하는지
	// 확인합니다. 자세한 내용은 MFC Technical Note 64를
	// 참조하십시오. 컨트롤이 아파트 모델 규칙에
	// 맞지 않는 경우 다음에서 여섯 번째 매개 변수를 변경합니다.
[!if INSERTABLE]
	// afxRegInsertable | afxRegApartmentThreading에서 afxRegInsertable로 변경합니다.
[!else]
	// afxRegApartmentThreading을 0으로 설정합니다.
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

// 라이선스 문자열입니다.

static const TCHAR _szLicFileName[] = _T("[!output PROJECT_NAME].lic");
static const WCHAR _szLicString[] = L"Copyright (c) [!output YEAR] [!output COMPANY_NAME]";

// [!output CONTROL_CLASS]::[!output CONTROL_CLASS]Factory::VerifyUserLicense -
// 사용자  라이선스가 있는지 검사합니다.

BOOL [!output CONTROL_CLASS]::[!output CONTROL_CLASS]Factory::VerifyUserLicense()
{
	return AfxVerifyLicFile(AfxGetInstanceHandle(), _szLicFileName,
		_szLicString);
}

// [!output CONTROL_CLASS]::[!output CONTROL_CLASS]Factory::GetLicenseKey -
// 런타임  라이선스 키를 반환합니다.

BOOL [!output CONTROL_CLASS]::[!output CONTROL_CLASS]Factory::GetLicenseKey(DWORD dwReserved,
	BSTR *pbstrKey)
{
	if (pbstrKey == NULL)
		return FALSE;

	*pbstrKey = SysAllocString(_szLicString);
	return (*pbstrKey != NULL);
}

[!endif]

// [!output CONTROL_CLASS]::[!output CONTROL_CLASS] - 생성자입니다.

[!output CONTROL_CLASS]::[!output CONTROL_CLASS]()
{
	InitializeIIDs(&IID_D[!output SAFE_PROJECT_IDENTIFIER_NAME], &IID_D[!output SAFE_PROJECT_IDENTIFIER_NAME]Events);
[!if SIMPLE_FRAME]

	EnableSimpleFrame();
[!endif]
[!if ASYNC_PROPERTY_LOAD]

	m_lReadyState = READYSTATE_LOADING;
	// TODO: readystate가 변경되면 InternalSetReadyState를 호출합니다.
[!endif]
	// TODO: 여기에서 컨트롤의 인스턴스 데이터를 초기화합니다.
}

// [!output CONTROL_CLASS]::~[!output CONTROL_CLASS] - 소멸자입니다.

[!output CONTROL_CLASS]::~[!output CONTROL_CLASS]()
{
	// TODO: 여기에서 컨트롤의 인스턴스 데이터를 정리합니다.
}

// [!output CONTROL_CLASS]::OnDraw - 그리기 함수입니다.

void [!output CONTROL_CLASS]::OnDraw(
			CDC* pdc, const CRect& rcBounds, const CRect& /* rcInvalid */)
{
	if (!pdc)
		return;

[!if SUBCLASS_WINDOW]
	DoSuperclassPaint(pdc, rcBounds);
[!else]
	// TODO: 다음 코드를 사용자가 직접 작성한 그리기 코드로 바꾸십시오.
	pdc->FillRect(rcBounds, CBrush::FromHandle((HBRUSH)GetStockObject(WHITE_BRUSH)));
	pdc->Ellipse(rcBounds);
[!endif]
[!if OPTIMIZED_DRAW]

	if (!IsOptimizedDraw())
	{
		// 컨테이너에서 최적화된 그리기를 지원하지 않습니다.

		// TODO: GDI 개체를 장치 컨텍스트 *pdc에 선택해 넣은 경우
		//		미리 선택한 개체를 여기에서 복구합니다.
	}
[!endif]
}

// [!output CONTROL_CLASS]::DoPropExchange - 지속성 지원입니다.

void [!output CONTROL_CLASS]::DoPropExchange(CPropExchange* pPX)
{
	ExchangeVersion(pPX, MAKELONG(_wVerMinor, _wVerMajor));
	COleControl::DoPropExchange(pPX);

	// TODO: 지속적인 사용자 지정 속성 모두에 대해 PX_ functions를 호출합니다.
}

[!if WINDOWLESS || UNCLIPPED_DEVICE_CONTEXT || FLICKER_FREE || MOUSE_NOTIFICATIONS || OPTIMIZED_DRAW]

// [!output CONTROL_CLASS]::GetControlFlags -
// MFC의 ActiveX 컨트롤 구현을 사용자 지정하는 플래그입니다.
//
DWORD [!output CONTROL_CLASS]::GetControlFlags()
{
	DWORD dwFlags = COleControl::GetControlFlags();

[!if UNCLIPPED_DEVICE_CONTEXT]
	// 컨트롤의 출력이 클리핑되지 않습니다.
	// 컨트롤은 클라이언트 사각형의
	// 바깥쪽에는 칠하지 않습니다.
	dwFlags &= ~clipPaintDC;
[!endif]
[!if WINDOWLESS]

	// 컨트롤은 창을 만들지 않고도 활성화할 수 있습니다.
	// TODO: 해당 컨트롤의 메시지 처리기를 작성할 때는
	//		멤버 변수 m_hWnd의 값이 NULL이 아님을
	//		먼저 확인한 후에 사용합니다.
	dwFlags |= windowlessActivate;
[!endif]
[!if FLICKER_FREE]

	// 활성 및 비활성 상태 사이에서 전환할 때는
	// 컨트롤을 다시 그릴 수 없습니다.
	dwFlags |= noFlickerActivate;
[!endif]
[!if MOUSE_NOTIFICATIONS]

	// 컨트롤은 비활성 상태일 때 마우스 알림을 받을 수 있습니다.
	// TODO: WM_SETCURSOR 및 WM_MOUSEMOVE의 처리기를 작성할 때는
	//		멤버 변수 m_hWnd의 값이 NULL이 아님을
	//		먼저 확인한 후에 사용합니다.
	dwFlags |= pointerInactive;
[!endif]
[!if OPTIMIZED_DRAW]

	// 컨트롤은 장치 컨텍스트에 있는 원본 GDI 개체를 복구하지 않는 방법을 통해
	// OnDraw 메서드를 최적화할 수 있습니다.
	dwFlags |= canOptimizeDraw;
[!endif]
	return dwFlags;
}

[!endif]

// [!output CONTROL_CLASS]::OnResetState - 컨트롤을 기본 상태로 다시 설정합니다.

void [!output CONTROL_CLASS]::OnResetState()
{
	COleControl::OnResetState();  // DoPropExchange에 들어 있는 기본값을 다시 설정합니다.

	// TODO: 여기에서 다른 모든 컨트롤의 상태를 다시 설정합니다.
}

[!if ABOUT_BOX]

// [!output CONTROL_CLASS]::AboutBox - "정보" 대화 상자를 사용자에게 보여 줍니다.

void [!output CONTROL_CLASS]::AboutBox()
{
	CDialogEx dlgAbout(IDD_ABOUTBOX_[!output UPPER_CASE_SAFE_PROJECT_IDENTIFIER_NAME]);
	dlgAbout.DoModal();
}

[!endif]
[!if SUBCLASS_WINDOW]

// [!output CONTROL_CLASS]::PreCreateWindow - CreateWindowEx의 매개 변수를 수정합니다.

BOOL [!output CONTROL_CLASS]::PreCreateWindow(CREATESTRUCT& cs)
{
[!if SUBCLASS_WINDOW]
	cs.lpszClass = _T("[!output WINDOW_CLASS]");
[!else]
	// TODO: 서브클래싱할 창 클래스의 이름을 입력합니다.
	cs.lpszClass = _T("");
[!endif]
	return COleControl::PreCreateWindow(cs);
}

// [!output CONTROL_CLASS]::IsSubclassedControl - 서브클래싱된 컨트롤입니다.

BOOL [!output CONTROL_CLASS]::IsSubclassedControl()
{
	return TRUE;
}

// [!output CONTROL_CLASS]::OnOcmCommand - 핸들 명령 메시지입니다.

LRESULT [!output CONTROL_CLASS]::OnOcmCommand(WPARAM wParam, LPARAM lParam)
{
	WORD wNotifyCode = HIWORD(wParam);

	// TODO: 여기에서 wNotifyCode로 전환합니다.

	return 0;
}

[!endif]

// [!output CONTROL_CLASS] 메시지 처리기입니다.
