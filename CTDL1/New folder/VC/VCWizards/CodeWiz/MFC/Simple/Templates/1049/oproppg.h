#pragma once

#ifdef _WIN32_WCE
#error "COlePropertyPage не поддерживается в Windows CE."
#endif 

// [!output CLASS_NAME]: диалоговое окно страницы свойств

class [!output CLASS_NAME] : public COlePropertyPage
{
	DECLARE_DYNCREATE([!output CLASS_NAME])
	DECLARE_OLECREATE_EX([!output CLASS_NAME])

// Конструкторы
public:
	[!output CLASS_NAME]();

// Данные диалогового окна
	enum { IDD = [!output IDD_DIALOG] };

// Реализация
protected:
	virtual void DoDataExchange(CDataExchange* pDX);        // поддержка DDX/DDV

// Схемы сообщений
protected:
	DECLARE_MESSAGE_MAP()
};
