// [!output HEADER_FILE]  : 以 Microsoft Visual C++ 建立之 ActiveX 控制項包裝函式類別的宣告

#pragma once

/////////////////////////////////////////////////////////////////////////////
// [!output CLASS_NAME]

class [!output CLASS_NAME] : public COleDispatchDriver
{
public:
	[!output CLASS_NAME]() {}		// 呼叫 COleDispatchDriver 預設建構函式
	[!output CLASS_NAME](LPDISPATCH pDispatch) : COleDispatchDriver(pDispatch) {}
	[!output CLASS_NAME](const [!output CLASS_NAME]& dispatchSrc) : COleDispatchDriver(dispatchSrc) {}

// 屬性
public:

// 作業
public:

[!output CLASS_TEXT]

};
