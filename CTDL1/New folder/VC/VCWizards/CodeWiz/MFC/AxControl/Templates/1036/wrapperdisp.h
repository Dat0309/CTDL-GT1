// [!output HEADER_FILE]  : déclaration des classes wrapper de contrôle ActiveX créées par Microsoft Visual C++

#pragma once

/////////////////////////////////////////////////////////////////////////////
// [!output CLASS_NAME]

class [!output CLASS_NAME] : public COleDispatchDriver
{
public:
	[!output CLASS_NAME]() {}		// Appelle le constructeur par défaut COleDispatchDriver
	[!output CLASS_NAME](LPDISPATCH pDispatch) : COleDispatchDriver(pDispatch) {}
	[!output CLASS_NAME](const [!output CLASS_NAME]& dispatchSrc) : COleDispatchDriver(dispatchSrc) {}

// Attributs
public:

// Opérations
public:

[!output CLASS_TEXT]

};
