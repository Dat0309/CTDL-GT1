// [!output HEADER_FILE]  : declara��o de classe(s) wrapper do Controle ActiveX criada(s) pelo Microsoft Visual C++

#pragma once

/////////////////////////////////////////////////////////////////////////////
// [!output CLASS_NAME]

class [!output CLASS_NAME] : public COleDispatchDriver
{
public:
	[!output CLASS_NAME]() {}		// Chama construtor padr�o COleDispatchDriver
	[!output CLASS_NAME](LPDISPATCH pDispatch) : COleDispatchDriver(pDispatch) {}
	[!output CLASS_NAME](const [!output CLASS_NAME]& dispatchSrc) : COleDispatchDriver(dispatchSrc) {}

// Atributos
public:

// Opera��es
public:

[!output CLASS_TEXT]

};
