// [!output IMPL_FILE]: файл реализации
//

#include "stdafx.h"
[!if PROJECT_NAME_HEADER]
#include "[!output PROJECT_NAME].h"
[!endif]
#include "[!output HEADER_FILE]"
[!if !MERGE_FILE]

#ifdef _DEBUG
#define new DEBUG_NEW
#endif
[!endif]


// диалоговое окно [!output CLASS_NAME]

IMPLEMENT_DYNCREATE([!output CLASS_NAME], CDHtmlDialog)

[!output CLASS_NAME]::[!output CLASS_NAME](CWnd* pParent /*=NULL*/)
	: CDHtmlDialog([!output CLASS_NAME]::IDD, [!output CLASS_NAME]::IDH, pParent)
{
[!if ACCESSIBILITY]
#ifndef _WIN32_WCE
	EnableActiveAccessibility();
#endif
[!endif]

[!if AUTOMATION || CREATABLE]
	EnableAutomation();

[!endif]
[!if CREATABLE]

	// Чтобы обеспечить работу приложения в течение всего периода активности объекта автоматизации OLE, 
	//	конструктор вызывает AfxOleLockApp.

	AfxOleLockApp();

[!endif]
}

[!output CLASS_NAME]::~[!output CLASS_NAME]()
{
[!if CREATABLE]
	// Чтобы прервать работу приложения, когда все объекты созданы
	// 	при помощи OLE-автоматизации, деструктор вызывает AfxOleUnlockApp.

	AfxOleUnlockApp();
[!endif]
}
[!if AUTOMATION || CREATABLE]

void [!output CLASS_NAME]::OnFinalRelease()
{
	// Когда будет освобождена последняя ссылка на объект автоматизации,
	// вызывается OnFinalRelease.  Базовый класс автоматически
	// удалит объект.  Перед вызовом базового класса добавьте
	// дополнительную очистку, необходимую вашему объекту.

	CDHtmlDialog::OnFinalRelease();
}
[!endif]

void [!output CLASS_NAME]::DoDataExchange(CDataExchange* pDX)
{
	CDHtmlDialog::DoDataExchange(pDX);
}

BOOL [!output CLASS_NAME]::OnInitDialog()
{
	CDHtmlDialog::OnInitDialog();
	return TRUE;  // возврат значения TRUE, если фокус не передан элементу управления
}

BEGIN_MESSAGE_MAP([!output CLASS_NAME], CDHtmlDialog)
END_MESSAGE_MAP()

BEGIN_DHTML_EVENT_MAP([!output CLASS_NAME])
	DHTML_EVENT_ONCLICK(_T("ButtonOK"), OnButtonOK)
	DHTML_EVENT_ONCLICK(_T("ButtonCancel"), OnButtonCancel)
END_DHTML_EVENT_MAP()

[!if AUTOMATION || CREATABLE]

BEGIN_DISPATCH_MAP([!output CLASS_NAME], CDHtmlDialog)
END_DISPATCH_MAP()

// Примечание: мы добавили поддержку для IID_I[!output CLASS_NAME_ROOT], чтобы обеспечить безопасную с точки зрения типов привязку
//  из VBA.  Этот IID должен соответствовать GUID, связанному с
//  disp-интерфейсом в файле .IDL.

// {[!output DISPIID_REGISTRY_FORMAT]}
static const IID IID_I[!output CLASS_NAME_ROOT] =
[!output DISPIID_STATIC_CONST_GUID_FORMAT];

BEGIN_INTERFACE_MAP([!output CLASS_NAME], CDHtmlDialog)
	INTERFACE_PART([!output CLASS_NAME], IID_I[!output CLASS_NAME_ROOT], Dispatch)
END_INTERFACE_MAP()
[!endif]
[!if CREATABLE]

// {[!output CLSID_REGISTRY_FORMAT]}
IMPLEMENT_OLECREATE([!output CLASS_NAME], "[!output TYPEID]", [!output CLSID_IMPLEMENT_OLECREATE_FORMAT])
[!endif]


// обработчики сообщений [!output CLASS_NAME]

HRESULT [!output CLASS_NAME]::OnButtonOK(IHTMLElement* /*pElement*/)
{
	OnOK();
	return S_OK;
}

HRESULT [!output CLASS_NAME]::OnButtonCancel(IHTMLElement* /*pElement*/)
{
	OnCancel();
	return S_OK;
}
