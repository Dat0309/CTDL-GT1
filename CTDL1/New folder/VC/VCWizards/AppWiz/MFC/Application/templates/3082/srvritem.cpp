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

// [!output SERVER_ITEM_IMPL]: implementación de la clase [!output SERVER_ITEM_CLASS]
//

#include "stdafx.h"
#include "[!output APP_HEADER]"

#include "[!output DOC_HEADER]"
#include "[!output SERVER_ITEM_HEADER]"
[!if CONTAINER_SERVER]
#include "[!output CONTAINER_ITEM_HEADER]"
[!endif]

#ifdef _DEBUG
#define new DEBUG_NEW
#endif


// Implementación de [!output SERVER_ITEM_CLASS]

IMPLEMENT_DYNAMIC([!output SERVER_ITEM_CLASS], [!output SERVER_ITEM_BASE_CLASS])

[!output SERVER_ITEM_CLASS]::[!output SERVER_ITEM_CLASS]([!output DOC_CLASS]* pContainerDoc)
	: [!output SERVER_ITEM_BASE_CLASS](pContainerDoc, TRUE)
{
	// TODO: agregar aquí el código de construcción único
	//  (por ejemplo, agregar formatos adicionales del Portapapeles al origen de datos del elemento)
}

[!output SERVER_ITEM_CLASS]::~[!output SERVER_ITEM_CLASS]()
{
	// TODO: agregar aquí el código de limpieza
}

void [!output SERVER_ITEM_CLASS]::Serialize(CArchive& ar)
{
	// El marco de trabajo llamará a [!output SERVER_ITEM_CLASS]::Serialize si
	//  el elemento se copia en el Portapapeles.  Esto puede ocurrir automáticamente
	//  a través de la devolución de llamada OLE OnGetClipboardData.  Una buena opción predeterminada para
	//  el elemento incrustado es simplemente delegar en la función Serialize
	//  del documento.  Si admite vínculos, querrá serializar
	//  sólo una parte del documento.

	if (!IsLinkedItem())
	{
		[!output DOC_CLASS]* pDoc = GetDocument();
		ASSERT_VALID(pDoc);
		if (pDoc)
			pDoc->Serialize(ar);
	}
}

BOOL [!output SERVER_ITEM_CLASS]::OnGetExtent(DVASPECT dwDrawAspect, CSize& rSize)
{
	// La mayoría de las aplicaciones, como ésta, sólo controlan el dibujo de la apariencia
	//  del contenido del elemento.  Si desea admitir otros aspectos, como
	//  DVASPECT_THUMBNAIL (reemplazando OnDrawEx), esta
	//  implementación de OnGetExtent se debe modificar para controlar los
	//  aspectos adicionales.

	if (dwDrawAspect != DVASPECT_CONTENT)
		return [!output SERVER_ITEM_BASE_CLASS]::OnGetExtent(dwDrawAspect, rSize);

	// Se llama a [!output SERVER_ITEM_CLASS]::OnGetExtent para obtener la extensión en
	//  unidades HIMETRIC del elemento completo.  La implementación
	//  predeterminada aquí simplemente devuelve un número de unidades incluido en el código.

	// TODO: reemplazar este tamaño arbitrario

	rSize = CSize(3000, 3000);   // Unidades 3000 x 3000 HIMETRIC

	return TRUE;
}

BOOL [!output SERVER_ITEM_CLASS]::OnDraw(CDC* pDC, CSize& rSize)
{
	if (!pDC)
		return FALSE;

	// Quitarlo si utiliza rSize
	UNREFERENCED_PARAMETER(rSize);

	// TODO: establecer el modo de asignación y extensión
	//  (La extensión normalmente es la misma que el tamaño devuelto de OnGetExtent)
	pDC->SetMapMode(MM_ANISOTROPIC);
	pDC->SetWindowOrg(0,0);
	pDC->SetWindowExt(3000, 3000);

	// TODO: agregar aquí el código de dibujo.  Opcionalmente, rellenar la extensión HIMETRIC.
	//  Todo el dibujo tiene lugar en el contexto de dispositivo de metarchivo (pDC).

[!if CONTAINER_SERVER]
	// TODO: dibujar también objetos [!output CONTAINER_ITEM_CLASS] incrustados.

[!endif]
[!if CONTAINER_SERVER]
	// El siguiente código dibuja el primer elemento en una posición arbitraria.

	// TODO: quitar este código cuando el código de dibujo real esté completo

	[!output DOC_CLASS]* pDoc = GetDocument();
	ASSERT_VALID(pDoc);
	if (!pDoc)
		return FALSE;

	POSITION pos = pDoc->GetStartPosition();
	[!output CONTAINER_ITEM_CLASS]* pItem = DYNAMIC_DOWNCAST([!output CONTAINER_ITEM_CLASS], pDoc->GetNextClientItem(pos));
	if (pItem != NULL)
		pItem->Draw(pDC, CRect(10, 10, 1010, 1010));
[!endif]
	return TRUE;
}


// Diagnósticos de [!output SERVER_ITEM_CLASS]

#ifdef _DEBUG
void [!output SERVER_ITEM_CLASS]::AssertValid() const
{
	[!output SERVER_ITEM_BASE_CLASS]::AssertValid();
}

void [!output SERVER_ITEM_CLASS]::Dump(CDumpContext& dc) const
{
	[!output SERVER_ITEM_BASE_CLASS]::Dump(dc);
}
#endif

