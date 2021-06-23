#pragma once

#ifdef _WIN32_WCE
#error "Windows CE 不支援 COlePropertyPage。"
#endif 

// [!output CLASS_NAME] : 屬性頁對話方塊

class [!output CLASS_NAME] : public COlePropertyPage
{
	DECLARE_DYNCREATE([!output CLASS_NAME])
	DECLARE_OLECREATE_EX([!output CLASS_NAME])

// 建構函式
public:
	[!output CLASS_NAME]();

// 對話方塊資料
	enum { IDD = [!output IDD_DIALOG] };

// 程式碼實作
protected:
	virtual void DoDataExchange(CDataExchange* pDX);        // DDX/DDV 支援

// 訊息對應
protected:
	DECLARE_MESSAGE_MAP()
};
