#pragma once

#ifdef _WIN32_WCE
#error "COlePropertyPage n�o suportado para Windows CE."
#endif 

// [!output CLASS_NAME] : Caixa de di�logo da p�gina de propriedades

class [!output CLASS_NAME] : public COlePropertyPage
{
	DECLARE_DYNCREATE([!output CLASS_NAME])
	DECLARE_OLECREATE_EX([!output CLASS_NAME])

// Construtores
public:
	[!output CLASS_NAME]();

// Janela de Dados
	enum { IDD = [!output IDD_DIALOG] };

// Implementa��o
protected:
	virtual void DoDataExchange(CDataExchange* pDX);        // Suporte DDX/DDV

// Mapas de Mensagens
protected:
	DECLARE_MESSAGE_MAP()
};
