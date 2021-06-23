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

// [!output SERVER_ITEM_HEADER] : интерфейс класса [!output SERVER_ITEM_CLASS]
//

#pragma once

class [!output SERVER_ITEM_CLASS] : public [!output SERVER_ITEM_BASE_CLASS]
{
	DECLARE_DYNAMIC([!output SERVER_ITEM_CLASS])

// Конструкторы
public:
	[!output SERVER_ITEM_CLASS]([!output DOC_CLASS]* pContainerDoc);

// Атрибуты
	[!output DOC_CLASS]* GetDocument() const
		{ return reinterpret_cast<[!output DOC_CLASS]*>([!output SERVER_ITEM_BASE_CLASS]::GetDocument()); }

// Переопределение
	public:
	virtual BOOL OnDraw(CDC* pDC, CSize& rSize);
	virtual BOOL OnGetExtent(DVASPECT dwDrawAspect, CSize& rSize);

// Реализация
public:
	~[!output SERVER_ITEM_CLASS]();
#ifdef _DEBUG
	virtual void AssertValid() const;
	virtual void Dump(CDumpContext& dc) const;
#endif

protected:
	virtual void Serialize(CArchive& ar);   // перезапись для входа/выхода документа
};

