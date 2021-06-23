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

// [!output CONTAINER_ITEM_IMPL]: implementación de la clase [!output CONTAINER_ITEM_CLASS]
//

#include "stdafx.h"
#include "[!output APP_HEADER]"

[!if OLEDB_RECORD_VIEW || ODBC_RECORD_VIEW]
#include "[!output ROWSET_HEADER]"
[!endif]
#include "[!output DOC_HEADER]"
#include "[!output VIEW_HEADER]"
#include "[!output CONTAINER_ITEM_HEADER]"

#ifdef _DEBUG
#define new DEBUG_NEW
#endif


// Implementación de [!output CONTAINER_ITEM_CLASS]

IMPLEMENT_SERIAL([!output CONTAINER_ITEM_CLASS], [!output CONTAINER_ITEM_BASE_CLASS], 0)

[!if RICH_EDIT_VIEW]
[!output CONTAINER_ITEM_CLASS]::[!output CONTAINER_ITEM_CLASS](REOBJECT* preo, [!output DOC_CLASS]* pContainer)
	: [!output CONTAINER_ITEM_BASE_CLASS](preo, pContainer)
[!else]
[!output CONTAINER_ITEM_CLASS]::[!output CONTAINER_ITEM_CLASS]([!output DOC_CLASS]* pContainer)
	: [!output CONTAINER_ITEM_BASE_CLASS](pContainer)
[!endif]
{
	// TODO: agregar aquí el código de construcción único
}

[!output CONTAINER_ITEM_CLASS]::~[!output CONTAINER_ITEM_CLASS]()
{
	// TODO: agregar aquí el código de limpieza
}
[!if !RICH_EDIT_VIEW]

void [!output CONTAINER_ITEM_CLASS]::OnChange(OLE_NOTIFICATION nCode, DWORD dwParam)
{
	ASSERT_VALID(this);

	[!output CONTAINER_ITEM_BASE_CLASS]::OnChange(nCode, dwParam);

	// Cuando se edita un elemento (en contexto o completamente abierto)
	//  envía notificaciones OnChange para cambios en el estado del
	//  elemento o apariencia visual de su contenido.

	// TODO: invalidar el elemento llamando a UpdateAllViews
	//  (con sugerencias apropiadas a la aplicación)

	GetDocument()->UpdateAllViews(NULL);
		// Por ahora actualizar sólo TODAS las vistas, no las sugerencias
}

BOOL [!output CONTAINER_ITEM_CLASS]::OnChangeItemPosition(const CRect& rectPos)
{
	ASSERT_VALID(this);

	// Durante la activación en contexto, el servidor llama a [!output CONTAINER_ITEM_CLASS]::OnChangeItemPosition
	//  para cambiar la posición de la ventana
	//  en contexto.  Normalmente, es el resultado de los datos en el cambio
	//  de documentos del servidor como el cambio de extensión o como resultado
	//  del cambio de tamaño en contexto.
	//
	// El valor predeterminado es llamar a la clase base, que llamará a
	//  [!output CONTAINER_ITEM_BASE_CLASS]::SetItemRects para mover el elemento
	//  a la nueva posición.

	if (![!output CONTAINER_ITEM_BASE_CLASS]::OnChangeItemPosition(rectPos))
		return FALSE;

	// TODO: actualizar cualquier caché que pueda tener del rectángulo o extensión del elemento

	return TRUE;
}

BOOL [!output CONTAINER_ITEM_CLASS]::OnShowControlBars(CFrameWnd* pFrameWnd, BOOL bShow)
{
[!if APP_TYPE_MDI]
	CMDIFrameWndEx* pMainFrame = DYNAMIC_DOWNCAST(CMDIFrameWndEx, pFrameWnd);
[!else]
	CFrameWndEx* pMainFrame = DYNAMIC_DOWNCAST(CFrameWndEx, pFrameWnd);
[!endif]

	if (pMainFrame != NULL)
	{
		ASSERT_VALID(pMainFrame);
		return pMainFrame->OnShowPanes(bShow);
	}

	return FALSE;
}

