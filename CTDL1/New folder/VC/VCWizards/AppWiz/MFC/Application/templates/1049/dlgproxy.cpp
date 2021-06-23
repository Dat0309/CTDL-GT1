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

// [!output DIALOG_AUTO_PROXY_IMPL] : файл реализации
//

#include "stdafx.h"
#include "[!output APP_HEADER]"
#include "[!output DIALOG_AUTO_PROXY_HEADER]"
#include "[!output DIALOG_HEADER]"

#ifdef _DEBUG
#define new DEBUG_NEW
#endif


// [!output DIALOG_AUTO_PROXY_CLASS]

IMPLEMENT_DYNCREATE([!output DIALOG_AUTO_PROXY_CLASS], [!output DIALOG_AUTO_PROXY_BASE_CLASS])

[!output DIALOG_AUTO_PROXY_CLASS]::[!output DIALOG_AUTO_PROXY_CLASS]()
{
	EnableAutomation();
	
	// Чтобы приложение работало, пока объект 
	//	автоматизации активен, конструктор вызывает AfxOleLockApp.
	AfxOleLockApp();

	// Получает доступ к диалоговому окну через указатель
	//  главного окна приложения.  Задает внутренний указатель прокси-сервера для
	//  доступа к диалогу, а также задает обратный указатель диалога на этот
	//  прокси-сервер.
	ASSERT_VALID(AfxGetApp()->m_pMainWnd);
	if (AfxGetApp()->m_pMainWnd)
	{
		ASSERT_KINDOF([!output DIALOG_CLASS], AfxGetApp()->m_pMainWnd);
		if (AfxGetApp()->m_pMainWnd->IsKindOf(RUNTIME_CLASS([!output DIALOG_CLASS])))
		{
			m_pDialog = reinterpret_cast<[!output DIALOG_CLASS]*>(AfxGetApp()->m_pMainWnd);
			m_pDialog->m_pAutoProxy = this;
		}
	}
}

[!output DIALOG_AUTO_PROXY_CLASS]::~[!output DIALOG_AUTO_PROXY_CLASS]()
{
	// Чтобы прервать работу приложения, когда все объекты создаются
	// 	автоматически, деструктор вызывает AfxOleUnlockApp.
	//  Среди прочего будет уничтожено главное диалоговое окно
	if (m_pDialog != NULL)
		m_pDialog->m_pAutoProxy = NULL;
	AfxOleUnlockApp();
}

void [!output DIALOG_AUTO_PROXY_CLASS]::OnFinalRelease()
{
	// Когда будет освобождена последняя ссылка на объект автоматизации,
	// Будет вызван OnFinalRelease.  Базовый класс автоматически
	// удалит объект.  Перед вызовом базового класса требуется
	// дополнительная очистка объекта.

	[!output DIALOG_AUTO_PROXY_BASE_CLASS]::OnFinalRelease();
}

BEGIN_MESSAGE_MAP([!output DIALOG_AUTO_PROXY_CLASS], [!output DIALOG_AUTO_PROXY_BASE_CLASS])
END_MESSAGE_MAP()

BEGIN_DISPATCH_MAP([!output DIALOG_AUTO_PROXY_CLASS], [!output DIALOG_AUTO_PROXY_BASE_CLASS])
END_DISPATCH_MAP()

// Примечание. Добавлена поддержка для IID_I[!output SAFE_PROJECT_IDENTIFIER_NAME] для поддержки привязки typesafe
//  из VBA.  IID должен совпадать с GUID, который вложен в 
//  disp-интерфейс в файле .IDL.

// {[!output DISPIID_REGISTRY_FORMAT]}
static const IID IID_I[!output SAFE_PROJECT_IDENTIFIER_NAME] =
[!output DISPIID_STATIC_CONST_GUID_FORMAT];

BEGIN_INTERFACE_MAP([!output DIALOG_AUTO_PROXY_CLASS], [!output DIALOG_AUTO_PROXY_BASE_CLASS])
	INTERFACE_PART([!output DIALOG_AUTO_PROXY_CLASS], IID_I[!output SAFE_PROJECT_IDENTIFIER_NAME], Dispatch)
END_INTERFACE_MAP()

// Макрос IMPLEMENT_OLECREATE2 определен в StdAfx.h этого проекта
// {[!output APP_CLSID_REGISTRY_FORMAT]}
IMPLEMENT_OLECREATE2([!output DIALOG_AUTO_PROXY_CLASS], "[!output SAFE_PROJECT_IDENTIFIER_NAME].Application", [!output APP_CLSID_IMPLEMENT_OLECREATE_FORMAT])


// обработчики сообщений [!output DIALOG_AUTO_PROXY_CLASS]
