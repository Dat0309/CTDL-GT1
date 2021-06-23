#pragma once

// [!output PROPERTY_PAGE_HEADER] : Deklaration der [!output PROPERTY_PAGE_CLASS]-Eigenschaftenseitenklasse.


// [!output PROPERTY_PAGE_CLASS] : Informationen zur Implementierung unter [!output PROPERTY_PAGE_IMPL].

class [!output PROPERTY_PAGE_CLASS] : public COlePropertyPage
{
	DECLARE_DYNCREATE([!output PROPERTY_PAGE_CLASS])
	DECLARE_OLECREATE_EX([!output PROPERTY_PAGE_CLASS])

// Konstruktor
public:
	[!output PROPERTY_PAGE_CLASS]();

// Dialogfelddaten
	enum { IDD = IDD_PROPPAGE_[!output UPPER_CASE_SAFE_PROJECT_IDENTIFIER_NAME] };

// Implementierung
protected:
	virtual void DoDataExchange(CDataExchange* pDX);    // DDX/DDV-Unterstützung

// Meldungszuordnungstabellen
protected:
	DECLARE_MESSAGE_MAP()
};

