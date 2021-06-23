[!if RIBBON_TOOLBAR]
// 這個 MFC 範例原始程式碼會示範如何使用 MFC Microsoft Office Fluent 使用者介面
// (「Fluent UI」)，並且僅提供為參考資料，做為
// MFC 參考及 MFC C++ 程式庫軟體
// 隨附相關電子文件的補充。
// 關於 Fluent UI 之複製、使用或散發的授權條款則分別提供。
// 如需 Fluent UI 授權計劃的詳細資訊，請造訪 
// http://go.microsoft.com/fwlink/?LinkId=238214。
//
// Copyright (C) Microsoft Corporation
// 著作權所有，並保留一切權利。
[!endif]

// [!output DOC_HEADER] : [!output DOC_CLASS] 類別的介面
//


#pragma once
[!if OLEDB_RECORD_VIEW || ODBC_RECORD_VIEW]
#include "[!output ROWSET_HEADER]"
[!endif]

[!if MINI_SERVER || FULL_SERVER || CONTAINER_SERVER]

class [!output SERVER_ITEM_CLASS];
[!endif]

class [!output DOC_CLASS] : public [!output DOC_BASE_CLASS]
{
protected: // 僅從序列化建立
	[!output DOC_CLASS]();
	DECLARE_DYNCREATE([!output DOC_CLASS])

// 屬性
public:
[!if MINI_SERVER || FULL_SERVER || CONTAINER_SERVER]
	[!output SERVER_ITEM_CLASS]* GetEmbeddedItem()
		{ return reinterpret_cast<[!output SERVER_ITEM_CLASS]*>([!output DOC_BASE_CLASS]::GetEmbeddedItem()); }
[!endif]
[!if OLEDB_RECORD_VIEW || ODBC_RECORD_VIEW]
	[!output ROWSET_CLASS] [!output ROWSET_CLASS_VARIABLE_NAME];
[!endif]

// 作業
public:

// 覆寫
[!if MINI_SERVER || FULL_SERVER || CONTAINER_SERVER]
protected:
	virtual COleServerItem* OnGetEmbeddedItem();
[!endif]
public:
	virtual BOOL OnNewDocument();
[!if !DB_VIEW_NO_FILE && !HTML_EDITVIEW]
	virtual void Serialize(CArchive& ar);
[!endif]
[!if RICH_EDIT_VIEW]
	virtual [!output CONTAINER_ITEM_BASE_CLASS]* CreateClientItem(REOBJECT* preo) const;
[!endif]
#ifdef SHARED_HANDLERS
	virtual void InitializeSearchContent();
	virtual void OnDrawThumbnail(CDC& dc, LPRECT lprcBounds);
#endif // SHARED_HANDLERS

// 程式碼實作
public:
	virtual ~[!output DOC_CLASS]();
#ifdef _DEBUG
	virtual void AssertValid() const;
	virtual void Dump(CDumpContext& dc) const;
#endif

protected:
[!if ACTIVE_DOC_SERVER]
	virtual CDocObjectServer* GetDocObjectServer(LPOLEDOCUMENTSITE pDocSite);
[!endif]

// 產生的訊息對應函式
protected:
	DECLARE_MESSAGE_MAP()
[!if AUTOMATION]

	// 產生的 OLE 分派對應函式

	DECLARE_DISPATCH_MAP()
	DECLARE_INTERFACE_MAP()
[!endif]

#ifdef SHARED_HANDLERS
	// 為搜尋處理常式設定搜尋內容的 Helper 函式
	void SetSearchContent(const CString& value);
#endif // SHARED_HANDLERS
[!if EDIT_VIEW]

#ifdef SHARED_HANDLERS
private:
	CString m_strSearchContent;
	CString m_strThumbnailContent;
#endif // SHARED_HANDLERS
[!endif]
};
