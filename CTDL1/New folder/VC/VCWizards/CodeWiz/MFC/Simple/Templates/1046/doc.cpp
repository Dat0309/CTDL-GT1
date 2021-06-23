// [!output IMPL_FILE] : arquivo de implementa��o
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
[!if AUTOMATION || CREATABLE]
	EnableAutomation();
[!endif]
[!if CREATABLE]
	
	// Para manter a aplica��o rodando desde que um objeto de automa��o OLE 
	//	esteja ativo, o construtor chama AfxOleLockApp.
	
	AfxOleLockApp();
[!endif]
}

BOOL [!output CLASS_NAME]::OnNewDocument()
{
	if (![!output BASE_CLASS]::OnNewDocument())
		return FALSE;
	return TRUE;
}

[!output CLASS_NAME]::~[!output CLASS_NAME]()
{
[!if CREATABLE]
	// Para terminar a aplica��o quando todos os objetos foram criados
	// 	com automa��o OLE, o destrutor chama AfxOleUnlockApp.
	
	AfxOleUnlockApp();
[!endif]
}
[!if AUTOMATION || CREATABLE]

void [!output CLASS_NAME]::OnFinalRelease()
{
	// Quando a �ltima refer�ncia para um objeto de automa��o � liberada
	// chama-se OnFinalRelease.  A classe base automaticamente
	// deletar� o objeto.  Adicione limpezas adicionais requeridas pelo seu
	// objeto antes de chamar a classe base.

	[!output BASE_CLASS]::OnFinalRelease();
}
[!endif]
[!if COLESERVERDOC]

#ifndef _WIN32_WCE
COleServerItem* [!output CLASS_NAME]::OnGetEmbeddedItem()
{
	// OnGetEmbeddedItem � chamado pelo framework para obter o COleServerItem
	//  que � associado ao documento.  Ele s� � chamado quando necess�rio.

	// Ao inv�s de retornar NULL, retorna um ponteiro para um novo objeto de classe derivada de COleServerItem
	//  que � utilizado em conjun��o com este documento, ent�o
	//  remove o ASSERT(FALSE) abaixo.
	//  (i.e., retorna novo CMyServerItem.)
	ASSERT(FALSE);			// remover isso ap�s completar o TODO
	return NULL;
}
#endif
[!endif]


BEGIN_MESSAGE_MAP([!output CLASS_NAME], [!output BASE_CLASS])
END_MESSAGE_MAP()
[!if AUTOMATION || CREATABLE]

BEGIN_DISPATCH_MAP([!output CLASS_NAME], [!output BASE_CLASS])
END_DISPATCH_MAP()

// Note: n�s adicionamos suporte � IID_I[!output CLASS_NAME_ROOT] para suportar associa��o com seguran�a de tipos
//  com VBA.  Esta IID deve ser compat�vel com o GUID que � anexado ao 
//  dispinterface no arquivo .IDL.

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


// Diagn�sticos de [!output CLASS_NAME]

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

#ifndef _WIN32_WCE
// Serializa��o de [!output CLASS_NAME]

void [!output CLASS_NAME]::Serialize(CArchive& ar)
{
	if (ar.IsStoring())
	{
		// TODO: adicione c�digo de armazenamento aqui
	}
	else
	{
		// TODO: adicione c�digo de carregamento aqui
	}
}
#endif


// Comandos de [!output CLASS_NAME]