[!if !ACTIVE_DOC_CONTAINER]
void [!output CONTAINER_ITEM_CLASS]::OnGetItemPosition(CRect& rPosition)
{
	ASSERT_VALID(this);

	// Durante la activación en contexto, se llamará a [!output CONTAINER_ITEM_CLASS]::OnGetItemPosition
	//  para determinar la ubicación de este elemento.  Normalmente, este 
	//  rectángulo reflejaría la posición actual del elemento relativa a la 
	//  vista utilizada para la activación.  Puede obtener la vista llamando a 
	//  [!output CONTAINER_ITEM_CLASS]::GetActiveView.

	// TODO: devolver el rectángulo correcto (en píxeles) en rPosition

	CSize size;
	rPosition.SetRectEmpty();
	if (GetExtent(&size, m_nDrawAspect))
	{
		[!output VIEW_CLASS]* pView = GetActiveView();
		ASSERT_VALID(pView);
		if (!pView)
			return;
		CDC *pDC = pView->GetDC();
		ASSERT(pDC);
		if (!pDC)
			return;
		pDC->HIMETRICtoLP(&size);
		rPosition.SetRect(10, 10, size.cx + 10, size.cy + 10);
	}
	else
		rPosition.SetRect(10, 10, 210, 210);
}
[!endif]

void [!output CONTAINER_ITEM_CLASS]::OnActivate()
{
[!if !ACTIVE_DOC_CONTAINER]
    // Permitir sólo un elemento activo en contexto por marco
    [!output VIEW_CLASS]* pView = GetActiveView();
    ASSERT_VALID(pView);
	if (!pView)
		return;
    COleClientItem* pItem = GetDocument()->GetInPlaceActiveItem(pView);
    if (pItem != NULL && pItem != this)
        pItem->Close();
    
    [!output CONTAINER_ITEM_BASE_CLASS]::OnActivate();
[!endif]
}

void [!output CONTAINER_ITEM_CLASS]::OnDeactivateUI(BOOL bUndoable)
{
	[!output CONTAINER_ITEM_BASE_CLASS]::OnDeactivateUI(bUndoable);

    DWORD dwMisc = 0;
    m_lpObject->GetMiscStatus(GetDrawAspect(), &dwMisc);
    if (dwMisc & OLEMISC_INSIDEOUT)
        DoVerb(OLEIVERB_HIDE, NULL);
}

void [!output CONTAINER_ITEM_CLASS]::Serialize(CArchive& ar)
{
	ASSERT_VALID(this);

	// Llamar a la clase base primero para leer en los datos de [!output CONTAINER_ITEM_BASE_CLASS].
	// Dado que esta operación configura el puntero m_pDocument devuelto desde
	//  [!output CONTAINER_ITEM_CLASS]::GetDocument, es buena idea llamar en
	//  primer lugar a la clase base Serialize.
	[!output CONTAINER_ITEM_BASE_CLASS]::Serialize(ar);

	// Ahora almacenar en o recuperar datos específicos de [!output CONTAINER_ITEM_CLASS]
	if (ar.IsStoring())
	{
		// TODO: agregar aquí el código de almacenamiento
	}
	else
	{
		// TODO: agregar aquí el código de carga
	}
}
[!if CONTAINER_SERVER]

BOOL [!output CONTAINER_ITEM_CLASS]::CanActivate()
{
	// La edición en contexto mientras el propio servidor se edita en contexto
	//  no funciona y no se admite.  Por tanto, deshabilitar
	//  la activación en contexto en este caso.
	[!output DOC_CLASS]* pDoc = GetDocument();
	ASSERT_VALID(pDoc);
	if (!pDoc)
		return FALSE;
	ASSERT_KINDOF(COleServerDoc, pDoc);
	if (!pDoc->IsKindOf(RUNTIME_CLASS(COleServerDoc)))
	{
		return FALSE;
	}
	if (pDoc->IsInPlaceActive())
		return FALSE;

	// De lo contrario, confiar en el comportamiento predeterminado
	return COleClientItem::CanActivate();
}
[!endif]
[!endif]


// Diagnósticos de [!output CONTAINER_ITEM_CLASS]

#ifdef _DEBUG
void [!output CONTAINER_ITEM_CLASS]::AssertValid() const
{
	[!output CONTAINER_ITEM_BASE_CLASS]::AssertValid();
}

void [!output CONTAINER_ITEM_CLASS]::Dump(CDumpContext& dc) const
{
	[!output CONTAINER_ITEM_BASE_CLASS]::Dump(dc);
}
#endif

