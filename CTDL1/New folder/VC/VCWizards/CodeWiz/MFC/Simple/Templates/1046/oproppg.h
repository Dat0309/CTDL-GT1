#pragma once

#ifdef _WIN32_WCE
#error "COlePropertyPage não suportado para Windows CE."
#endif 

// [!output CLASS_NAME] : Caixa de diálogo da página de propriedades

class [!output CLASS_NAME] : public COlePropertyPage
{
	DECLARE_DYNCREATE([!output CLASS_NAME])
	DECLARE_OLECREATE_EX([!output CLASS_NAME])

// Construtores
public:
	[!output CLASS_NAME]();

// Janela de Dados
	enum { IDD = [!output IDD_DIALOG] };

// Implementação
protected:
	virtual void DoDataExchange(CDataExchange* pDX);        // Suporte DDX/DDV

// Mapas de Mensagens
protected:
	DECLARE_MESSAGE_MAP()
};
