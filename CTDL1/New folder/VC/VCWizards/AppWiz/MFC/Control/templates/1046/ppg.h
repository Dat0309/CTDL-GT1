#pragma once

// [!output PROPERTY_PAGE_HEADER] : Declaração da classe de página de propriedades [!output PROPERTY_PAGE_CLASS].


// [!output PROPERTY_PAGE_CLASS] : Olhe [!output PROPERTY_PAGE_IMPL] para implementação.

class [!output PROPERTY_PAGE_CLASS] : public COlePropertyPage
{
	DECLARE_DYNCREATE([!output PROPERTY_PAGE_CLASS])
	DECLARE_OLECREATE_EX([!output PROPERTY_PAGE_CLASS])

// Construtor
public:
	[!output PROPERTY_PAGE_CLASS]();

// Janela de Dados
	enum { IDD = IDD_PROPPAGE_[!output UPPER_CASE_SAFE_PROJECT_IDENTIFIER_NAME] };

// Implementação
protected:
	virtual void DoDataExchange(CDataExchange* pDX);    // Suporte DDX/DDV

// Mapas de Mensagens
protected:
	DECLARE_MESSAGE_MAP()
};

