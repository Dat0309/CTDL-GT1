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

// [!output WND_VIEW_HEADER] : [!output WND_VIEW_CLASS] 類別的介面
//


#pragma once


// [!output WND_VIEW_CLASS] 視窗

class [!output WND_VIEW_CLASS] : public [!output WND_VIEW_BASE_CLASS]
{
// 建構
public:
	[!output WND_VIEW_CLASS]();

// 屬性
public:

// 作業
public:

// 覆寫
	protected:
	virtual BOOL PreCreateWindow(CREATESTRUCT& cs);

// 程式碼實作
public:
	virtual ~[!output WND_VIEW_CLASS]();

	// 產生的訊息對應函式
protected:
	afx_msg void OnPaint();
	DECLARE_MESSAGE_MAP()
};

