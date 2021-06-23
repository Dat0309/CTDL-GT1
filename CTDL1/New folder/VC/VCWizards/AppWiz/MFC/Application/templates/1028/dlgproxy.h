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

// [!output DIALOG_AUTO_PROXY_HEADER]: 標頭檔
//

#pragma once

class [!output DIALOG_CLASS];


// [!output DIALOG_AUTO_PROXY_CLASS] 命令目標

class [!output DIALOG_AUTO_PROXY_CLASS] : public [!output DIALOG_AUTO_PROXY_BASE_CLASS]
{
	DECLARE_DYNCREATE([!output DIALOG_AUTO_PROXY_CLASS])

	[!output DIALOG_AUTO_PROXY_CLASS]();           // 動態建立所使用的保護建構函式

// 屬性
public:
	[!output DIALOG_CLASS]* m_pDialog;

// 作業
public:

// 覆寫
	public:
	virtual void OnFinalRelease();

// 程式碼實作
protected:
	virtual ~[!output DIALOG_AUTO_PROXY_CLASS]();

	// 產生的訊息對應函式

	DECLARE_MESSAGE_MAP()
	DECLARE_OLECREATE([!output DIALOG_AUTO_PROXY_CLASS])

	// 產生的 OLE 分派對應函式

	DECLARE_DISPATCH_MAP()
	DECLARE_INTERFACE_MAP()
};

