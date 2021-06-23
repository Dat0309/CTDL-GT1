
#pragma once

[!if COLECLIENTITEM || CDOCOBJECTSERVER || CDOCOBJECTSERVERITEM]
#ifdef _WIN32_WCE
#error "Windows CE 不支持 [!output BASE_CLASS]。"
#endif 
[!endif]

// [!output CLASS_NAME] 命令目标

class [!output CLASS_NAME] : public [!output BASE_CLASS]
{
[!if CREATABLE]
	DECLARE_DYNCREATE([!output CLASS_NAME])
[!else]
	DECLARE_DYNAMIC([!output CLASS_NAME])
[!endif]

public:
[!if COLECLIENTITEM]
	[!output CLASS_NAME](COleDocument* pContainerDoc = NULL);
[!else]
[!if CDOCOBJECTSERVER]
	[!output CLASS_NAME](COleServerDoc* pOwner, LPOLEDOCUMENTSITE pDocSite = NULL);
[!else]
[!if CDOCOBJECTSERVERITEM]
	[!output CLASS_NAME](COleServerDoc* pServerDoc, BOOL bAutoDelete);
[!else]
	[!output CLASS_NAME]();
[!endif]
[!endif]
[!endif]
	virtual ~[!output CLASS_NAME]();
[!if AUTOMATION || CREATABLE]

	virtual void OnFinalRelease();
[!endif]

protected:
	DECLARE_MESSAGE_MAP()
[!if CREATABLE]
	DECLARE_OLECREATE([!output CLASS_NAME])
[!endif]
[!if AUTOMATION || CREATABLE]
	DECLARE_DISPATCH_MAP()
	DECLARE_INTERFACE_MAP()
[!endif]
};


