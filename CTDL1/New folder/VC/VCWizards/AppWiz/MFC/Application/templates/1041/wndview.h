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

// [!output WND_VIEW_HEADER] : [!output WND_VIEW_CLASS] クラスのインターフェイス
//


#pragma once


// [!output WND_VIEW_CLASS] ウィンドウ

class [!output WND_VIEW_CLASS] : public [!output WND_VIEW_BASE_CLASS]
{
// コンストラクション
public:
	[!output WND_VIEW_CLASS]();

// 属性
public:

// 操作
public:

// オーバーライド
	protected:
	virtual BOOL PreCreateWindow(CREATESTRUCT& cs);

// 実装
public:
	virtual ~[!output WND_VIEW_CLASS]();

	// 生成された、メッセージ割り当て関数
protected:
	afx_msg void OnPaint();
	DECLARE_MESSAGE_MAP()
};

