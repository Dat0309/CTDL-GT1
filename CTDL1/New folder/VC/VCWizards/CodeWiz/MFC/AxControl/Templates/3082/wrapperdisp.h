// [!output HEADER_FILE]: declaración de las clases contenedoras del control ActiveX creadas por Microsoft Visual C++

#pragma once

/////////////////////////////////////////////////////////////////////////////
// [!output CLASS_NAME]

class [!output CLASS_NAME] : public COleDispatchDriver
{
public:
	[!output CLASS_NAME]() {}		// Llama al constructor COleDispatchDriver predeterminado
	[!output CLASS_NAME](LPDISPATCH pDispatch) : COleDispatchDriver(pDispatch) {}
	[!output CLASS_NAME](const [!output CLASS_NAME]& dispatchSrc) : COleDispatchDriver(dispatchSrc) {}

// Atributos
public:

// Operaciones
public:

[!output CLASS_TEXT]

};
