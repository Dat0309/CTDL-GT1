// [!output IMPL_FILE] : arquivo de implementação
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
	
	// Para manter a aplicação rodando desde que um objeto de automação OLE 
	//	esteja ativo, o construtor chama AfxOleLockApp.
	
	AfxOleLockApp();
[!endif]
}

[!output CLASS_NAME]::~[!output CLASS_NAME]()
{
[!if CREATABLE]
	// Para terminar a aplicação quando todos os objetos foram criados
	// 	com automação OLE, o destrutor chama AfxOleUnlockApp.
	
	AfxOleUnlockApp();
[!endif]
}
[!if AUTOMATION || CREATABLE]

void [!output CLASS_NAME]::OnFinalRelease()
{
	// Quando a última referência para um objeto de automação é liberada
	// chama-se OnFinalRelease.  A classe base automaticamente
	// deletará o objeto.  Adicione limpezas adicionais requeridas pelo seu
	// objeto antes de chamar a classe base.

	[!output BASE_CLASS]::OnFinalRelease();
}
[!endif]

BOOL [!output CLASS_NAME]::OnDraw(CDC* pDC, CSize& rSize)
{
	// Chamado pelo framework para renderizar um item OLE em um meta-arquivo.
	// A representação meta-arquivo do item OLE é utilizada para apresentar o 
	// item na aplicação contêiner. Se a aplicação contêiner foi 
	// escrita utilizando a Biblioteca de Classes Microsoft Foundation, o meta-arquivo é 
	// utilizado pela função membro Draw do objeto COleClientItem correspondente.
	// Não há implementação padrão. Você deve substituir esta função para desenhar
	// o item no contexto de dispositivo especificado. 
	ASSERT(FALSE);			// remover isso após completar o TODO
	return TRUE;
}

BEGIN_MESSAGE_MAP([!output CLASS_NAME], [!output BASE_CLASS])
END_MESSAGE_MAP()
[!if AUTOMATION || CREATABLE]

BEGIN_DISPATCH_MAP([!output CLASS_NAME], [!output BASE_CLASS])
END_DISPATCH_MAP()

// Note: nós adicionamos suporte à IID_I[!output CLASS_NAME_ROOT] para suportar associação com segurança de tipos
//  com VBA.  Esta IID deve ser compatível com o GUID que é anexado ao 
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


// Diagnósticos de [!output CLASS_NAME]

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


// Serialização de [!output CLASS_NAME]

#ifndef _WIN32_WCE
void [!output CLASS_NAME]::Serialize(CArchive& ar)
{
	if (ar.IsStoring())
	{
		// TODO: adicione código de armazenamento aqui
	}
	else
	{
		// TODO: adicione código de carregamento aqui
	}
}
#endif

// Comandos de [!output CLASS_NAME]
