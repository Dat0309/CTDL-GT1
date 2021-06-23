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

// [!output DIALOG_AUTO_PROXY_HEADER]: файл заголовка
//

#pragma once

class [!output DIALOG_CLASS];


// конечный объект команды [!output DIALOG_AUTO_PROXY_CLASS]

class [!output DIALOG_AUTO_PROXY_CLASS] : public [!output DIALOG_AUTO_PROXY_BASE_CLASS]
{
	DECLARE_DYNCREATE([!output DIALOG_AUTO_PROXY_CLASS])

	[!output DIALOG_AUTO_PROXY_CLASS]();           // защищенный конструктор, используемый при динамическом создании

// Атрибуты
public:
	[!output DIALOG_CLASS]* m_pDialog;

// Операции
public:

// Переопределение
	public:
	virtual void OnFinalRelease();

// Реализация
protected:
	virtual ~[!output DIALOG_AUTO_PROXY_CLASS]();

	// Созданные функции схемы сообщений

	DECLARE_MESSAGE_MAP()
	DECLARE_OLECREATE([!output DIALOG_AUTO_PROXY_CLASS])

	// Автоматически созданные функции диспетчерской карты OLE

	DECLARE_DISPATCH_MAP()
	DECLARE_INTERFACE_MAP()
};

