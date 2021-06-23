[!if RIBBON_TOOLBAR]
// Este código fuente de ejemplos de MFC muestra el uso de la interfaz de usuario Microsoft Office Fluent para MFC 
// ("interfaz de usuario Fluent") y solamente se proporciona como material de referencia para complementar la 
// documentación de referencia de Microsoft Foundation Classes y la documentación electrónica relacionada 
// incluida con el software de la biblioteca de C++ de MFC.  
// Los términos de licencia para copiar, usar o distribuir la interfaz de usuario Fluent están disponibles por separado.  
// Para obtener más información acerca del programa de licencia de la interfaz de usuario Fluent, visite 
// http://go.microsoft.com/fwlink/?LinkId=238214.
//
// (C) Microsoft Corporation
// Reservados todos los derechos.
[!endif]

// [!output DIALOG_IMPL]: archivo de implementación
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

// Cuadro de diálogo CAboutDlg utilizado para el comando Acerca de

[!if !NO_MFC_CONTROLS]
class CAboutDlg : public CDialogEx
[!else]
class CAboutDlg : public CDialog
[!endif]
{
public:
	CAboutDlg();

// Datos del cuadro de diálogo
	enum { IDD = IDD_ABOUTBOX };

	protected:
	virtual void DoDataExchange(CDataExchange* pDX);    // Compatibilidad con DDX/DDV

// Implementación
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

// Cuadro de diálogo de [!output DIALOG_CLASS]

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
	// Si existe un proxy de automatización para este cuadro de diálogo,
	//  volver a establecer su puntero a dicho cuadro de diálogo como NULL, para que sepa
	//  que el cuadro de diálogo se ha eliminado.
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


// Controladores de mensaje de [!output DIALOG_CLASS]

BOOL [!output DIALOG_CLASS]::OnInitDialog()
{
	[!output DIALOG_BASE_CLASS]::OnInitDialog();
[!if ABOUT_BOX]

	// Agregar el elemento de menú "Acerca de..." al menú del sistema.

	// IDM_ABOUTBOX debe estar en el intervalo de comandos del sistema.
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

	// Establecer el icono para este cuadro de diálogo.  El marco de trabajo realiza esta operación
	//  automáticamente cuando la ventana principal de la aplicación no es un cuadro de diálogo
	SetIcon(m_hIcon, TRUE);			// Establecer icono grande
	SetIcon(m_hIcon, FALSE);		// Establecer icono pequeño

[!if MAIN_FRAME_MAXIMIZED]
	ShowWindow(SW_MAXIMIZE);

[!endif]
[!if MAIN_FRAME_MINIMIZED]
	ShowWindow(SW_MINIMIZE);

[!endif]
	// TODO: agregar aquí inicialización adicional

	return TRUE;  // Devuelve TRUE  a menos que establezca el foco en un control
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

// Si agrega un botón Minimizar al cuadro de diálogo, necesitará el siguiente código
//  para dibujar el icono.  Para aplicaciones MFC que utilicen el modelo de documentos y vistas,
//  esta operación la realiza automáticamente el marco de trabajo.

void [!output DIALOG_CLASS]::OnPaint()
{
	if (IsIconic())
	{
		CPaintDC dc(this); // Contexto de dispositivo para dibujo

		SendMessage(WM_ICONERASEBKGND, reinterpret_cast<WPARAM>(dc.GetSafeHdc()), 0);

		// Centrar icono en el rectángulo de cliente
		int cxIcon = GetSystemMetrics(SM_CXICON);
		int cyIcon = GetSystemMetrics(SM_CYICON);
		CRect rect;
		GetClientRect(&rect);
		int x = (rect.Width() - cxIcon + 1) / 2;
		int y = (rect.Height() - cyIcon + 1) / 2;

		// Dibujar el icono
		dc.DrawIcon(x, y, m_hIcon);
	}
	else
	{
		[!output DIALOG_BASE_CLASS]::OnPaint();
	}
}

// El sistema llama a esta función para obtener el cursor que se muestra mientras el usuario arrastra
//  la ventana minimizada.
HCURSOR [!output DIALOG_CLASS]::OnQueryDragIcon()
{
	return static_cast<HCURSOR>(m_hIcon);
}
[!if AUTOMATION]

// Los servidores de automatización no se deben cerrar cuando un usuario cierra la interfaz de usuario
//  si un controlador conserva uno de sus objetos.
//  Estos controladores de mensaje garantizan que si el servidor proxy aún está en uso,
//  la interfaz de usuario (UI) se oculta pero el cuadro de diálogo que permanece a su alrededor
//  se descarta.

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
	// Si el objeto del servidor proxy aún está presente, el controlador de
	//  automatización conserva esta aplicación.  Dejar
	//  el cuadro de diálogo, pero ocultar su interfaz de usuario.
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
