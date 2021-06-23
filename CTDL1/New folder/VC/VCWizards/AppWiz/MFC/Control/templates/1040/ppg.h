#pragma once

// [!output PROPERTY_PAGE_HEADER] : dichiarazione della classe di pagine delle proprietà [!output PROPERTY_PAGE_CLASS].


// [!output PROPERTY_PAGE_CLASS] : vedere [!output PROPERTY_PAGE_IMPL] per l'implementazione.

class [!output PROPERTY_PAGE_CLASS] : public COlePropertyPage
{
	DECLARE_DYNCREATE([!output PROPERTY_PAGE_CLASS])
	DECLARE_OLECREATE_EX([!output PROPERTY_PAGE_CLASS])

// Costruttore
public:
	[!output PROPERTY_PAGE_CLASS]();

// Dati della finestra di dialogo
	enum { IDD = IDD_PROPPAGE_[!output UPPER_CASE_SAFE_PROJECT_IDENTIFIER_NAME] };

// Implementazione
protected:
	virtual void DoDataExchange(CDataExchange* pDX);    // Supporto DDX/DDV

// Mappe messaggi
protected:
	DECLARE_MESSAGE_MAP()
};

