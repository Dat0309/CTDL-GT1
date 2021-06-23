#pragma once

#ifdef _WIN32_WCE
#error "Windows CE 不支持 COlePropertyPage。"
#endif 

// [!output CLASS_NAME] : 属性页对话框

class [!output CLASS_NAME] : public COlePropertyPage
{
	DECLARE_DYNCREATE([!output CLASS_NAME])
	DECLARE_OLECREATE_EX([!output CLASS_NAME])

// 构造函数
public:
	[!output CLASS_NAME]();

// 对话框数据
	enum { IDD = [!output IDD_DIALOG] };

// 实现
protected:
	virtual void DoDataExchange(CDataExchange* pDX);        // DDX/DDV 支持

// 消息映射
protected:
	DECLARE_MESSAGE_MAP()
};
