#pragma once

// Microsoft Visual C++ で作成されたウィザード生成の IDispatch ラッパー クラスです。
//
// COleFont ラッパー クラス

class COleFont : public COleDispatchDriver
{
public:
	COleFont() {}		// COleDispatchDriver の既定のコンストラクターを呼び出します。
	COleFont(LPDISPATCH pDispatch) : COleDispatchDriver(pDispatch) {}
	COleFont(const COleFont& dispatchSrc) : COleDispatchDriver(dispatchSrc) {}

	CString GetName()
	{
		CString result;
		GetProperty(0x0, VT_BSTR, (void*)&result);
		return result;
	}

	void SetName(LPCTSTR propVal)
	{
		SetProperty(0x0, VT_BSTR, propVal);
	}

	CY GetSize()
	{
		CY result;
		GetProperty(0x2, VT_CY, (void*)&result);
		return result;
	}

	void SetSize(const CY& propVal)
	{
		SetProperty(0x2, VT_CY, &propVal);
	}

	BOOL GetBold()
	{
		BOOL result;
		GetProperty(0x3, VT_BOOL, (void*)&result);
		return result;
	}

	void SetBold(BOOL propVal)
	{
		SetProperty(0x3, VT_BOOL, propVal);
	}

	BOOL GetItalic()
	{
		BOOL result;
		GetProperty(0x4, VT_BOOL, (void*)&result);
		return result;
	}

	void SetItalic(BOOL propVal)
	{
		SetProperty(0x4, VT_BOOL, propVal);
	}

	BOOL GetUnderline()
	{
		BOOL result;
		GetProperty(0x5, VT_BOOL, (void*)&result);
		return result;
	}

	void SetUnderline(BOOL propVal)
	{
		SetProperty(0x5, VT_BOOL, propVal);
	}

	BOOL GetStrikethrough()
	{
		BOOL result;
		GetProperty(0x6, VT_BOOL, (void*)&result);
		return result;
	}

	void SetStrikethrough(BOOL propVal)
	{
		SetProperty(0x6, VT_BOOL, propVal);
	}

	short GetWeight()
	{
		short result;
		GetProperty(0x7, VT_I2, (void*)&result);
		return result;
	}

	void SetWeight(short propVal)
	{
		SetProperty(0x7, VT_I2, propVal);
	}

	short GetCharset()
	{
		short result;
		GetProperty(0x8, VT_I2, (void*)&result);
		return result;
	}

	void SetCharset(short propVal)
	{
		SetProperty(0x8, VT_I2, propVal);
	}
};
