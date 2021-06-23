// [!output HEADER_FILE] : 由 Microsoft Visual C++ 创建的 ActiveX 控件包装器类的声明

#pragma once

/////////////////////////////////////////////////////////////////////////////
// [!output CLASS_NAME]

class [!output CLASS_NAME] : public COleDispatchDriver
{
public:
	[!output CLASS_NAME]() {}		// 调用 COleDispatchDriver 默认构造函数
	[!output CLASS_NAME](LPDISPATCH pDispatch) : COleDispatchDriver(pDispatch) {}
	[!output CLASS_NAME](const [!output CLASS_NAME]& dispatchSrc) : COleDispatchDriver(dispatchSrc) {}

// 特性
public:

// 操作
public:

[!output CLASS_TEXT]

};
