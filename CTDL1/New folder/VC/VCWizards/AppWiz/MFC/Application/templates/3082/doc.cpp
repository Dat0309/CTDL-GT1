[!if RIBBON_TOOLBAR]
// Este código fuente de ejemplos de MFC muestra el uso de la interfaz de usuario Microsoft Office Fluent para MFC 
// ("interfaz de usuario Fluent") y solamente se proporciona como material de referencia para complementar la 
// documentación de referencia de Microsoft Foundation Classes y la documentación electrónica relacionada 
// incluida con el software de la biblioteca de C++ de MFC.  
// Los términos de licencia para copiar, usar o distribuir la interfaz de usuario Fluent están disponibles por separado.  
// Para obtener más información acerca del programa de licencia de la interfaz de usuario Fluent, visite 
// http://go.microsoft.com/fwlink/?LinkId=238214.
//
// (C) Microsoft Corporation
// Reservados todos los derechos.
[!endif]

// [!output DOC_IMPL]: implementación de la clase [!output DOC_CLASS]
//

#include "stdafx.h"
// Se pueden definir SHARED_HANDLERS en un proyecto ATL implementando controladores de vista previa, miniatura
// y filtro de búsqueda, y permiten compartir código de documentos con ese proyecto.
#ifndef SHARED_HANDLERS
#include "[!output APP_HEADER]"
#endif

[!if OLEDB_RECORD_VIEW || ODBC_RECORD_VIEW]
#include "[!output ROWSET_HEADER]"
[!endif]
#include "[!output DOC_HEADER]"
[!if CONTAINER || CONTAINER_SERVER]
#include "[!output CONTAINER_ITEM_HEADER]"
[!endif]
[!if MINI_SERVER || FULL_SERVER || CONTAINER_SERVER]
#include "[!output SERVER_ITEM_HEADER]"
[!endif]

#include <propkey.h>

#ifdef _DEBUG
#define new DEBUG_NEW
#endif

// [!output DOC_CLASS]

IMPLEMENT_DYNCREATE([!output DOC_CLASS], [!output DOC_BASE_CLASS])

BEGIN_MESSAGE_MAP([!output DOC_CLASS], [!output DOC_BASE_CLASS])
[!if CONTAINER || CONTAINER_SERVER]
	// Habilitar la implementación del contenedor OLE predeterminado
[!if !RICH_EDIT_VIEW]
	ON_UPDATE_COMMAND_UI(ID_EDIT_PASTE, &[!output DOC_BASE_CLASS]::OnUpdatePasteMenu)
	ON_UPDATE_COMMAND_UI(ID_EDIT_PASTE_LINK, &[!output DOC_BASE_CLASS]::OnUpdatePasteLinkMenu)
	ON_UPDATE_COMMAND_UI(ID_OLE_EDIT_CONVERT, &[!output DOC_BASE_CLASS]::OnUpdateObjectVerbMenu)
	ON_COMMAND(ID_OLE_EDIT_CONVERT, &[!output DOC_BASE_CLASS]::OnEditConvert)
[!endif]
	ON_UPDATE_COMMAND_UI(ID_OLE_EDIT_LINKS, &[!output DOC_BASE_CLASS]::OnUpdateEditLinksMenu)
	ON_UPDATE_COMMAND_UI(ID_OLE_VERB_POPUP, &[!output DOC_CLASS]::OnUpdateObjectVerbPopup)
	ON_COMMAND(ID_OLE_EDIT_LINKS, &[!output DOC_BASE_CLASS]::OnEditLinks)
	ON_UPDATE_COMMAND_UI_RANGE(ID_OLE_VERB_FIRST, ID_OLE_VERB_LAST, &[!output DOC_BASE_CLASS]::OnUpdateObjectVerbMenu)
[!endif]
[!if MAPI]
	ON_COMMAND(ID_FILE_SEND_MAIL, &[!output DOC_CLASS]::OnFileSendMail)
	ON_UPDATE_COMMAND_UI(ID_FILE_SEND_MAIL, &[!output DOC_CLASS]::OnUpdateFileSendMail)
[!endif]
END_MESSAGE_MAP()

[!if AUTOMATION]
BEGIN_DISPATCH_MAP([!output DOC_CLASS], [!output DOC_BASE_CLASS])
END_DISPATCH_MAP()

// Nota: se agrega compatibilidad para IID_I[!output SAFE_PROJECT_IDENTIFIER_NAME] para admitir enlaces con seguridad de tipos
//  desde VBA. IID debe coincidir con el id. GUID adjuntado a 
//  la interfaz dispinterface del archivo .IDL.

