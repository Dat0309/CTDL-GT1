[!if RIBBON_TOOLBAR]
// 这段 MFC 示例源代码演示如何使用 MFC Microsoft Office Fluent 用户界面 
// (“Fluent UI”)。该示例仅供参考，
// 用以补充《Microsoft 基础类参考》和 
// MFC C++ 库软件随附的相关电子文档。  
// 复制、使用或分发 Fluent UI 的许可条款是单独提供的。  
// 若要了解有关 Fluent UI 许可计划的详细信息，请访问  
// http://go.microsoft.com/fwlink/?LinkId=238214。
//
// 版权所有(C) Microsoft Corporation
// 保留所有权利。
[!endif]

// [!output DIALOG_IMPL] : 实现文件
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

// 用于应用程序“关于”菜单项的 CAboutDlg 对话框

[!if !NO_MFC_CONTROLS]
class CAboutDlg : public CDialogEx
[!else]
class CAboutDlg : public CDialog
[!endif]
{
public:
	CAboutDlg();

// 对话框数据
	enum { IDD = IDD_ABOUTBOX };

	protected:
	virtual void DoDataExchange(CDataExchange* pDX);    // DDX/DDV 支持

// 实现
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

// [!output DIALOG_CLASS] 对话框

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
	// 如果该对话框有自动化代理，则
	//  将此代理指向该对话框的后向指针设置为 NULL，以便
	//  此代理知道该对话框已被删除。
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


// [!output DIALOG_CLASS] 消息处理程序

BOOL [!output DIALOG_CLASS]::OnInitDialog()
{
	[!output DIALOG_BASE_CLASS]::OnInitDialog();
[!if ABOUT_BOX]

	// 将“关于...”菜单项添加到系统菜单中。

	// IDM_ABOUTBOX 必须在系统命令范围内。
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

	// 设置此对话框的图标。  当应用程序主窗口不是对话框时，框架将自动
	//  执行此操作
	SetIcon(m_hIcon, TRUE);			// 设置大图标
	SetIcon(m_hIcon, FALSE);		// 设置小图标

[!if MAIN_FRAME_MAXIMIZED]
	ShowWindow(SW_MAXIMIZE);

[!endif]
[!if MAIN_FRAME_MINIMIZED]
	ShowWindow(SW_MINIMIZE);

[!endif]
	// TODO:  在此添加额外的初始化代码

	return TRUE;  // 除非将焦点设置到控件，否则返回 TRUE
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

// 如果向对话框添加最小化按钮，则需要下面的代码
//  来绘制该图标。  对于使用文档/视图模型的 MFC 应用程序，
//  这将由框架自动完成。

void [!output DIALOG_CLASS]::OnPaint()
{
	if (IsIconic())
	{
		CPaintDC dc(this); // 用于绘制的设备上下文

		SendMessage(WM_ICONERASEBKGND, reinterpret_cast<WPARAM>(dc.GetSafeHdc()), 0);

		// 使图标在工作区矩形中居中
		int cxIcon = GetSystemMetrics(SM_CXICON);
		int cyIcon = GetSystemMetrics(SM_CYICON);
		CRect rect;
		GetClientRect(&rect);
		int x = (rect.Width() - cxIcon + 1) / 2;
		int y = (rect.Height() - cyIcon + 1) / 2;

		// 绘制图标
		dc.DrawIcon(x, y, m_hIcon);
	}
	else
	{
		[!output DIALOG_BASE_CLASS]::OnPaint();
	}
}

//当用户拖动最小化窗口时系统调用此函数取得光标
//显示。
HCURSOR [!output DIALOG_CLASS]::OnQueryDragIcon()
{
	return static_cast<HCURSOR>(m_hIcon);
}
[!if AUTOMATION]

// 当用户关闭 UI 时，如果控制器仍保持着它的某个
//  对象，则自动化服务器不应退出。  这些
//  消息处理程序确保如下情形: 如果代理仍在使用，
//  则将隐藏 UI；但是在关闭对话框时，
//  对话框仍然会保留在那里。

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
	// 如果代理对象仍保留在那里，则自动化
	//  控制器仍会保持此应用程序。
	//  使对话框保留在那里，但将其 UI 隐藏起来。
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
