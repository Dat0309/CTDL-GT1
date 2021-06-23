#pragma once

#ifdef _WIN32_WCE
#error "COlePropertyPage non è supportato per Windows CE."
#endif 

// [!output CLASS_NAME] : finestra di dialogo Pagina delle proprietà

class [!output CLASS_NAME] : public COlePropertyPage
{
	DECLARE_DYNCREATE([!output CLASS_NAME])
	DECLARE_OLECREATE_EX([!output CLASS_NAME])

// Costruttori
public:
	[!output CLASS_NAME]();

// Dati della finestra di dialogo
	enum { IDD = [!output IDD_DIALOG] };

// Implementazione
protected:
	virtual void DoDataExchange(CDataExchange* pDX);        // Supporto DDX/DDV

// Mappe messaggi
protected:
	DECLARE_MESSAGE_MAP()
};