// {[!output DISPIID_REGISTRY_FORMAT]}
static const IID IID_I[!output SAFE_PROJECT_IDENTIFIER_NAME] =
[!output DISPIID_STATIC_CONST_GUID_FORMAT];

BEGIN_INTERFACE_MAP([!output DOC_CLASS], [!output DOC_BASE_CLASS])
	INTERFACE_PART([!output DOC_CLASS], IID_I[!output SAFE_PROJECT_IDENTIFIER_NAME], Dispatch)
END_INTERFACE_MAP()

[!endif]

// Construcción o destrucción de [!output DOC_CLASS]

[!output DOC_CLASS]::[!output DOC_CLASS]()
{
[!if SUPPORT_COMPOUND_FILES && !COMPOUND_DOC_NONE]
	// Usar archivos compuestos OLE
	EnableCompoundFile();

[!endif]
	// TODO: agregar aquí el código de construcción único

[!if AUTOMATION]
	EnableAutomation();

	AfxOleLockApp();
[!endif]
}

[!output DOC_CLASS]::~[!output DOC_CLASS]()
{
[!if AUTOMATION]
	AfxOleUnlockApp();
[!endif]
}

BOOL [!output DOC_CLASS]::OnNewDocument()
{
	if (![!output DOC_BASE_CLASS]::OnNewDocument())
		return FALSE;
[!if APP_TYPE_SDI]
[!if EDIT_VIEW]
	if (!m_viewList.IsEmpty())
	{
[!if PROJECT_STYLE_EXPLORER]
		POSITION pos = GetFirstViewPosition();
		GetNextView(pos);  // omitir la vista de árbol
		reinterpret_cast<CEditView*>(GetNextView(pos))->SetWindowText(NULL);
[!else]
		reinterpret_cast<CEditView*>(m_viewList.GetHead())->SetWindowText(NULL);
[!endif]
	}
[!endif]
[!endif]

	// TODO: agregar aquí código de reinicio
	// (los documentos SDI volverán a utilizar este documento)

	return TRUE;
}
[!if RICH_EDIT_VIEW]

[!output CONTAINER_ITEM_BASE_CLASS]* [!output DOC_CLASS]::CreateClientItem(REOBJECT* preo) const
{
	return new [!output CONTAINER_ITEM_CLASS](preo, const_cast<[!output DOC_CLASS]*>(this));
}
[!endif]
[!if MINI_SERVER || FULL_SERVER || CONTAINER_SERVER]


// Implementación de servidor [!output DOC_CLASS]

COleServerItem* [!output DOC_CLASS]::OnGetEmbeddedItem()
{
	// El marco de trabajo llama a OnGetEmbeddedItem para obtener el elemento COleServerItem
	//  asociado con el documento.  Esta llamada sólo se realiza cuando es necesario.

	[!output SERVER_ITEM_CLASS]* pItem = new [!output SERVER_ITEM_CLASS](this);
	ASSERT_VALID(pItem);
	return pItem;
}
[!endif]
[!if ACTIVE_DOC_SERVER]


// Implementación de servidor de documento activo de [!output DOC_CLASS]

CDocObjectServer *[!output DOC_CLASS]::GetDocObjectServer(LPOLEDOCUMENTSITE pDocSite)
{
	return new CDocObjectServer(this, pDocSite);
}
[!endif]


[!if !DB_VIEW_NO_FILE && !HTML_EDITVIEW]


// Serialización de [!output DOC_CLASS]

