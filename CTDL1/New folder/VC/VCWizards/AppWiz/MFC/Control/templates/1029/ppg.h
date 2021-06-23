#pragma once

// [!output PROPERTY_PAGE_HEADER] : Declaration of the [!output PROPERTY_PAGE_CLASS] property page class.


// [!output PROPERTY_PAGE_CLASS] : See [!output PROPERTY_PAGE_IMPL] for implementation.

class [!output PROPERTY_PAGE_CLASS] : public COlePropertyPage
{
	DECLARE_DYNCREATE([!output PROPERTY_PAGE_CLASS])
	DECLARE_OLECREATE_EX([!output PROPERTY_PAGE_CLASS])

// Constructor
public:
	[!output PROPERTY_PAGE_CLASS]();

// Dialog Data
	enum { IDD = IDD_PROPPAGE_[!output UPPER_CASE_SAFE_PROJECT_IDENTIFIER_NAME] };

// Implementation
protected:
	virtual void DoDataExchange(CDataExchange* pDX);    // DDX/DDV support

// Message maps
protected:
	DECLARE_MESSAGE_MAP()
};

