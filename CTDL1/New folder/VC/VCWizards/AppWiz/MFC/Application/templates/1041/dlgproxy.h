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

// [!output DIALOG_AUTO_PROXY_HEADER]: ヘッダー ファイル
//

#pragma once

class [!output DIALOG_CLASS];


// [!output DIALOG_AUTO_PROXY_CLASS] コマンド ターゲット

class [!output DIALOG_AUTO_PROXY_CLASS] : public [!output DIALOG_AUTO_PROXY_BASE_CLASS]
{
	DECLARE_DYNCREATE([!output DIALOG_AUTO_PROXY_CLASS])

	[!output DIALOG_AUTO_PROXY_CLASS]();           // 動的生成で使用される protected コンストラクター

// 属性
public:
	[!output DIALOG_CLASS]* m_pDialog;

// 操作
public:

// オーバーライド
	public:
	virtual void OnFinalRelease();

// 実装
protected:
	virtual ~[!output DIALOG_AUTO_PROXY_CLASS]();

	// 生成された、メッセージ割り当て関数

	DECLARE_MESSAGE_MAP()
	DECLARE_OLECREATE([!output DIALOG_AUTO_PROXY_CLASS])

	// 生成された OLE ディスパッチ割り当て関数

	DECLARE_DISPATCH_MAP()
	DECLARE_INTERFACE_MAP()
};

