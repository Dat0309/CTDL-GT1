#pragma once

// [!output PROPERTY_PAGE_HEADER] : [!output PROPERTY_PAGE_CLASS] プロパティ ページ クラスの宣言です。


// [!output PROPERTY_PAGE_CLASS] : 実装に関しては [!output PROPERTY_PAGE_IMPL] を参照してください。

class [!output PROPERTY_PAGE_CLASS] : public COlePropertyPage
{
	DECLARE_DYNCREATE([!output PROPERTY_PAGE_CLASS])
	DECLARE_OLECREATE_EX([!output PROPERTY_PAGE_CLASS])

// コンストラクター
public:
	[!output PROPERTY_PAGE_CLASS]();

// ダイアログ データ
	enum { IDD = IDD_PROPPAGE_[!output UPPER_CASE_SAFE_PROJECT_IDENTIFIER_NAME] };

// 実装
protected:
	virtual void DoDataExchange(CDataExchange* pDX);    // DDX/DDV サポート

// メッセージ マップ
protected:
	DECLARE_MESSAGE_MAP()
};

