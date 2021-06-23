[!if RIBBON_TOOLBAR]
// この MFC サンプル ソース コードでは、MFC Microsoft Office Fluent ユーザー インターフェイス 
// ("Fluent UI") の使用方法を示します。このコードは、MFC C++ ライブラリ ソフトウェアに 
// 同梱されている Microsoft Foundation Class リファレンスおよび関連電子ドキュメントを
// 補完するための参考資料として提供されます。
// Fluent UI を複製、使用、または配布するためのライセンス条項は個別に用意されています。
// Fluent UI ライセンス プログラムの詳細については、Web サイト
// http://go.microsoft.com/fwlink/?LinkId=238214 を参照してください。
//
// Copyright (C) Microsoft Corporation
// All rights reserved.
[!endif]

// [!output DIALOG_IMPL] : 実装ファイル
//

#include "stdafx.h"
#include "[!output APP_HEADER]"
#include "[!output DIALOG_HEADER]"
[!if AUTOMATION]
#include "[!output DIALOG_AUTO_PROXY_HEADER]"
[!endif]
#include "afxdialogex.h"

#ifdef _DEBUG
#define new DEBUG_NEW
#endif

[!if ABOUT_BOX]

// アプリケーションのバージョン情報に使われる CAboutDlg ダイアログ

[!if !NO_MFC_CONTROLS]
class CAboutDlg : public CDialogEx
[!else]
class CAboutDlg : public CDialog
[!endif]
{
public:
	CAboutDlg();

// ダイアログ データ
	enum { IDD = IDD_ABOUTBOX };

	protected:
	virtual void DoDataExchange(CDataExchange* pDX);    // DDX/DDV サポート

// 実装
protected:
	DECLARE_MESSAGE_MAP()
};

[!if !NO_MFC_CONTROLS]
CAboutDlg::CAboutDlg() : CDialogEx(CAboutDlg::IDD)
[!else]
CAboutDlg::CAboutDlg() : CDialog(CAboutDlg::IDD)
[!endif]
{
[!if ACCESSIBILITY]
	EnableActiveAccessibility();
[!endif]
}

void CAboutDlg::DoDataExchange(CDataExchange* pDX)
{
[!if !NO_MFC_CONTROLS]
	CDialogEx::DoDataExchange(pDX);
[!else]
	CDialog::DoDataExchange(pDX);
[!endif]
}

[!if !NO_MFC_CONTROLS]
BEGIN_MESSAGE_MAP(CAboutDlg, CDialogEx)
[!else]
BEGIN_MESSAGE_MAP(CAboutDlg, CDialog)
[!endif]
END_MESSAGE_MAP()

[!endif]

// [!output DIALOG_CLASS] ダイアログ

[!if HTML_DIALOG]
BEGIN_DHTML_EVENT_MAP([!output DIALOG_CLASS])
	DHTML_EVENT_ONCLICK(_T("ButtonOK"), OnButtonOK)
	DHTML_EVENT_ONCLICK(_T("ButtonCancel"), OnButtonCancel)
END_DHTML_EVENT_MAP()
[!endif]

[!if AUTOMATION]
IMPLEMENT_DYNAMIC([!output DIALOG_CLASS], [!output DIALOG_BASE_CLASS]);
[!endif]

[!output DIALOG_CLASS]::[!output DIALOG_CLASS](CWnd* pParent /*=NULL*/)
[!if HTML_DIALOG]
	: CDHtmlDialog([!output DIALOG_CLASS]::IDD, [!output DIALOG_CLASS]::IDH, pParent)
[!else]
	: [!output DIALOG_BASE_CLASS]([!output DIALOG_CLASS]::IDD, pParent)
[!endif]
{
[!if ACCESSIBILITY]
	EnableActiveAccessibility();
[!endif]
	m_hIcon = AfxGetApp()->LoadIcon(IDR_MAINFRAME);
[!if AUTOMATION]
	m_pAutoProxy = NULL;
[!endif]
}
[!if AUTOMATION]

[!output DIALOG_CLASS]::~[!output DIALOG_CLASS]()
{
	// このダイアログ用のオートメーション プロキシがある場合は、このダイアログ
	//  へのポインターを NULL に戻します、それによってダイアログが削除されたこと
	//  がわかります。
	if (m_pAutoProxy != NULL)
		m_pAutoProxy->m_pDialog = NULL;
}
[!endif]

void [!output DIALOG_CLASS]::DoDataExchange(CDataExchange* pDX)
{
	[!output DIALOG_BASE_CLASS]::DoDataExchange(pDX);
}

BEGIN_MESSAGE_MAP([!output DIALOG_CLASS], [!output DIALOG_BASE_CLASS])
[!if ABOUT_BOX]
	ON_WM_SYSCOMMAND()
[!endif]
[!if AUTOMATION]
	ON_WM_CLOSE()
[!endif]
[!if !HTML_DIALOG]
	ON_WM_PAINT()
	ON_WM_QUERYDRAGICON()
[!endif]
END_MESSAGE_MAP()


// [!output DIALOG_CLASS] メッセージ ハンドラー

