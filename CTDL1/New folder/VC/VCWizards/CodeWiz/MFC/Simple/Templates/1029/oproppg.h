#pragma once

#ifdef _WIN32_WCE
#error "COlePropertyPage is not supported for Windows CE."
#endif 

// [!output CLASS_NAME] : Property page dialog

class [!output CLASS_NAME] : public COlePropertyPage
{
	DECLARE_DYNCREATE([!output CLASS_NAME])
	DECLARE_OLECREATE_EX([!output CLASS_NAME])

// Constructors
public:
	[!output CLASS_NAME]();

// Dialog Data
	enum { IDD = [!output IDD_DIALOG] };

// Implementation
protected:
	virtual void DoDataExchange(CDataExchange* pDX);        // DDX/DDV support

// Message maps
protected:
	DECLARE_MESSAGE_MAP()
};
