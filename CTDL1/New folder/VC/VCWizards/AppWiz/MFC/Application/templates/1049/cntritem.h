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

// [!output CONTAINER_ITEM_HEADER] : интерфейс класса [!output CONTAINER_ITEM_CLASS]
//

#pragma once

class [!output DOC_CLASS];
class [!output VIEW_CLASS];

class [!output CONTAINER_ITEM_CLASS] : public [!output CONTAINER_ITEM_BASE_CLASS]
{
	DECLARE_SERIAL([!output CONTAINER_ITEM_CLASS])

// Конструкторы
public:
[!if RICH_EDIT_VIEW]
	[!output CONTAINER_ITEM_CLASS](REOBJECT* preo = NULL, [!output DOC_CLASS]* pContainer = NULL);
[!else]
	[!output CONTAINER_ITEM_CLASS]([!output DOC_CLASS]* pContainer = NULL);
[!endif]
		// Примечание. pContainer может иметь значение NULL для разрешения IMPLEMENT_SERIALIZE
		//  IMPLEMENT_SERIALIZE требует наличия у класса конструктора с
		//  нулевым аргументами.  Обычно элементы OLE создаются с
		//  указателями на документ, не равными NULL

// Атрибуты
public:
	[!output DOC_CLASS]* GetDocument()
		{ return reinterpret_cast<[!output DOC_CLASS]*>([!output CONTAINER_ITEM_BASE_CLASS]::GetDocument()); }
	[!output VIEW_CLASS]* GetActiveView()
		{ return reinterpret_cast<[!output VIEW_CLASS]*>([!output CONTAINER_ITEM_BASE_CLASS]::GetActiveView()); }
[!if !RICH_EDIT_VIEW]

public:
	virtual void OnChange(OLE_NOTIFICATION wNotification, DWORD dwParam);
	virtual void OnActivate();
[!endif]
[!if !RICH_EDIT_VIEW]

protected:
[!if !ACTIVE_DOC_CONTAINER]
	virtual void OnGetItemPosition(CRect& rPosition);
[!endif]
	virtual void OnDeactivateUI(BOOL bUndoable);
	virtual BOOL OnChangeItemPosition(const CRect& rectPos);
	virtual BOOL OnShowControlBars(CFrameWnd* pFrameWnd, BOOL bShow);
[!if CONTAINER_SERVER]
	virtual BOOL CanActivate();
[!endif]
[!endif]

// Реализация
public:
	~[!output CONTAINER_ITEM_CLASS]();
#ifdef _DEBUG
	virtual void AssertValid() const;
	virtual void Dump(CDumpContext& dc) const;
#endif
[!if !RICH_EDIT_VIEW]
	virtual void Serialize(CArchive& ar);
[!endif]
};

