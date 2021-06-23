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

// [!output DIALOG_AUTO_PROXY_HEADER]: archivo de encabezado
//

#pragma once

class [!output DIALOG_CLASS];


// Destino del comando de [!output DIALOG_AUTO_PROXY_CLASS]

class [!output DIALOG_AUTO_PROXY_CLASS] : public [!output DIALOG_AUTO_PROXY_BASE_CLASS]
{
	DECLARE_DYNCREATE([!output DIALOG_AUTO_PROXY_CLASS])

	[!output DIALOG_AUTO_PROXY_CLASS]();           // Constructor protegido utilizado por la creación dinámica

// Atributos
public:
	[!output DIALOG_CLASS]* m_pDialog;

// Operaciones
public:

// Reemplazos
	public:
	virtual void OnFinalRelease();

// Implementación
protected:
	virtual ~[!output DIALOG_AUTO_PROXY_CLASS]();

	// Funciones de asignación de mensajes generadas

	DECLARE_MESSAGE_MAP()
	DECLARE_OLECREATE([!output DIALOG_AUTO_PROXY_CLASS])

	// Funciones de asignación de envío OLE generadas

	DECLARE_DISPATCH_MAP()
	DECLARE_INTERFACE_MAP()
};

