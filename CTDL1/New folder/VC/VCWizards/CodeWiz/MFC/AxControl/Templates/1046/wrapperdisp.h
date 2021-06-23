// [!output HEADER_FILE]  : declaração de classe(s) wrapper do Controle ActiveX criada(s) pelo Microsoft Visual C++

#pragma once

/////////////////////////////////////////////////////////////////////////////
// [!output CLASS_NAME]

class [!output CLASS_NAME] : public COleDispatchDriver
{
public:
	[!output CLASS_NAME]() {}		// Chama construtor padrão COleDispatchDriver
	[!output CLASS_NAME](LPDISPATCH pDispatch) : COleDispatchDriver(pDispatch) {}
	[!output CLASS_NAME](const [!output CLASS_NAME]& dispatchSrc) : COleDispatchDriver(dispatchSrc) {}

// Atributos
public:

// Operações
public:

[!output CLASS_TEXT]

};
