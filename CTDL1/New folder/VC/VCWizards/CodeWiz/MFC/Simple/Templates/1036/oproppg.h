#pragma once

#ifdef _WIN32_WCE
#error "COlePropertyPage n'est pas pris en charge pour Windows CE."
#endif 

// [!output CLASS_NAME]�: bo�te de dialogue Page de propri�t�s

class [!output CLASS_NAME] : public COlePropertyPage
{
	DECLARE_DYNCREATE([!output CLASS_NAME])
	DECLARE_OLECREATE_EX([!output CLASS_NAME])

// Constructeurs
public:
	[!output CLASS_NAME]();

// Donn�es de bo�te de dialogue
	enum { IDD = [!output IDD_DIALOG] };

// Impl�mentation
protected:
	virtual void DoDataExchange(CDataExchange* pDX);        // Prise en charge de DDX/DDV

// Tables des messages
protected:
	DECLARE_MESSAGE_MAP()
};
