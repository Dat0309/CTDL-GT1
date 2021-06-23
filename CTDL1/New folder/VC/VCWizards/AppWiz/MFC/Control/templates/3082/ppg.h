#pragma once

// [!output PROPERTY_PAGE_HEADER]: declaraci�n de la clase de p�gina de propiedades [!output PROPERTY_PAGE_CLASS].


// [!output PROPERTY_PAGE_CLASS] : consulte [!output PROPERTY_PAGE_IMPL] para obtener informaci�n sobre la implementaci�n.

class [!output PROPERTY_PAGE_CLASS] : public COlePropertyPage
{
	DECLARE_DYNCREATE([!output PROPERTY_PAGE_CLASS])
	DECLARE_OLECREATE_EX([!output PROPERTY_PAGE_CLASS])

// Constructor
public:
	[!output PROPERTY_PAGE_CLASS]();

// Datos del cuadro de di�logo
	enum { IDD = IDD_PROPPAGE_[!output UPPER_CASE_SAFE_PROJECT_IDENTIFIER_NAME] };

// Implementaci�n
protected:
	virtual void DoDataExchange(CDataExchange* pDX);    // Compatibilidad con DDX/DDV

// Mapas de mensajes
protected:
	DECLARE_MESSAGE_MAP()
};

