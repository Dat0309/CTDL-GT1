// [!output HEADER_FILE]  : Microsoft Visual C++로 만든 ActiveX 컨트롤 래퍼 클래스의 선언입니다.

#pragma once

/////////////////////////////////////////////////////////////////////////////
// [!output CLASS_NAME]

class [!output CLASS_NAME] : public COleDispatchDriver
{
public:
	[!output CLASS_NAME]() {}		// COleDispatchDriver 기본 생성자를 호출합니다.
	[!output CLASS_NAME](LPDISPATCH pDispatch) : COleDispatchDriver(pDispatch) {}
	[!output CLASS_NAME](const [!output CLASS_NAME]& dispatchSrc) : COleDispatchDriver(dispatchSrc) {}

// 특성입니다.
public:

// 작업입니다.
public:

[!output CLASS_TEXT]

};
