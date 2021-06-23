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

// [!output TREE_VIEW_IMPL]: implementación de la clase [!output TREE_VIEW_CLASS]
//

#include "stdafx.h"
#include "[!output APP_HEADER]"

#include "[!output DOC_HEADER]"
#include "[!output TREE_VIEW_HEADER]"

#ifdef _DEBUG
#define new DEBUG_NEW
#endif


// [!output TREE_VIEW_CLASS]

IMPLEMENT_DYNCREATE([!output TREE_VIEW_CLASS], [!output TREE_VIEW_BASE_CLASS])

BEGIN_MESSAGE_MAP([!output TREE_VIEW_CLASS], [!output TREE_VIEW_BASE_CLASS])
[!if PRINTING]
	// Comandos de impresión estándar
	ON_COMMAND(ID_FILE_PRINT, &[!output TREE_VIEW_BASE_CLASS]::OnFilePrint)
	ON_COMMAND(ID_FILE_PRINT_DIRECT, &[!output TREE_VIEW_BASE_CLASS]::OnFilePrint)
	ON_COMMAND(ID_FILE_PRINT_PREVIEW, &[!output TREE_VIEW_BASE_CLASS]::OnFilePrintPreview)
[!endif]
END_MESSAGE_MAP()


// Construcción o destrucción de [!output TREE_VIEW_CLASS]

[!output TREE_VIEW_CLASS]::[!output TREE_VIEW_CLASS]()
{
[!if ACCESSIBILITY]
	EnableActiveAccessibility();
[!endif]
	// TODO: agregar aquí el código de construcción
}

[!output TREE_VIEW_CLASS]::~[!output TREE_VIEW_CLASS]()
{
}

BOOL [!output TREE_VIEW_CLASS]::PreCreateWindow(CREATESTRUCT& cs)
{
	// TODO: modificar aquí la clase Window o los estilos cambiando CREATESTRUCT cs

	return [!output TREE_VIEW_BASE_CLASS]::PreCreateWindow(cs);
}
[!if PRINTING]


// Impresión de [!output TREE_VIEW_CLASS]

BOOL [!output TREE_VIEW_CLASS]::OnPreparePrinting(CPrintInfo* pInfo)
{
	// Preparación predeterminada
	return DoPreparePrinting(pInfo);
}

void [!output TREE_VIEW_CLASS]::OnDraw(CDC* /*pDC*/)
{
	[!output DOC_CLASS]* pDoc = GetDocument();
	ASSERT_VALID(pDoc);

	// TODO: agregar aquí el código de dibujo para datos nativos
}

void [!output TREE_VIEW_CLASS]::OnBeginPrinting(CDC* /*pDC*/, CPrintInfo* /*pInfo*/)
{
	// TODO: agregar inicialización adicional antes de imprimir
}

void [!output TREE_VIEW_CLASS]::OnEndPrinting(CDC* /*pDC*/, CPrintInfo* /*pInfo*/)
{
	// TODO: agregar limpieza después de imprimir
}
[!endif]

void [!output TREE_VIEW_CLASS]::OnInitialUpdate()
{
	[!output TREE_VIEW_BASE_CLASS]::OnInitialUpdate();

	// TODO: puede rellenar TreeView con elementos obteniendo acceso directamente
	//  a través de una llamada a GetTreeCtrl().
}


// Diagnósticos de [!output TREE_VIEW_CLASS]

#ifdef _DEBUG
void [!output TREE_VIEW_CLASS]::AssertValid() const
{
	[!output TREE_VIEW_BASE_CLASS]::AssertValid();
}

void [!output TREE_VIEW_CLASS]::Dump(CDumpContext& dc) const
{
	[!output TREE_VIEW_BASE_CLASS]::Dump(dc);
}

[!output DOC_CLASS]* [!output TREE_VIEW_CLASS]::GetDocument() // La versión de no depuración está alineada
{
	ASSERT(m_pDocument->IsKindOf(RUNTIME_CLASS([!output DOC_CLASS])));
	return ([!output DOC_CLASS]*)m_pDocument;
}
#endif //_DEBUG


// Controladores de mensaje de [!output TREE_VIEW_CLASS]
