#pragma once

#ifdef _WIN32_WCE
#error "COlePropertyPage nie jest obs�ugiwane w systemie Windows CE."
#endif 

// [!output CLASS_NAME]: Okno dialogowe strony w�a�ciwo�ci

class [!output CLASS_NAME] : public COlePropertyPage
{
	DECLARE_DYNCREATE([!output CLASS_NAME])
	DECLARE_OLECREATE_EX([!output CLASS_NAME])

// Konstruktorzy
public:
	[!output CLASS_NAME]();

// Dane okna dialogowego
	enum { IDD = [!output IDD_DIALOG] };

// Implementacja
protected:
	virtual void DoDataExchange(CDataExchange* pDX);        // obs�uga DDX/DDV

// Mapy wiadomo�ci
protected:
	DECLARE_MESSAGE_MAP()
};
