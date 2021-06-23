#pragma once

// [!output PROPERTY_PAGE_HEADER] : [!output PROPERTY_PAGE_CLASS] 屬性頁類別的宣告。


// [!output PROPERTY_PAGE_CLASS] : 請參閱 [!output PROPERTY_PAGE_IMPL] 的實作。

class [!output PROPERTY_PAGE_CLASS] : public COlePropertyPage
{
	DECLARE_DYNCREATE([!output PROPERTY_PAGE_CLASS])
	DECLARE_OLECREATE_EX([!output PROPERTY_PAGE_CLASS])

// 建構函式
public:
	[!output PROPERTY_PAGE_CLASS]();

// 對話方塊資料
	enum { IDD = IDD_PROPPAGE_[!output UPPER_CASE_SAFE_PROJECT_IDENTIFIER_NAME] };

// 程式碼實作
protected:
	virtual void DoDataExchange(CDataExchange* pDX);    // DDX/DDV 支援

// 訊息對應
protected:
	DECLARE_MESSAGE_MAP()
};

