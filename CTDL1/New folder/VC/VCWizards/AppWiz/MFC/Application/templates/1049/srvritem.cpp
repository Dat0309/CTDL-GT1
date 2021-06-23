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

// [!output SERVER_ITEM_IMPL] : реализация класса [!output SERVER_ITEM_CLASS]
//

#include "stdafx.h"
#include "[!output APP_HEADER]"

#include "[!output DOC_HEADER]"
#include "[!output SERVER_ITEM_HEADER]"
[!if CONTAINER_SERVER]
#include "[!output CONTAINER_ITEM_HEADER]"
[!endif]

#ifdef _DEBUG
#define new DEBUG_NEW
#endif


// реализация [!output SERVER_ITEM_CLASS]

IMPLEMENT_DYNAMIC([!output SERVER_ITEM_CLASS], [!output SERVER_ITEM_BASE_CLASS])

[!output SERVER_ITEM_CLASS]::[!output SERVER_ITEM_CLASS]([!output DOC_CLASS]* pContainerDoc)
	: [!output SERVER_ITEM_BASE_CLASS](pContainerDoc, TRUE)
{
	// TODO: добавьте код для одноразового вызова конструктора
	//  (например, добавление дополнительных форматов для буфера обмена в источнике данных элемента)
}

[!output SERVER_ITEM_CLASS]::~[!output SERVER_ITEM_CLASS]()
{
	// TODO: добавьте код очистки
}

void [!output SERVER_ITEM_CLASS]::Serialize(CArchive& ar)
{
	// [!output SERVER_ITEM_CLASS]::Serialize вызывается рабочей средой, если
	//  элемент копируется в буфер обмена.  Это может произойти автоматически
	//  посредством обратного вызова OLE OnGetClipboardData.  Для внедренного элемента
	//  по умолчанию рекомендуется просто делегировать в функцию Serialize
	//  документа.  В случае поддержки ссылок возможно потребуется сериализовать
	//  отдельную часть документа.

	if (!IsLinkedItem())
	{
		[!output DOC_CLASS]* pDoc = GetDocument();
		ASSERT_VALID(pDoc);
		if (pDoc)
			pDoc->Serialize(ar);
	}
}

BOOL [!output SERVER_ITEM_CLASS]::OnGetExtent(DVASPECT dwDrawAspect, CSize& rSize)
{
	// Большинство приложений, например такие как это, обрабатывают только отрисовку элементов содержимого
	//  элемента.  Для поддержки других элементов, например
	//  DVASPECT_THUMBNAIL (путем перезаписи OnDrawEx) эта
	//  реализация OnGetExtent должна быть изменена на обработку
	//  дополнительных элементов.

	if (dwDrawAspect != DVASPECT_CONTENT)
		return [!output SERVER_ITEM_BASE_CLASS]::OnGetExtent(dwDrawAspect, rSize);

	// [!output SERVER_ITEM_CLASS]::OnGetExtent вызывается для получения величины в
	//  единицах HIMETRIC целого элемента.  В реализации по умолчанию
	//  просто возвращается количество единиц.

	// TODO: замените этот случайный размер

	rSize = CSize(3000, 3000);   // 3000 x 3000 HIMETRIC единиц

	return TRUE;
}

BOOL [!output SERVER_ITEM_CLASS]::OnDraw(CDC* pDC, CSize& rSize)
{
	if (!pDC)
		return FALSE;

	// Удалите этот код, если вы используете rSize
	UNREFERENCED_PARAMETER(rSize);

	// TODO: задайте режим отображения и величину
	//  (Величина обычно совпадает с размером, возвращенным из OnGetExtent)
	pDC->SetMapMode(MM_ANISOTROPIC);
	pDC->SetWindowOrg(0,0);
	pDC->SetWindowExt(3000, 3000);

	// TODO: добавьте код отрисовки.  Кроме того, заполните величину HIMETRIC.
	//  Все рисунки производятся в контексте устройства метафайла (pDC).

[!if CONTAINER_SERVER]
	// TODO: также нарисуйте внедренные объекты [!output CONTAINER_ITEM_CLASS].

[!endif]
[!if CONTAINER_SERVER]
	// Следующий код нарисует первый элемент в случайном положении.

	// TODO: удалите этот код после завершения вашего кода рисования

	[!output DOC_CLASS]* pDoc = GetDocument();
	ASSERT_VALID(pDoc);
	if (!pDoc)
		return FALSE;

	POSITION pos = pDoc->GetStartPosition();
	[!output CONTAINER_ITEM_CLASS]* pItem = DYNAMIC_DOWNCAST([!output CONTAINER_ITEM_CLASS], pDoc->GetNextClientItem(pos));
	if (pItem != NULL)
		pItem->Draw(pDC, CRect(10, 10, 1010, 1010));
[!endif]
	return TRUE;
}


// диагностика [!output SERVER_ITEM_CLASS]

#ifdef _DEBUG
void [!output SERVER_ITEM_CLASS]::AssertValid() const
{
	[!output SERVER_ITEM_BASE_CLASS]::AssertValid();
}

void [!output SERVER_ITEM_CLASS]::Dump(CDumpContext& dc) const
{
	[!output SERVER_ITEM_BASE_CLASS]::Dump(dc);
}
#endif

