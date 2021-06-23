// [!output IMPL_FILE]: Implementierungsdatei
//

#include "stdafx.h"
[!if PROJECT_NAME_HEADER]
#include "[!output PROJECT_NAME].h"
[!endif]
#include "[!output HEADER_FILE]"
[!if !MERGE_FILE]

#ifdef _DEBUG
#define new DEBUG_NEW
#endif
[!endif]


// [!output CLASS_NAME]

IMPLEMENT_DYNCREATE([!output CLASS_NAME], [!output BASE_CLASS])

[!output CLASS_NAME]::[!output CLASS_NAME]()
{
[!if ACCESSIBILITY]
#ifndef _WIN32_WCE
	EnableActiveAccessibility();
#endif
[!endif]

[!if AUTOMATION || CREATABLE]
	EnableAutomation();
[!endif]
[!if CREATABLE]
	
	// Um die Ausführung der Anwendung fortzusetzen, solange ein OLE-Automatisierungsobjekt
	//	aktiv ist, ruft der Konstruktor AfxOleLockApp auf.
	
	AfxOleLockApp();
[!endif]
}

[!output CLASS_NAME]::~[!output CLASS_NAME]()
{
[!if CREATABLE]
	// Um die Anwendung abzubrechen, wenn alle Objekte
	// 	mit OLE-Automatisierung erstellt wurden, ruft der Destruktor AfxOleUnlockApp auf.
	
	AfxOleUnlockApp();
[!endif]
}
[!if AUTOMATION || CREATABLE]

void [!output CLASS_NAME]::OnFinalRelease()
{
	// Wenn der letzte Verweis auf ein Automatisierungsobjekt freigegeben wird,
	// wird OnFinalRelease aufgerufen.  Die Basisklasse löscht das Objekt
	// automatisch.  Fügen Sie zusätzlichen Bereinigungscode für Ihr Objekt
	// hinzu, bevor Sie die Basisklasse aufrufen.

	[!output BASE_CLASS]::OnFinalRelease();
}
[!endif]


BEGIN_MESSAGE_MAP([!output CLASS_NAME], [!output BASE_CLASS])
END_MESSAGE_MAP()
[!if AUTOMATION || CREATABLE]

BEGIN_DISPATCH_MAP([!output CLASS_NAME], [!output BASE_CLASS])
END_DISPATCH_MAP()

// Hinweis: Wir stellen Unterstützung für IID_I[!output CLASS_NAME_ROOT] zur Verfügung, um typsicheres Binden 
//  von VBA zu unterstützen.  Diese IID muss mit der GUID übereinstimmen, die bei der 
//  Disp-Schnittstelle in der .IDL-Datei angegeben ist.

// {[!output DISPIID_REGISTRY_FORMAT]}
static const IID IID_I[!output CLASS_NAME_ROOT] =
[!output DISPIID_STATIC_CONST_GUID_FORMAT];

BEGIN_INTERFACE_MAP([!output CLASS_NAME], [!output BASE_CLASS])
	INTERFACE_PART([!output CLASS_NAME], IID_I[!output CLASS_NAME_ROOT], Dispatch)
END_INTERFACE_MAP()
[!endif]
[!if CREATABLE]

// {[!output CLSID_REGISTRY_FORMAT]}
IMPLEMENT_OLECREATE([!output CLASS_NAME], "[!output TYPEID]", [!output CLSID_IMPLEMENT_OLECREATE_FORMAT])
[!endif]


// [!output CLASS_NAME]-Meldungshandler
