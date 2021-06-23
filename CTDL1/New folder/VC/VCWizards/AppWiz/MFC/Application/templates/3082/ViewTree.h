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

#pragma once

/////////////////////////////////////////////////////////////////////////////
// Ventana de CViewTree

class CViewTree : public CTreeCtrl
{
// Construcción
public:
	CViewTree();

// Invalidaciones
protected:
	virtual BOOL OnNotify(WPARAM wParam, LPARAM lParam, LRESULT* pResult);

// Implementación
public:
	virtual ~CViewTree();

protected:
	DECLARE_MESSAGE_MAP()
};
