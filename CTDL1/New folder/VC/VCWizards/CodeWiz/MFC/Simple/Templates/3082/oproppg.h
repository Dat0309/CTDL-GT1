#pragma once

#ifdef _WIN32_WCE
#error "COlePropertyPage no es compatible con Windows CE."
#endif 

// [!output CLASS_NAME]: cuadro de diálogo de la página de propiedades

class [!output CLASS_NAME] : public COlePropertyPage
{
	DECLARE_DYNCREATE([!output CLASS_NAME])
	DECLARE_OLECREATE_EX([!output CLASS_NAME])

// Constructores
public:
	[!output CLASS_NAME]();

// Datos del cuadro de diálogo
	enum { IDD = [!output IDD_DIALOG] };

// Implementación
protected:
	virtual void DoDataExchange(CDataExchange* pDX);        // Compatibilidad con DDX/DDV

// Mapas de mensajes
protected:
	DECLARE_MESSAGE_MAP()
};
