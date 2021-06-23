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

IMPLEMENT_DYNCREATE([!output CLASS_NAME], COlePropertyPage)



// Mapa de mensajes

BEGIN_MESSAGE_MAP([!output CLASS_NAME], COlePropertyPage)
END_MESSAGE_MAP()



// Inicializar el generador de clases y el guid

// {[!output CLSID_REGISTRY_FORMAT]}
IMPLEMENT_OLECREATE_EX([!output CLASS_NAME], "[!output TYPEID]",
	[!output CLSID_IMPLEMENT_OLECREATE_FORMAT])



// [!output CLASS_NAME]::[!output CLASS_NAME]Factory::UpdateRegistry -
// Agrega o quita entradas del Registro del sistema para [!output CLASS_NAME]

BOOL [!output CLASS_NAME]::[!output CLASS_NAME]Factory::UpdateRegistry(BOOL bRegister)
{
	// TODO: definir el recurso de cadena del tipo de página; reemplazar '0' con el id.

	if (bRegister)
		return AfxOleRegisterPropertyPageClass(AfxGetInstanceHandle(),
			m_clsid, 0);
	else
		return AfxOleUnregisterClass(m_clsid, NULL);
}



// [!output CLASS_NAME]::[!output CLASS_NAME]: constructor

// TODO: definir el recurso de cadena del título de la página; reemplazar '0' con el id.

[!output CLASS_NAME]::[!output CLASS_NAME]() :
	COlePropertyPage(IDD, 0)
{
[!if ACCESSIBILITY]
#ifndef _WIN32_WCE
	EnableActiveAccessibility();
#endif
[!endif]

}



// [!output CLASS_NAME]::DoDataExchange: mueve los datos entre páginas y propiedades

void [!output CLASS_NAME]::DoDataExchange(CDataExchange* pDX)
{
	DDP_PostProcessing(pDX);
}



// Controladores de mensajes de [!output CLASS_NAME]
