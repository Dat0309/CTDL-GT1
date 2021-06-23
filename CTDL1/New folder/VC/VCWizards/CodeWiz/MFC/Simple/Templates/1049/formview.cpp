// [!output IMPL_FILE]: файл реализации
//

#include "stdafx.h"
[!if PROJECT_NAME_HEADER]
#include "[!output PROJECT_NAME].h"
[!else]
#include "resource.h"
[!endif]
#include "[!output HEADER_FILE]"
[!if !MERGE_FILE]

#ifdef _DEBUG
#define new DEBUG_NEW
#endif
[!endif]


// [!output CLASS_NAME]

IMPLEMENT_DYNCREATE([!output CLASS_NAME], CFormView)

[!output CLASS_NAME]::[!output CLASS_NAME]()
	: CFormView([!output CLASS_NAME]::IDD)
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

	CFormView::OnFinalRelease();
}
[!endif]

void [!output CLASS_NAME]::DoDataExchange(CDataExchange* pDX)
{
	CFormView::DoDataExchange(pDX);
}

BEGIN_MESSAGE_MAP([!output CLASS_NAME], CFormView)
END_MESSAGE_MAP()
[!if AUTOMATION || CREATABLE]

BEGIN_DISPATCH_MAP([!output CLASS_NAME], CFormView)
END_DISPATCH_MAP()

// Примечание: мы добавили поддержку для IID_I[!output CLASS_NAME_ROOT], чтобы обеспечить безопасную с точки зрения типов привязку
//  из VBA.  Этот IID должен соответствовать GUID, связанному с 
//  disp-интерфейсом в файле .IDL.

// {[!output DISPIID_REGISTRY_FORMAT]}
static const IID IID_I[!output CLASS_NAME_ROOT] =
[!output DISPIID_STATIC_CONST_GUID_FORMAT];

BEGIN_INTERFACE_MAP([!output CLASS_NAME], CFormView)
	INTERFACE_PART([!output CLASS_NAME], IID_I[!output CLASS_NAME_ROOT], Dispatch)
END_INTERFACE_MAP()
[!endif]
[!if CREATABLE]

// {[!output CLSID_REGISTRY_FORMAT]}
IMPLEMENT_OLECREATE([!output CLASS_NAME], "[!output TYPEID]", [!output CLSID_IMPLEMENT_OLECREATE_FORMAT])
[!endif]


// диагностика [!output CLASS_NAME]

#ifdef _DEBUG
void [!output CLASS_NAME]::AssertValid() const
{
	CFormView::AssertValid();
}

#ifndef _WIN32_WCE
void [!output CLASS_NAME]::Dump(CDumpContext& dc) const
{
	CFormView::Dump(dc);
}
#endif
#endif //_DEBUG


// обработчики сообщений [!output CLASS_NAME]
