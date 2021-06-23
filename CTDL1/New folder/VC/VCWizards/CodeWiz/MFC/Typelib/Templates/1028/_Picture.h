#pragma once

// 由 Microsoft Visual C++ 精靈產生的 IDispatch 包裝函式類別
//
// CPicture 包裝函式類別

class CPicture : public COleDispatchDriver
{
public:
	CPicture() {}		// 呼叫 COleDispatchDriver 預設建構函式
	CPicture(LPDISPATCH pDispatch) : COleDispatchDriver(pDispatch) {}
	CPicture(const CPicture& dispatchSrc) : COleDispatchDriver(dispatchSrc) {}

	long GetHandle()
	{
		long result;
		GetProperty(0x0, VT_I4, (void*)&result);
		return result;
	}

	long GetHPal()
	{
		long result;
		GetProperty(0x2, VT_I4, (void*)&result);
		return result;
	}

	void SetHPal(long propVal)
	{
		SetProperty(0x2, VT_I4, propVal);
	}

	short GetType()
	{
		short result;
		GetProperty(0x3, VT_I2, (void*)&result);
		return result;
	}

	long GetWidth()
	{
		long result;
		GetProperty(0x4, VT_I4, (void*)&result);
		return result;
	}

	long GetHeight()
	{
		long result;
		GetProperty(0x5, VT_I4, (void*)&result);
		return result;
	}
};
