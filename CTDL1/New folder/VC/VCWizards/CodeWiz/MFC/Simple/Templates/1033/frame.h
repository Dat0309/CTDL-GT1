#pragma once


// [!output CLASS_NAME] frame

class [!output CLASS_NAME] : public [!output BASE_CLASS]
{
	DECLARE_DYNCREATE([!output CLASS_NAME])
protected:
	[!output CLASS_NAME]();           // protected constructor used by dynamic creation
	virtual ~[!output CLASS_NAME]();
[!if AUTOMATION || CREATABLE]

public:
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


