[!if RIBBON_TOOLBAR]
// 这段 MFC 示例源代码演示如何使用 MFC Microsoft Office Fluent 用户界面 
// (“Fluent UI”)。该示例仅供参考，
// 用以补充《Microsoft 基础类参考》和 
// MFC C++ 库软件随附的相关电子文档。  
// 复制、使用或分发 Fluent UI 的许可条款是单独提供的。  
// 若要了解有关 Fluent UI 许可计划的详细信息，请访问  
// http://go.microsoft.com/fwlink/?LinkId=238214。
//
// 版权所有(C) Microsoft Corporation
// 保留所有权利。
[!endif]

// [!output DOC_HEADER] : [!output DOC_CLASS] 类的接口
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
protected: // 仅从序列化创建
	[!output DOC_CLASS]();
	DECLARE_DYNCREATE([!output DOC_CLASS])

// 特性
public:
[!if MINI_SERVER || FULL_SERVER || CONTAINER_SERVER]
	[!output SERVER_ITEM_CLASS]* GetEmbeddedItem()
		{ return reinterpret_cast<[!output SERVER_ITEM_CLASS]*>([!output DOC_BASE_CLASS]::GetEmbeddedItem()); }
[!endif]
[!if OLEDB_RECORD_VIEW || ODBC_RECORD_VIEW]
	[!output ROWSET_CLASS] [!output ROWSET_CLASS_VARIABLE_NAME];
[!endif]

// 操作
public:

// 重写
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

// 实现
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

// 生成的消息映射函数
protected:
	DECLARE_MESSAGE_MAP()
[!if AUTOMATION]

	// 生成的 OLE 调度映射函数

	DECLARE_DISPATCH_MAP()
	DECLARE_INTERFACE_MAP()
[!endif]

#ifdef SHARED_HANDLERS
	// 用于为搜索处理程序设置搜索内容的 Helper 函数
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
