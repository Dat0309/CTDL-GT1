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

// [!output WND_VIEW_HEADER]: interfaz de la clase [!output WND_VIEW_CLASS]
//


#pragma once


// Ventana de [!output WND_VIEW_CLASS]

class [!output WND_VIEW_CLASS] : public [!output WND_VIEW_BASE_CLASS]
{
// Construcción
public:
	[!output WND_VIEW_CLASS]();

// Atributos
public:

// Operaciones
public:

// Reemplazos
	protected:
	virtual BOOL PreCreateWindow(CREATESTRUCT& cs);

// Implementación
public:
	virtual ~[!output WND_VIEW_CLASS]();

	// Funciones de asignación de mensajes generadas
protected:
	afx_msg void OnPaint();
	DECLARE_MESSAGE_MAP()
};

