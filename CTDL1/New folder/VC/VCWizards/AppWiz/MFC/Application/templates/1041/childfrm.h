[!if RIBBON_TOOLBAR]
// この MFC サンプル ソース コードでは、MFC Microsoft Office Fluent ユーザー インターフェイス 
// ("Fluent UI") の使用方法を示します。このコードは、MFC C++ ライブラリ ソフトウェアに 
// 同梱されている Microsoft Foundation Class リファレンスおよび関連電子ドキュメントを
// 補完するための参考資料として提供されます。
// Fluent UI を複製、使用、または配布するためのライセンス条項は個別に用意されています。
// Fluent UI ライセンス プログラムの詳細については、Web サイト
// http://go.microsoft.com/fwlink/?LinkId=238214 を参照してください。
//
// Copyright (C) Microsoft Corporation
// All rights reserved.
[!endif]

// [!output CHILD_FRAME_HEADER] : [!output CHILD_FRAME_CLASS] クラスのインターフェイス
//

#pragma once
[!if PROJECT_STYLE_EXPLORER]
class [!output VIEW_CLASS];
[!endif]
[!if !DOCVIEW]
#include "[!output WND_VIEW_HEADER]"
[!endif]

class [!output CHILD_FRAME_CLASS] : public [!output CHILD_FRAME_BASE_CLASS]
{
	DECLARE_DYNCREATE([!output CHILD_FRAME_CLASS])
public:
	[!output CHILD_FRAME_CLASS]();

// 属性
[!if APP_TYPE_MDI && SPLITTER || PROJECT_STYLE_EXPLORER]
protected:
[!if APP_TYPE_TABBED_MDI]
	CSplitterWndEx m_wndSplitter;
[!else]
	CSplitterWnd m_wndSplitter;
[!endif]
[!endif]
public:

// 操作
public:

// オーバーライド
[!if APP_TYPE_MDI && SPLITTER]
	public:
[!endif]
[!if PROJECT_STYLE_EXPLORER || !CHILD_FRAME_DEFAULT_STYLES || !DOCVIEW]
	public:
[!endif]
[!if APP_TYPE_MDI && SPLITTER]
	virtual BOOL OnCreateClient(LPCREATESTRUCT lpcs, CCreateContext* pContext);
[!else]
[!if PROJECT_STYLE_EXPLORER]
	virtual BOOL OnCreateClient(LPCREATESTRUCT lpcs, CCreateContext* pContext);
[!endif]
[!endif]
	virtual BOOL PreCreateWindow(CREATESTRUCT& cs);
[!if !DOCVIEW]
	virtual BOOL OnCmdMsg(UINT nID, int nCode, void* pExtra, AFX_CMDHANDLERINFO* pHandlerInfo);
[!endif]

// 実装
public:
[!if !DOCVIEW]
	// フレームのクライアント領域用のビュー
	[!output WND_VIEW_CLASS] m_wndView;
[!endif]
	virtual ~[!output CHILD_FRAME_CLASS]();
#ifdef _DEBUG
	virtual void AssertValid() const;
	virtual void Dump(CDumpContext& dc) const;
#endif

[!if PROJECT_STYLE_EXPLORER]
protected:
	[!output VIEW_CLASS]* GetRightPane();
[!endif]
// 生成された、メッセージ割り当て関数
protected:
[!if !DOCVIEW]
	afx_msg void OnFileClose();
	afx_msg void OnSetFocus(CWnd* pOldWnd);
	afx_msg int OnCreate(LPCREATESTRUCT lpCreateStruct);
[!endif]
[!if PROJECT_STYLE_EXPLORER]
[!if LIST_VIEW]
	afx_msg void OnUpdateViewStyles(CCmdUI* pCmdUI);
	afx_msg void OnViewStyle(UINT nCommandID);
[!endif]
[!endif]
[!if PRINTING]
[!if RIBBON_TOOLBAR]
	afx_msg void OnFilePrint();
	afx_msg void OnFilePrintPreview();
	afx_msg void OnUpdateFilePrintPreview(CCmdUI* pCmdUI);
[!endif]
[!endif]
	DECLARE_MESSAGE_MAP()
};
