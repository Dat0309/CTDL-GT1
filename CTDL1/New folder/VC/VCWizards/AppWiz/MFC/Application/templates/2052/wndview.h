[!if RIBBON_TOOLBAR]
// 这段 MFC 示例源代码演示如何使用 MFC Microsoft Office Fluent 用户界面 
// (“Fluent UI”)。该示例仅供参考，
// 用以补充《Microsoft 基础类参考》和 
// MFC C++ 库软件随附的相关电子文档。  
// 复制、使用或分发 Fluent UI 的许可条款是单独提供的。  
// 若要了解有关 Fluent UI 许可计划的详细信息，请访问  
// http://go.microsoft.com/fwlink/?LinkId=238214。
//
// 版权所有(C) Microsoft Corporation
// 保留所有权利。
[!endif]

// [!output WND_VIEW_HEADER] : [!output WND_VIEW_CLASS] 类的接口
//


#pragma once


// [!output WND_VIEW_CLASS] 窗口

class [!output WND_VIEW_CLASS] : public [!output WND_VIEW_BASE_CLASS]
{
// 构造
public:
	[!output WND_VIEW_CLASS]();

// 特性
public:

// 操作
public:

// 重写
	protected:
	virtual BOOL PreCreateWindow(CREATESTRUCT& cs);

// 实现
public:
	virtual ~[!output WND_VIEW_CLASS]();

	// 生成的消息映射函数
protected:
	afx_msg void OnPaint();
	DECLARE_MESSAGE_MAP()
};