void [!output DOC_CLASS]::Serialize(CArchive& ar)
{
[!if EDIT_VIEW]
	// CEditView contiene un control de edición que controla toda la serialización
	if (!m_viewList.IsEmpty())
	{
[!if PROJECT_STYLE_EXPLORER]
		POSITION pos = GetFirstViewPosition();
		GetNextView(pos);  // omitir la vista de árbol
		reinterpret_cast<CEditView*>(GetNextView(pos))->SerializeRaw(ar);
[!else]
		reinterpret_cast<CEditView*>(m_viewList.GetHead())->SerializeRaw(ar);
[!endif]
	}
#ifdef SHARED_HANDLERS

	if (m_viewList.IsEmpty() && ar.IsLoading())
	{
		CFile* pFile = ar.GetFile();
		pFile->Seek(0, FILE_BEGIN);
		ULONGLONG nFileSizeBytes = pFile->GetLength();
		ULONGLONG nFileSizeChars = nFileSizeBytes/sizeof(TCHAR);
		LPTSTR lpszText = (LPTSTR)malloc(((size_t)nFileSizeChars + 1) * sizeof(TCHAR));
		if (lpszText != NULL)
		{
			ar.Read(lpszText, (UINT)nFileSizeBytes);
			lpszText[nFileSizeChars] = '\0';
			m_strThumbnailContent = lpszText;
			m_strSearchContent = lpszText;
		}
	}
#endif
[!else]
	if (ar.IsStoring())
	{
		// TODO: agregar aquí el código de almacenamiento
	}
	else
	{
		// TODO: agregar aquí el código de carga
	}
[!if CONTAINER || CONTAINER_SERVER]

	// La llamada a la clase base [!output DOC_BASE_CLASS] habilita la serialización
	//  de los objetos COleClientItem del documento contenedor.
[!if RICH_EDIT_VIEW]
	// TODO: establecer CRichEditDoc::m_bRTF = FALSE si serializa como texto
[!endif] 
	[!output DOC_BASE_CLASS]::Serialize(ar);
[!if ACTIVE_DOC_CONTAINER]
	// Activar el primero
	if (!ar.IsStoring())
	{
		POSITION posItem = GetStartPosition();
		if (posItem != NULL)
		{
			CDocItem* pItem = GetNextItem(posItem);
			POSITION posView = GetFirstViewPosition();
			COleDocObjectItem *pDocObjectItem = DYNAMIC_DOWNCAST(COleDocObjectItem, pItem);
			if (posView != NULL && pDocObjectItem != NULL)
			{
				CView* pView = GetNextView(posView);
				pDocObjectItem->DoVerb(OLEIVERB_SHOW, pView);
			}
		}
	}
[!endif]
[!endif]
[!endif]
}
[!endif]

#ifdef SHARED_HANDLERS

// Compatibilidad con miniaturas
void [!output DOC_CLASS]::OnDrawThumbnail(CDC& dc, LPRECT lprcBounds)
{
	// Modifique este código para dibujar los datos del documento
	dc.FillSolidRect(lprcBounds, RGB(255, 255, 255));

[!if !EDIT_VIEW]
	CString strText = _T("TODO: implement thumbnail drawing here");
[!endif]
	LOGFONT lf;

	CFont* pDefaultGUIFont = CFont::FromHandle((HFONT) GetStockObject(DEFAULT_GUI_FONT));
	pDefaultGUIFont->GetLogFont(&lf);
	lf.lfHeight = 36;

	CFont fontDraw;
	fontDraw.CreateFontIndirect(&lf);

	CFont* pOldFont = dc.SelectObject(&fontDraw);
[!if !EDIT_VIEW]
	dc.DrawText(strText, lprcBounds, DT_CENTER | DT_WORDBREAK);
[!else]
	dc.DrawText(m_strThumbnailContent, lprcBounds, DT_CENTER | DT_WORDBREAK);
[!endif]
	dc.SelectObject(pOldFont);
}

// Compatibilidad con controladores de búsqueda
void [!output DOC_CLASS]::InitializeSearchContent()
{
[!if !EDIT_VIEW]
	CString strSearchContent;
[!endif]
	// Establezca contenido de búsqueda a partir de los datos del documento. 
	// Las partes de contenido deben ir separadas por ";"
[!if !EDIT_VIEW]

	// Por ejemplo:  strSearchContent = _T("point;rectangle;circle;ole object;");
	SetSearchContent(strSearchContent);
[!else]

	// Usar todo el contenido del archivo de texto como contenido de búsqueda.
	SetSearchContent(m_strSearchContent);
[!endif]
}

void [!output DOC_CLASS]::SetSearchContent(const CString& value)
{
	if (value.IsEmpty())
	{
		RemoveChunk(PKEY_Search_Contents.fmtid, PKEY_Search_Contents.pid);
	}
	else
	{
		CMFCFilterChunkValueImpl *pChunk = NULL;
		ATLTRY(pChunk = new CMFCFilterChunkValueImpl);
		if (pChunk != NULL)
		{
			pChunk->SetTextValue(PKEY_Search_Contents, value, CHUNK_TEXT);
			SetChunkValue(pChunk);
		}
	}
}

#endif // SHARED_HANDLERS

// Diagnósticos de [!output DOC_CLASS]

#ifdef _DEBUG
void [!output DOC_CLASS]::AssertValid() const
{
	[!output DOC_BASE_CLASS]::AssertValid();
}

void [!output DOC_CLASS]::Dump(CDumpContext& dc) const
{
	[!output DOC_BASE_CLASS]::Dump(dc);
}
#endif //_DEBUG


// Comandos de [!output DOC_CLASS]