BOOL [!output DIALOG_CLASS]::OnInitDialog()
{
	[!output DIALOG_BASE_CLASS]::OnInitDialog();
[!if ABOUT_BOX]

	// "バージョン情報..." メニューをシステム メニューに追加します。

	// IDM_ABOUTBOX は、システム コマンドの範囲内になければなりません。
	ASSERT((IDM_ABOUTBOX & 0xFFF0) == IDM_ABOUTBOX);
	ASSERT(IDM_ABOUTBOX < 0xF000);

	CMenu* pSysMenu = GetSystemMenu(FALSE);
	if (pSysMenu != NULL)
	{
		BOOL bNameValid;
		CString strAboutMenu;
		bNameValid = strAboutMenu.LoadString(IDS_ABOUTBOX);
		ASSERT(bNameValid);
		if (!strAboutMenu.IsEmpty())
		{
			pSysMenu->AppendMenu(MF_SEPARATOR);
			pSysMenu->AppendMenu(MF_STRING, IDM_ABOUTBOX, strAboutMenu);
		}
	}
[!endif]

	// このダイアログのアイコンを設定します。アプリケーションのメイン ウィンドウがダイアログでない場合、
	//  Framework は、この設定を自動的に行います。
	SetIcon(m_hIcon, TRUE);			// 大きいアイコンの設定
	SetIcon(m_hIcon, FALSE);		// 小さいアイコンの設定

[!if MAIN_FRAME_MAXIMIZED]
	ShowWindow(SW_MAXIMIZE);

[!endif]
[!if MAIN_FRAME_MINIMIZED]
	ShowWindow(SW_MINIMIZE);

[!endif]
	// TODO: 初期化をここに追加します。

	return TRUE;  // フォーカスをコントロールに設定した場合を除き、TRUE を返します。
}
[!if ABOUT_BOX]

void [!output DIALOG_CLASS]::OnSysCommand(UINT nID, LPARAM lParam)
{
	if ((nID & 0xFFF0) == IDM_ABOUTBOX)
	{
		CAboutDlg dlgAbout;
		dlgAbout.DoModal();
	}
	else
	{
		[!output DIALOG_BASE_CLASS]::OnSysCommand(nID, lParam);
	}
}
[!endif]

// ダイアログに最小化ボタンを追加する場合、アイコンを描画するための
//  下のコードが必要です。ドキュメント/ビュー モデルを使う MFC アプリケーションの場合、
//  これは、Framework によって自動的に設定されます。

void [!output DIALOG_CLASS]::OnPaint()
{
	if (IsIconic())
	{
		CPaintDC dc(this); // 描画のデバイス コンテキスト

		SendMessage(WM_ICONERASEBKGND, reinterpret_cast<WPARAM>(dc.GetSafeHdc()), 0);

		// クライアントの四角形領域内の中央
		int cxIcon = GetSystemMetrics(SM_CXICON);
		int cyIcon = GetSystemMetrics(SM_CYICON);
		CRect rect;
		GetClientRect(&rect);
		int x = (rect.Width() - cxIcon + 1) / 2;
		int y = (rect.Height() - cyIcon + 1) / 2;

		// アイコンの描画
		dc.DrawIcon(x, y, m_hIcon);
	}
	else
	{
		[!output DIALOG_BASE_CLASS]::OnPaint();
	}
}

// ユーザーが最小化したウィンドウをドラッグしているときに表示するカーソルを取得するために、
//  システムがこの関数を呼び出します。
HCURSOR [!output DIALOG_CLASS]::OnQueryDragIcon()
{
	return static_cast<HCURSOR>(m_hIcon);
}
[!if AUTOMATION]

// コントローラーがオブジェクトの 1 つをまだ保持している場合、
//  オートメーションサーバーはユーザーが UI を閉じる際に終了で
//  きません。これらのメッセージ ハンドラーはプロキシがまだ使用中
//  かどうかを確認し、それから UI が非表示になりますがダイアロ
//  グはそれが消された場合その場所に残ります。

void [!output DIALOG_CLASS]::OnClose()
{
	if (CanExit())
		[!output DIALOG_BASE_CLASS]::OnClose();
}

void [!output DIALOG_CLASS]::OnOK()
{
	if (CanExit())
		[!output DIALOG_BASE_CLASS]::OnOK();
}

void [!output DIALOG_CLASS]::OnCancel()
{
	if (CanExit())
		[!output DIALOG_BASE_CLASS]::OnCancel();
}

BOOL [!output DIALOG_CLASS]::CanExit()
{
	// プロキシ オブジェクトがまだ残っている場合、オートメーション
	//  コントローラーはこのアプリケーションをまだ保持しています。
	//  ダイアログの周囲は残しますが UI は非表示になります。
	if (m_pAutoProxy != NULL)
	{
		ShowWindow(SW_HIDE);
		return FALSE;
	}

	return TRUE;
}
[!endif]

[!if HTML_DIALOG]
HRESULT [!output DIALOG_CLASS]::OnButtonOK(IHTMLElement* /*pElement*/)
{
	OnOK();
	return S_OK;
}

HRESULT [!output DIALOG_CLASS]::OnButtonCancel(IHTMLElement* /*pElement*/)
{
	OnCancel();
	return S_OK;
}
[!endif]
