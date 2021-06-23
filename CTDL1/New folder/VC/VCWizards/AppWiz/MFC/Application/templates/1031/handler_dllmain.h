// dllmain.h : Deklaration der Modulklasse.

class [!output SAFE_ATL_MODULE_NAME] : public ATL::CAtlDllModuleT< [!output SAFE_ATL_MODULE_NAME] >
{
public :
	DECLARE_LIBID(LIBID_[!output LIB_NAME]Lib)
	DECLARE_REGISTRY_APPID_RESOURCEID(IDR_[!output UPPER_CASE_SAFE_PROJECT_IDENTIFIER_NAME], "{[!output APPID_REGISTRY_FORMAT]}")
};

extern class [!output SAFE_ATL_MODULE_NAME] _AtlModule;
