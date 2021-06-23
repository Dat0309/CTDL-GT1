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


// [!output CLASS_NAME]

[!if CREATABLE]
IMPLEMENT_DYNCREATE([!output CLASS_NAME], [!output BASE_CLASS])
[!else]
IMPLEMENT_DYNAMIC([!output CLASS_NAME], [!output BASE_CLASS])
[!endif]

[!output CLASS_NAME]::[!output CLASS_NAME](COleServerDoc* pServerDoc, BOOL bAutoDelete)
		: COleServerItem( pServerDoc, bAutoDelete)
{
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

	[!output BASE_CLASS]::OnFinalRelease();
}
[!endif]

BOOL [!output CLASS_NAME]::OnDraw(CDC* pDC, CSize& rSize)
{
	// Llamado por el área de trabajo para presentar el elemento OLE en un metarchivo.
	// La representación del metarchivo del elemento OLE se utiliza para mostrar 
	// el elemento en la aplicación contenedora. Si la aplicación contenedora se ha programado con 
	// la biblioteca MFC (Microsoft Foundation Class), la función miembro Draw 
	// del objeto COleClientItem correspondiente utiliza el metarchivo.
	// No hay ninguna implementación predeterminada. Se debe reemplazar esta función para dibujar
	// el elemento en el contexto de dispositivo especificado. 
	ASSERT(FALSE);			// Quitar esto después de finalizar TODO
	return TRUE;
}

BEGIN_MESSAGE_MAP([!output CLASS_NAME], [!output BASE_CLASS])
END_MESSAGE_MAP()
[!if AUTOMATION || CREATABLE]

BEGIN_DISPATCH_MAP([!output CLASS_NAME], [!output BASE_CLASS])
END_DISPATCH_MAP()

// Nota: suministramos compatibilidad con IID_I[!output CLASS_NAME_ROOT] para admitir enlaces de seguridad de tipos
//  desde VBA.  Este IID debe coincidir con el GUID asociado a la interfaz Dispinterface 
//  del archivo .IDL.

// {[!output DISPIID_REGISTRY_FORMAT]}
static const IID IID_I[!output CLASS_NAME_ROOT] =
[!output DISPIID_STATIC_CONST_GUID_FORMAT];

BEGIN_INTERFACE_MAP([!output CLASS_NAME], [!output BASE_CLASS])
	INTERFACE_PART([!output CLASS_NAME], IID_I[!output CLASS_NAME_ROOT], Dispatch)
END_INTERFACE_MAP()
[!endif]
[!if CREATABLE]

// {[!output CLSID_REGISTRY_FORMAT]}
IMPLEMENT_OLECREATE([!output CLASS_NAME], "[!output TYPEID]", [!output CLSID_IMPLEMENT_OLECREATE_FORMAT])
[!endif]


// Diagnósticos de [!output CLASS_NAME]

#ifdef _DEBUG
void [!output CLASS_NAME]::AssertValid() const
{
	[!output BASE_CLASS]::AssertValid();
}

#ifndef _WIN32_WCE
void [!output CLASS_NAME]::Dump(CDumpContext& dc) const
{
	[!output BASE_CLASS]::Dump(dc);
}
#endif
#endif //_DEBUG


// Serialización de [!output CLASS_NAME]

#ifndef _WIN32_WCE
void [!output CLASS_NAME]::Serialize(CArchive& ar)
{
	if (ar.IsStoring())
	{
		// TODO: agregar aquí el código de almacenamiento
	}
	else
	{
		// TODO: agregar aquí el código de carga
	}
}
#endif

// Comandos de [!output CLASS_NAME]
