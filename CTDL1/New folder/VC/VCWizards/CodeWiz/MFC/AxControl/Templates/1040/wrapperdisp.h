// [!output HEADER_FILE]  : dichiarazione di classi wrapper di controlli ActiveX create da Microsoft Visual C++

#pragma once

/////////////////////////////////////////////////////////////////////////////
// [!output CLASS_NAME]

class [!output CLASS_NAME] : public COleDispatchDriver
{
public:
	[!output CLASS_NAME]() {}		// Chiama il costruttore predefinito COleDispatchDriver
	[!output CLASS_NAME](LPDISPATCH pDispatch) : COleDispatchDriver(pDispatch) {}
	[!output CLASS_NAME](const [!output CLASS_NAME]& dispatchSrc) : COleDispatchDriver(dispatchSrc) {}

// Attributi
public:

// Operazioni
public:

[!output CLASS_TEXT]

};
