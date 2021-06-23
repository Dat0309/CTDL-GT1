// [!output CONTROL_IMPL] :  [!output CONTROL_CLASS] ActiveX コントロール クラスの実装

#include "stdafx.h"
#include "[!output PROJECT_NAME].h"
#include "[!output CONTROL_HEADER]"
#include "[!output PROPERTY_PAGE_HEADER]"
#include "afxdialogex.h"

#ifdef _DEBUG
#define new DEBUG_NEW
#endif

IMPLEMENT_DYNCREATE([!output CONTROL_CLASS], COleControl)

// メッセージ マップ

BEGIN_MESSAGE_MAP([!output CONTROL_CLASS], COleControl)
[!if SUBCLASS_WINDOW]
	ON_MESSAGE(OCM_COMMAND, &[!output CONTROL_CLASS]::OnOcmCommand)
[!endif]
[!if INSERTABLE]
	ON_OLEVERB(AFX_IDS_VERB_EDIT, OnEdit)
[!endif]
	ON_OLEVERB(AFX_IDS_VERB_PROPERTIES, OnProperties)
END_MESSAGE_MAP()

// ディスパッチ マップ

BEGIN_DISPATCH_MAP([!output CONTROL_CLASS], COleControl)
[!if ASYNC_PROPERTY_LOAD]
	DISP_STOCKPROP_READYSTATE()
[!endif]
[!if ABOUT_BOX]
	DISP_FUNCTION_ID([!output CONTROL_CLASS], "AboutBox", DISPID_ABOUTBOX, AboutBox, VT_EMPTY, VTS_NONE)
[!endif]
END_DISPATCH_MAP()

// イベント マップ

BEGIN_EVENT_MAP([!output CONTROL_CLASS], COleControl)
[!if ASYNC_PROPERTY_LOAD]
	EVENT_STOCK_READYSTATECHANGE()
[!endif]
END_EVENT_MAP()

// プロパティ ページ

// TODO: プロパティ ページを追加して、BEGIN 行の最後にあるカウントを増やしてください。
BEGIN_PROPPAGEIDS([!output CONTROL_CLASS], 1)
	PROPPAGEID([!output PROPERTY_PAGE_CLASS]::guid)
END_PROPPAGEIDS([!output CONTROL_CLASS])

// クラス ファクトリおよび GUID を初期化します。

[!if CONTROL_TYPE_ID_SET]
IMPLEMENT_OLECREATE_EX([!output CONTROL_CLASS], "[!output CONTROL_TYPE_ID]",
	[!output CONTROL_CLSID_IMPLEMENT_OLECREATE_FORMAT])
[!else]
IMPLEMENT_OLECREATE_NOREGNAME([!output CONTROL_CLASS],
	[!output CONTROL_CLSID_IMPLEMENT_OLECREATE_FORMAT])
[!endif]

// タイプ ライブラリ ID およびバージョン

IMPLEMENT_OLETYPELIB([!output CONTROL_CLASS], _tlid, _wVerMajor, _wVerMinor)

// インターフェイス ID

const IID IID_D[!output SAFE_PROJECT_IDENTIFIER_NAME] = [!output PRIMARY_IID_STATIC_CONST_GUID_FORMAT];
const IID IID_D[!output SAFE_PROJECT_IDENTIFIER_NAME]Events = [!output EVENT_IID_STATIC_CONST_GUID_FORMAT];

// コントロールの種類の情報

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
// [!output CONTROL_CLASS] のシステム レジストリ エントリを追加または削除します。

