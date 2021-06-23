// [!output IMPL_FILE]: archivo de implementación
//

#include "stdafx.h"
[!if PROJECT_NAME_HEADER]
#include "[!output PROJECT_NAME].h"
[!endif]
#include "[!output HEADER_FILE]"
[!if !MERGE_FILE]

#ifdef _DEBUG
#define new DEBUG_NEW
#endif
[!endif]


// Cuadro de diálogo de [!output CLASS_NAME]

IMPLEMENT_DYNCREATE([!output CLASS_NAME], CDHtmlDialog)

[!output CLASS_NAME]::[!output CLASS_NAME](CWnd* pParent /*=NULL*/)
	: CDHtmlDialog([!output CLASS_NAME]::IDD, [!output CLASS_NAME]::IDH, pParent)
{
[!if ACCESSIBILITY]
#ifndef _WIN32_WCE
	EnableActiveAccessibility();
#endif
[!endif]

[!if AUTOMATION || CREATABLE]
	EnableAutomation();

[!endif]
[!if CREATABLE]

	// El constructor llama a AfxOleLockApp para mantener la aplicación en ejecución
	//	mientras el objeto de automatización OLE está activo.

	AfxOleLockApp();

[!endif]
}

[!output CLASS_NAME]::~[!output CLASS_NAME]()
{
[!if CREATABLE]
	// El destructor llama a AfxOleUnlockApp para terminar la aplicación
	// 	una vez creados todos los objetos con automatización OLE.

	AfxOleUnlockApp();
[!endif]
}
[!if AUTOMATION || CREATABLE]

void [!output CLASS_NAME]::OnFinalRelease()
{
	// Cuando se libera la última referencia para un objeto de automatización,
	// se llama a OnFinalRelease.  La clase base eliminará automáticamente
	// el objeto.  Se requiere limpieza adicional para el
	// objeto antes de llamar a la clase base.

	CDHtmlDialog::OnFinalRelease();
}
[!endif]

void [!output CLASS_NAME]::DoDataExchange(CDataExchange* pDX)
{
	CDHtmlDialog::DoDataExchange(pDX);
}

BOOL [!output CLASS_NAME]::OnInitDialog()
{
	CDHtmlDialog::OnInitDialog();
	return TRUE;  // devolver TRUE a menos que se establezca el foco en un control
}

BEGIN_MESSAGE_MAP([!output CLASS_NAME], CDHtmlDialog)
END_MESSAGE_MAP()

BEGIN_DHTML_EVENT_MAP([!output CLASS_NAME])
	DHTML_EVENT_ONCLICK(_T("ButtonOK"), OnButtonOK)
	DHTML_EVENT_ONCLICK(_T("ButtonCancel"), OnButtonCancel)
END_DHTML_EVENT_MAP()

[!if AUTOMATION || CREATABLE]

BEGIN_DISPATCH_MAP([!output CLASS_NAME], CDHtmlDialog)
END_DISPATCH_MAP()

// Nota: suministramos compatibilidad con IID_I[!output CLASS_NAME_ROOT] para admitir enlaces de seguridad de tipos
//  desde VBA.  Este IID debe coincidir con el GUID asociado a la interfaz Dispinterface
//  del archivo .IDL.

// {[!output DISPIID_REGISTRY_FORMAT]}
static const IID IID_I[!output CLASS_NAME_ROOT] =
[!output DISPIID_STATIC_CONST_GUID_FORMAT];

BEGIN_INTERFACE_MAP([!output CLASS_NAME], CDHtmlDialog)
	INTERFACE_PART([!output CLASS_NAME], IID_I[!output CLASS_NAME_ROOT], Dispatch)
END_INTERFACE_MAP()
[!endif]
[!if CREATABLE]

// {[!output CLSID_REGISTRY_FORMAT]}
IMPLEMENT_OLECREATE([!output CLASS_NAME], "[!output TYPEID]", [!output CLSID_IMPLEMENT_OLECREATE_FORMAT])
[!endif]


// Controladores de mensajes de [!output CLASS_NAME]

HRESULT [!output CLASS_NAME]::OnButtonOK(IHTMLElement* /*pElement*/)
{
	OnOK();
	return S_OK;
}

HRESULT [!output CLASS_NAME]::OnButtonCancel(IHTMLElement* /*pElement*/)
{
	OnCancel();
	return S_OK;
}
