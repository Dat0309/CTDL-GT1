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

// [!output DIALOG_AUTO_PROXY_IMPL]: archivo de implementación
//

#include "stdafx.h"
#include "[!output APP_HEADER]"
#include "[!output DIALOG_AUTO_PROXY_HEADER]"
#include "[!output DIALOG_HEADER]"

#ifdef _DEBUG
#define new DEBUG_NEW
#endif


// [!output DIALOG_AUTO_PROXY_CLASS]

IMPLEMENT_DYNCREATE([!output DIALOG_AUTO_PROXY_CLASS], [!output DIALOG_AUTO_PROXY_BASE_CLASS])

[!output DIALOG_AUTO_PROXY_CLASS]::[!output DIALOG_AUTO_PROXY_CLASS]()
{
	EnableAutomation();
	
	// Para que la aplicación se ejecute durante el tiempo de que un objeto de 
	//	automatización está activo, el constructor llama a AfxOleLockApp.
	AfxOleLockApp();

	// Obtener acceso al cuadro de diálogo a través del puntero
	//  de la ventana principal de la aplicación.  Establecer el puntero interno del servidor proxy
	//  para que apunte al cuadro de diálogo y volver a establecer el puntero
	//  del cuadro de diálogo a este servidor proxy.
	ASSERT_VALID(AfxGetApp()->m_pMainWnd);
	if (AfxGetApp()->m_pMainWnd)
	{
		ASSERT_KINDOF([!output DIALOG_CLASS], AfxGetApp()->m_pMainWnd);
		if (AfxGetApp()->m_pMainWnd->IsKindOf(RUNTIME_CLASS([!output DIALOG_CLASS])))
		{
			m_pDialog = reinterpret_cast<[!output DIALOG_CLASS]*>(AfxGetApp()->m_pMainWnd);
			m_pDialog->m_pAutoProxy = this;
		}
	}
}

[!output DIALOG_AUTO_PROXY_CLASS]::~[!output DIALOG_AUTO_PROXY_CLASS]()
{
	// Para terminar la aplicación cuando terminen todos los objetos creados con
	// 	automatización, el destructor llama a AfxOleUnlockApp.
	//  Entre otras cosas, esta operación destruirá el cuadro de diálogo principal
	if (m_pDialog != NULL)
		m_pDialog->m_pAutoProxy = NULL;
	AfxOleUnlockApp();
}

void [!output DIALOG_AUTO_PROXY_CLASS]::OnFinalRelease()
{
	// Cuando se libera la última referencia para un objeto de automatización,
	// se llama a OnFinalRelease.  La clase base eliminará automáticamente
	// el objeto.  Se requiere limpieza adicional para el
	// objeto antes de llamar a la clase base.

	[!output DIALOG_AUTO_PROXY_BASE_CLASS]::OnFinalRelease();
}

BEGIN_MESSAGE_MAP([!output DIALOG_AUTO_PROXY_CLASS], [!output DIALOG_AUTO_PROXY_BASE_CLASS])
END_MESSAGE_MAP()

BEGIN_DISPATCH_MAP([!output DIALOG_AUTO_PROXY_CLASS], [!output DIALOG_AUTO_PROXY_BASE_CLASS])
END_DISPATCH_MAP()

// Nota: se agrega compatibilidad para IID_I[!output SAFE_PROJECT_IDENTIFIER_NAME] para admitir enlaces con seguridad de tipos
//  desde VBA. IID debe coincidir con el id. GUID adjuntado a 
//  la interfaz dispinterface del archivo .IDL.

// {[!output DISPIID_REGISTRY_FORMAT]}
static const IID IID_I[!output SAFE_PROJECT_IDENTIFIER_NAME] =
[!output DISPIID_STATIC_CONST_GUID_FORMAT];

BEGIN_INTERFACE_MAP([!output DIALOG_AUTO_PROXY_CLASS], [!output DIALOG_AUTO_PROXY_BASE_CLASS])
	INTERFACE_PART([!output DIALOG_AUTO_PROXY_CLASS], IID_I[!output SAFE_PROJECT_IDENTIFIER_NAME], Dispatch)
END_INTERFACE_MAP()

// La macro IMPLEMENT_OLECREATE2 se define en el archivo StdAfx.h de este proyecto
// {[!output APP_CLSID_REGISTRY_FORMAT]}
IMPLEMENT_OLECREATE2([!output DIALOG_AUTO_PROXY_CLASS], "[!output SAFE_PROJECT_IDENTIFIER_NAME].Application", [!output APP_CLSID_IMPLEMENT_OLECREATE_FORMAT])


// Controladores de mensaje de [!output DIALOG_AUTO_PROXY_CLASS]
