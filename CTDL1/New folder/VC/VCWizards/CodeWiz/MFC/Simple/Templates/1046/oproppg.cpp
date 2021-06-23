// [!output IMPL_FILE] : arquivo de implementação
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


// Diálogo de [!output CLASS_NAME]

IMPLEMENT_DYNCREATE([!output CLASS_NAME], COlePropertyPage)



// Mapa de Mensagens

BEGIN_MESSAGE_MAP([!output CLASS_NAME], COlePropertyPage)
END_MESSAGE_MAP()



// Inicializa fábrica de classes e guid

// {[!output CLSID_REGISTRY_FORMAT]}
IMPLEMENT_OLECREATE_EX([!output CLASS_NAME], "[!output TYPEID]",
	[!output CLSID_IMPLEMENT_OLECREATE_FORMAT])



// [!output CLASS_NAME]::[!output CLASS_NAME]Factory::UpdateRegistry -
// Adiciona ou remove entradas no Registro do Sistema para [!output CLASS_NAME]

BOOL [!output CLASS_NAME]::[!output CLASS_NAME]Factory::UpdateRegistry(BOOL bRegister)
{
	// TODO: Definir cadeia de caracteres de recursos para tipo de página; substituir '0' abaixo com ID.

	if (bRegister)
		return AfxOleRegisterPropertyPageClass(AfxGetInstanceHandle(),
			m_clsid, 0);
	else
		return AfxOleUnregisterClass(m_clsid, NULL);
}



// [!output CLASS_NAME]::[!output CLASS_NAME] - Construtor

// TODO: Definir cadeia de caracteres de recursos para captação de página; substituir '0' abaixo com ID.

[!output CLASS_NAME]::[!output CLASS_NAME]() :
	COlePropertyPage(IDD, 0)
{
[!if ACCESSIBILITY]
#ifndef _WIN32_WCE
	EnableActiveAccessibility();
#endif
[!endif]

}



// [!output CLASS_NAME]::DoDataExchange - Move dados entre página e propriedades

void [!output CLASS_NAME]::DoDataExchange(CDataExchange* pDX)
{
	DDP_PostProcessing(pDX);
}



// Manipuladores de Mensagens de [!output CLASS_NAME]
