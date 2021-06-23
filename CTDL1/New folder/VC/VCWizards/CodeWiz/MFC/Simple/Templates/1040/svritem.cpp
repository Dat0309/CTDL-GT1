// [!output IMPL_FILE] : file di implementazione
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

[!if CREATABLE]
IMPLEMENT_DYNCREATE([!output CLASS_NAME], [!output BASE_CLASS])
[!else]
IMPLEMENT_DYNAMIC([!output CLASS_NAME], [!output BASE_CLASS])
[!endif]

[!output CLASS_NAME]::[!output CLASS_NAME](COleServerDoc* pServerDoc, BOOL bAutoDelete)
		: COleServerItem( pServerDoc, bAutoDelete)
{
[!if AUTOMATION || CREATABLE]
	EnableAutomation();
[!endif]
[!if CREATABLE]
	
	// Per tenere in esecuzione l'applicazione finch� rimane attivo un 
	//	oggetto di automazione OLE, il costruttore chiama AfxOleLockApp.
	
	AfxOleLockApp();
[!endif]
}

[!output CLASS_NAME]::~[!output CLASS_NAME]()
{
[!if CREATABLE]
	// Per terminare l'applicazione dopo che sono stati creati tutti gli oggetti
	// 	tramite l'automazione OLE, il distruttore chiama AfxOleUnlockApp.
	
	AfxOleUnlockApp();
[!endif]
}
[!if AUTOMATION || CREATABLE]

void [!output CLASS_NAME]::OnFinalRelease()
{
	// Quando viene rilasciato l'ultimo riferimento a un  oggetto di automazione,
	// viene chiamato OnFinalRelease.  La classe base eliminer�
	// automaticamente l'oggetto.  Eseguire le operazioni di pulizia necessarie per
	// l'oggetto prima di chiamare la classe base.

	[!output BASE_CLASS]::OnFinalRelease();
}
[!endif]

BOOL [!output CLASS_NAME]::OnDraw(CDC* pDC, CSize& rSize)
{
	// Chiamato dal framework per eseguire il rendering dell'elemento OLE in un metafile.
	// La rappresentazione del metafile dell'elemento OLE viene utilizzata per visualizzare 
	// l'elemento dell'applicazione contenitore. Se l'applicazione contenitore � stata
	// scritta con la libreria MFC, il metafile verr� 
	// utilizzato dalla funzione membro Draw dell'oggetto COleClientItem corrispondente.
	// Non esiste un'implementazione predefinita. Occorre eseguire l'override di questa funzione per disegnare
	// l'elemento nel contesto di dispositivo specificato. 
	ASSERT(FALSE);			// rimuoverlo dopo il completamento del TODO
	return TRUE;
}

BEGIN_MESSAGE_MAP([!output CLASS_NAME], [!output BASE_CLASS])
END_MESSAGE_MAP()
[!if AUTOMATION || CREATABLE]

BEGIN_DISPATCH_MAP([!output CLASS_NAME], [!output BASE_CLASS])
END_DISPATCH_MAP()

// Nota: viene aggiunto il supporto per IID_I[!output CLASS_NAME_ROOT] in modo da supportare l'associazione indipendente dai tipi
//  da VBA.  Questo IID deve corrispondere al GUID connesso 
//  all'interfaccia dispatch contenuta nel file IDL.

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


// diagnostica di [!output CLASS_NAME]

#ifdef _DEBUG
void [!output CLASS_NAME]::AssertValid() const
{
	[!output BASE_CLASS]::AssertValid();
}

#ifndef _WIN32_WCE
void [!output CLASS_NAME]::Dump(CDumpContext& dc) const
{
	[!output BASE_CLASS]::Dump(dc);
}
#endif
#endif //_DEBUG


// serializzazione di [!output CLASS_NAME]

#ifndef _WIN32_WCE
void [!output CLASS_NAME]::Serialize(CArchive& ar)
{
	if (ar.IsStoring())
	{
		// TODO: aggiungere qui il codice di archiviazione
	}
	else
	{
		// TODO: aggiungere qui il codice di caricamento
	}
}
#endif

// comandi [!output CLASS_NAME]
