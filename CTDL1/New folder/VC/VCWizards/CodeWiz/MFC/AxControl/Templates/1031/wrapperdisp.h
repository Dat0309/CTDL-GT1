// [!output HEADER_FILE]: Deklaration der mit Microsoft Visual C++ für das ActiveX-Steuerelement erstellten Wrapperklassen

#pragma once

/////////////////////////////////////////////////////////////////////////////
// [!output CLASS_NAME]

class [!output CLASS_NAME] : public COleDispatchDriver
{
public:
	[!output CLASS_NAME]() {}		// Ruft den COleDispatchDriver-Standardkonstruktor auf
	[!output CLASS_NAME](LPDISPATCH pDispatch) : COleDispatchDriver(pDispatch) {}
	[!output CLASS_NAME](const [!output CLASS_NAME]& dispatchSrc) : COleDispatchDriver(dispatchSrc) {}

// Attribute
public:

// Operationen
public:

[!output CLASS_TEXT]

};
