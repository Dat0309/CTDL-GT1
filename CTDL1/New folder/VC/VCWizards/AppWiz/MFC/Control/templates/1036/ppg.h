#pragma once

// [!output PROPERTY_PAGE_HEADER]�: d�claration de la classe de page de propri�t�s [!output PROPERTY_PAGE_CLASS].


// [!output PROPERTY_PAGE_CLASS]�: consultez [!output PROPERTY_PAGE_IMPL] pour l'impl�mentation.

class [!output PROPERTY_PAGE_CLASS] : public COlePropertyPage
{
	DECLARE_DYNCREATE([!output PROPERTY_PAGE_CLASS])
	DECLARE_OLECREATE_EX([!output PROPERTY_PAGE_CLASS])

// Constructeur
public:
	[!output PROPERTY_PAGE_CLASS]();

// Donn�es de bo�te de dialogue
	enum { IDD = IDD_PROPPAGE_[!output UPPER_CASE_SAFE_PROJECT_IDENTIFIER_NAME] };

// Impl�mentation
protected:
	virtual void DoDataExchange(CDataExchange* pDX);    // Prise en charge de DDX/DDV

// Tables des messages
protected:
	DECLARE_MESSAGE_MAP()
};