BOOL [!output CONTROL_CLASS]::[!output CONTROL_CLASS]Factory::UpdateRegistry(BOOL bRegister)
{
	// TODO: コントロールが apartment モデルのスレッド処理の規則に従っていることを
	// 確認してください。詳細については MFC のテクニカル ノート 64 を参照してください。
	// アパートメント モデルのスレッド処理の規則に従わないコントロールの場合は、6 番目
	// のパラメーターを以下のように変更してください。
[!if INSERTABLE]
	// afxRegInsertable | afxRegApartmentThreading を afxRegInsertable へ変更してください。
[!else]
	// afxRegApartmentThreading を 0 に設定します。
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

// ライセンス文字列

static const TCHAR _szLicFileName[] = _T("[!output PROJECT_NAME].lic");
static const WCHAR _szLicString[] = L"Copyright (c) [!output YEAR] [!output COMPANY_NAME]";

// [!output CONTROL_CLASS]::[!output CONTROL_CLASS]Factory::VerifyUserLicense -
// ユーザー ライセンスの有無を確認

BOOL [!output CONTROL_CLASS]::[!output CONTROL_CLASS]Factory::VerifyUserLicense()
{
	return AfxVerifyLicFile(AfxGetInstanceHandle(), _szLicFileName,
		_szLicString);
}

// [!output CONTROL_CLASS]::[!output CONTROL_CLASS]Factory::GetLicenseKey -
// ランタイム ライセンス キーを返します。

BOOL [!output CONTROL_CLASS]::[!output CONTROL_CLASS]Factory::GetLicenseKey(DWORD dwReserved,
	BSTR *pbstrKey)
{
	if (pbstrKey == NULL)
		return FALSE;

	*pbstrKey = SysAllocString(_szLicString);
	return (*pbstrKey != NULL);
}

[!endif]

// [!output CONTROL_CLASS]::[!output CONTROL_CLASS] - コンストラクター

[!output CONTROL_CLASS]::[!output CONTROL_CLASS]()
{
	InitializeIIDs(&IID_D[!output SAFE_PROJECT_IDENTIFIER_NAME], &IID_D[!output SAFE_PROJECT_IDENTIFIER_NAME]Events);
[!if SIMPLE_FRAME]

	EnableSimpleFrame();
[!endif]
[!if ASYNC_PROPERTY_LOAD]

	m_lReadyState = READYSTATE_LOADING;
	// TODO: readystate が変更された場合 InternalSetReadyState を呼び出してください
[!endif]
	// TODO: この位置にコントロールのインスタンス データの初期化処理を追加してください
}

// [!output CONTROL_CLASS]::~[!output CONTROL_CLASS] - デストラクター

[!output CONTROL_CLASS]::~[!output CONTROL_CLASS]()
{
	// TODO: この位置にコントロールのインスタンス データの後処理用のコードを追加してください
}

// [!output CONTROL_CLASS]::OnDraw - 描画関数

void [!output CONTROL_CLASS]::OnDraw(
			CDC* pdc, const CRect& rcBounds, const CRect& /* rcInvalid */)
{
	if (!pdc)
		return;

[!if SUBCLASS_WINDOW]
	DoSuperclassPaint(pdc, rcBounds);
[!else]
	// TODO: 以下のコードを描画用のコードに置き換えてください
	pdc->FillRect(rcBounds, CBrush::FromHandle((HBRUSH)GetStockObject(WHITE_BRUSH)));
	pdc->Ellipse(rcBounds);
[!endif]
[!if OPTIMIZED_DRAW]

	if (!IsOptimizedDraw())
	{
		// コンテナーは最適化された描画をサポートしていません。

		// TODO: *pdc デバイス コンテキスト内で GDI オブジェクトを選択した場合は
		//		この位置で以前に選択されたオブジェクトを復元してください。
	}
[!endif]
}

// [!output CONTROL_CLASS]::DoPropExchange - 永続性のサポート

void [!output CONTROL_CLASS]::DoPropExchange(CPropExchange* pPX)
{
	ExchangeVersion(pPX, MAKELONG(_wVerMinor, _wVerMajor));
	COleControl::DoPropExchange(pPX);

	// TODO: 永続属性を持つ各カスタム プロパティ用の PX_ 関数を呼び出します。
}

[!if WINDOWLESS || UNCLIPPED_DEVICE_CONTEXT || FLICKER_FREE || MOUSE_NOTIFICATIONS || OPTIMIZED_DRAW]

// [!output CONTROL_CLASS]::GetControlFlags -
// MFC の ActiveX コントロールの実装のカスタマイズ用フラグです。
//
DWORD [!output CONTROL_CLASS]::GetControlFlags()
{
	DWORD dwFlags = COleControl::GetControlFlags();

[!if UNCLIPPED_DEVICE_CONTEXT]
	// コントロールの出力はクリップされません。
	// コントロールはクライアント領域の四角形の外側を
	// ペイントしません。
	dwFlags &= ~clipPaintDC;
[!endif]
[!if WINDOWLESS]

	// コントロールはウィンドウを作成せずにアクティベート可能です。
	// TODO: コントロールのメッセージ ハンドラーを作成する場合、m_hWnd
	//		m_hWnd メンバー変数の値が NULL 以外であることを最初に確認
	//		してから使用してください。
	dwFlags |= windowlessActivate;
[!endif]
[!if FLICKER_FREE]

	// コントロールはアクティブ、非アクティブ状態間の移行時には
	// 再描画されません。
	dwFlags |= noFlickerActivate;
[!endif]
[!if MOUSE_NOTIFICATIONS]

	// コントロールは非アクティブにマウスの通知を受け取ることが可能です。
	// TODO: WM_SETCURSOR および WM_MOUSEMOVE 用のハンドラーを作成する場合、
	//		m_hWnd メンバー変数の値が NULL 以外であることを最初に
	//		確認してから使用してください。
	dwFlags |= pointerInactive;
[!endif]
[!if OPTIMIZED_DRAW]

	// コントロールは OnDraw メソッドをデバイス コンテキスト内でオリジナルの
	// GDI オブジェクトを復元せずに最適化することが可能です。
	dwFlags |= canOptimizeDraw;
[!endif]
	return dwFlags;
}

[!endif]

// [!output CONTROL_CLASS]::OnResetState - コントロールを既定の状態にリセットします。

void [!output CONTROL_CLASS]::OnResetState()
{
	COleControl::OnResetState();  // DoPropExchange を呼び出して既定値にリセット

	// TODO: この位置にコントロールの状態をリセットする処理を追加してください
}

[!if ABOUT_BOX]

// [!output CONTROL_CLASS]::AboutBox - "バージョン情報" ボックスをユーザーに表示します。

void [!output CONTROL_CLASS]::AboutBox()
{
	CDialogEx dlgAbout(IDD_ABOUTBOX_[!output UPPER_CASE_SAFE_PROJECT_IDENTIFIER_NAME]);
	dlgAbout.DoModal();
}

[!endif]
[!if SUBCLASS_WINDOW]

// [!output CONTROL_CLASS]::PreCreateWindow - CreateWindowEx のパラメーターを変更します。

BOOL [!output CONTROL_CLASS]::PreCreateWindow(CREATESTRUCT& cs)
{
[!if SUBCLASS_WINDOW]
	cs.lpszClass = _T("[!output WINDOW_CLASS]");
[!else]
	// TODO: サブクラス化されたウィンドウ クラス名を記述してください。
	cs.lpszClass = _T("");
[!endif]
	return COleControl::PreCreateWindow(cs);
}

// [!output CONTROL_CLASS]::IsSubclassedControl - これはサブクラス コントロールです。

BOOL [!output CONTROL_CLASS]::IsSubclassedControl()
{
	return TRUE;
}

// [!output CONTROL_CLASS]::OnOcmCommand - コマンド メッセージを処理します。

LRESULT [!output CONTROL_CLASS]::OnOcmCommand(WPARAM wParam, LPARAM lParam)
{
	WORD wNotifyCode = HIWORD(wParam);

	// TODO: この位置にスイッチ ステートメントで wNotifyCode を処理するコードを追加してください

	return 0;
}

[!endif]

// [!output CONTROL_CLASS] メッセージ ハンドラー
