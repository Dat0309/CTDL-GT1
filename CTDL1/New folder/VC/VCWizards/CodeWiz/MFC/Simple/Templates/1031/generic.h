#pragma once

// [!output CLASS_NAME]-Befehlsziel

class [!output CLASS_NAME] : public [!output BASE_CLASS]
{
public:
[!if CINTERNETSESSION]
	[!output CLASS_NAME](LPCTSTR pstrAgent = NULL,
		DWORD dwContext = 1,
		DWORD dwAccessType = PRE_CONFIG_INTERNET_ACCESS,
		LPCTSTR pstrProxyName = NULL,
		LPCTSTR pstrProxyBypass = NULL,
		DWORD dwFlags = 0);
[!else]
	[!output CLASS_NAME]();
[!endif]
	virtual ~[!output CLASS_NAME]();
[!if CCONNECTIONPOINT]
	virtual REFIID GetIID();
[!endif]
};


