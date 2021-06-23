#pragma once

#ifdef _WIN32_WCE
#error "COlePropertyPage wird für Windows CE nicht unterstützt."
#endif 

// [!output CLASS_NAME]: Eigenschaftenseitendialog

class [!output CLASS_NAME] : public COlePropertyPage
{
	DECLARE_DYNCREATE([!output CLASS_NAME])
	DECLARE_OLECREATE_EX([!output CLASS_NAME])

// Konstruktoren
public:
	[!output CLASS_NAME]();

// Dialogfelddaten
	enum { IDD = [!output IDD_DIALOG] };

// Implementierung
protected:
	virtual void DoDataExchange(CDataExchange* pDX);        // DDX/DDV-Unterstützung

// Meldungszuordnungstabellen
protected:
	DECLARE_MESSAGE_MAP()
};
