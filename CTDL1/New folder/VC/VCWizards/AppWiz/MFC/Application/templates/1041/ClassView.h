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

#pragma once

#include "ViewTree.h"

class CClassToolBar : public CMFCToolBar
{
	virtual void OnUpdateCmdUI(CFrameWnd* /*pTarget*/, BOOL bDisableIfNoHndler)
	{
		CMFCToolBar::OnUpdateCmdUI((CFrameWnd*) GetOwner(), bDisableIfNoHndler);
	}

	virtual BOOL AllowShowOnList() const { return FALSE; }
};

class CClassView : public CDockablePane
{
public:
	CClassView();
	virtual ~CClassView();

	void AdjustLayout();
	void OnChangeVisualStyle();

protected:
	CClassToolBar m_wndToolBar;
	CViewTree m_wndClassView;
	CImageList m_ClassViewImages;
	UINT m_nCurrSort;

	void FillClassView();

// オーバーライド
public:
	virtual BOOL PreTranslateMessage(MSG* pMsg);

protected:
	afx_msg int OnCreate(LPCREATESTRUCT lpCreateStruct);
	afx_msg void OnSize(UINT nType, int cx, int cy);
	afx_msg void OnContextMenu(CWnd* pWnd, CPoint point);
	afx_msg void OnClassAddMemberFunction();
	afx_msg void OnClassAddMemberVariable();
	afx_msg void OnClassDefinition();
	afx_msg void OnClassProperties();
	afx_msg void OnNewFolder();
	afx_msg void OnPaint();
	afx_msg void OnSetFocus(CWnd* pOldWnd);
	afx_msg LRESULT OnChangeActiveTab(WPARAM, LPARAM);
	afx_msg void OnSort(UINT id);
	afx_msg void OnUpdateSort(CCmdUI* pCmdUI);

	DECLARE_MESSAGE_MAP()
};

