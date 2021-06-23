#pragma once

// [!output PROPERTY_PAGE_HEADER]: объявление класса страницы свойств [!output PROPERTY_PAGE_CLASS].


// [!output PROPERTY_PAGE_CLASS]: про реализацию см. [!output PROPERTY_PAGE_IMPL].

class [!output PROPERTY_PAGE_CLASS] : public COlePropertyPage
{
	DECLARE_DYNCREATE([!output PROPERTY_PAGE_CLASS])
	DECLARE_OLECREATE_EX([!output PROPERTY_PAGE_CLASS])

// Конструктор
public:
	[!output PROPERTY_PAGE_CLASS]();

// Данные диалогового окна
	enum { IDD = IDD_PROPPAGE_[!output UPPER_CASE_SAFE_PROJECT_IDENTIFIER_NAME] };

// Реализация
protected:
	virtual void DoDataExchange(CDataExchange* pDX);    // поддержка DDX/DDV

// Схемы сообщений
protected:
	DECLARE_MESSAGE_MAP()
};

