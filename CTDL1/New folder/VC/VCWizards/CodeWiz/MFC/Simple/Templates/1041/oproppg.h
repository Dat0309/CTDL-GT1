#pragma once

#ifdef _WIN32_WCE
#error "COlePropertyPage は Windows CE ではサポートされていません。"
#endif 

// [!output CLASS_NAME] : プロパティ ページ ダイアログ

class [!output CLASS_NAME] : public COlePropertyPage
{
	DECLARE_DYNCREATE([!output CLASS_NAME])
	DECLARE_OLECREATE_EX([!output CLASS_NAME])

// コンストラクター
public:
	[!output CLASS_NAME]();

// ダイアログ データ
	enum { IDD = [!output IDD_DIALOG] };

// 実装
protected:
	virtual void DoDataExchange(CDataExchange* pDX);        // DDX/DDV サポート

// メッセージ マップ
protected:
	DECLARE_MESSAGE_MAP()
};
