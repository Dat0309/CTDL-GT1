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

// [!output TREE_VIEW_HEADER]: interfaz de la clase [!output TREE_VIEW_CLASS]
//


#pragma once

class [!output DOC_CLASS];

class [!output TREE_VIEW_CLASS] : public CTreeView
{
protected: // Crear sólo a partir de serialización
	[!output TREE_VIEW_CLASS]();
	DECLARE_DYNCREATE([!output TREE_VIEW_CLASS])

// Atributos
public:
	[!output DOC_CLASS]* GetDocument();

// Operaciones
public:

// Reemplazos
	public:
	virtual BOOL PreCreateWindow(CREATESTRUCT& cs);
	protected:
[!if PRINTING]
	virtual BOOL OnPreparePrinting(CPrintInfo* pInfo);
	virtual void OnBeginPrinting(CDC* pDC, CPrintInfo* pInfo);
	virtual void OnEndPrinting(CDC* pDC, CPrintInfo* pInfo);
	virtual void OnDraw(CDC* pDC);
[!endif]
	virtual void OnInitialUpdate(); // Se llama la primera vez después de la construcción

// Implementación
public:
	virtual ~[!output TREE_VIEW_CLASS]();
#ifdef _DEBUG
	virtual void AssertValid() const;
	virtual void Dump(CDumpContext& dc) const;
#endif

protected:

// Funciones de asignación de mensajes generadas
protected:
	DECLARE_MESSAGE_MAP()
};

#ifndef _DEBUG  // Versión de depuración en [!output TREE_VIEW_IMPL]
inline [!output DOC_CLASS]* [!output TREE_VIEW_CLASS]::GetDocument()
   { return reinterpret_cast<[!output DOC_CLASS]*>(m_pDocument); }
#endif

