#pragma once

// [!output PROPERTY_PAGE_HEADER] : [!output PROPERTY_PAGE_CLASS] 属性页类的声明。


// [!output PROPERTY_PAGE_CLASS] : 有关实现的信息，请参阅 [!output PROPERTY_PAGE_IMPL]。

class [!output PROPERTY_PAGE_CLASS] : public COlePropertyPage
{
	DECLARE_DYNCREATE([!output PROPERTY_PAGE_CLASS])
	DECLARE_OLECREATE_EX([!output PROPERTY_PAGE_CLASS])

// 构造函数
public:
	[!output PROPERTY_PAGE_CLASS]();

// 对话框数据
	enum { IDD = IDD_PROPPAGE_[!output UPPER_CASE_SAFE_PROJECT_IDENTIFIER_NAME] };

// 实现
protected:
	virtual void DoDataExchange(CDataExchange* pDX);    // DDX/DDV 支持

// 消息映射
protected:
	DECLARE_MESSAGE_MAP()
};

