// [!output HEADER_FILE]: объявление классов оболочки для элементов управления ActiveX, созданных при помощи Microsoft Visual C++

#pragma once

/////////////////////////////////////////////////////////////////////////////
// [!output CLASS_NAME]

class [!output CLASS_NAME] : public COleDispatchDriver
{
public:
	[!output CLASS_NAME]() {}		// Вызывает конструктор по умолчанию COleDispatchDriver
	[!output CLASS_NAME](LPDISPATCH pDispatch) : COleDispatchDriver(pDispatch) {}
	[!output CLASS_NAME](const [!output CLASS_NAME]& dispatchSrc) : COleDispatchDriver(dispatchSrc) {}

// Атрибуты
public:

// Операции
public:

[!output CLASS_TEXT]

};
