[!if RIBBON_TOOLBAR]
// Этот исходный код MFC Samples демонстрирует функционирование пользовательского интерфейса Fluent на основе MFC в Microsoft Office
// ("Fluent UI") и предоставляется исключительно как справочный материал в качестве дополнения к
// справочнику по пакету Microsoft Foundation Classes и связанной электронной документации,
// включенной в программное обеспечение библиотеки MFC C++.  
// Условия лицензионного соглашения на копирование, использование или распространение Fluent UI доступны отдельно.  
// Для получения дополнительных сведений о нашей лицензионной программе Fluent UI посетите веб-узел
// http://go.microsoft.com/fwlink/?LinkId=238214.
//
// (C) Корпорация Майкрософт (Microsoft Corp.)
// Все права защищены.
[!endif]

// [!output WND_VIEW_HEADER] : интерфейс класса [!output WND_VIEW_CLASS]
//


#pragma once


// окно [!output WND_VIEW_CLASS]

class [!output WND_VIEW_CLASS] : public [!output WND_VIEW_BASE_CLASS]
{
// Создание
public:
	[!output WND_VIEW_CLASS]();

// Атрибуты
public:

// Операции
public:

// Переопределение
	protected:
	virtual BOOL PreCreateWindow(CREATESTRUCT& cs);

// Реализация
public:
	virtual ~[!output WND_VIEW_CLASS]();

	// Созданные функции схемы сообщений
protected:
	afx_msg void OnPaint();
	DECLARE_MESSAGE_MAP()
};

