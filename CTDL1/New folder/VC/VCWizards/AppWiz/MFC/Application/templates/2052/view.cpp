[!if RIBBON_TOOLBAR]
// 这段 MFC 示例源代码演示如何使用 MFC Microsoft Office Fluent 用户界面 
// (“Fluent UI”)。该示例仅供参考，
// 用以补充《Microsoft 基础类参考》和 
// MFC C++ 库软件随附的相关电子文档。  
// 复制、使用或分发 Fluent UI 的许可条款是单独提供的。  
// 若要了解有关 Fluent UI 许可计划的详细信息，请访问  
// http://go.microsoft.com/fwlink/?LinkId=238214。
//
// 版权所有(C) Microsoft Corporation
// 保留所有权利。
[!endif]

// [!output VIEW_IMPL] : [!output VIEW_CLASS] 类的实现
//

#include "stdafx.h"
// SHARED_HANDLERS 可以在实现预览、缩略图和搜索筛选器句柄的
// ATL 项目中进行定义，并允许与该项目共享文档代码。
#ifndef SHARED_HANDLERS
#include "[!output APP_HEADER]"
#endif

[!if OLEDB_RECORD_VIEW || ODBC_RECORD_VIEW]
#include "[!output ROWSET_HEADER]"
[!endif]
#include "[!output DOC_HEADER]"
[!if CONTAINER || CONTAINER_SERVER]
#include "[!output CONTAINER_ITEM_HEADER]"
#include "resource.h"
[!endif]
#include "[!output VIEW_HEADER]"

#ifdef _DEBUG
#define new DEBUG_NEW
#endif


// [!output VIEW_CLASS]

IMPLEMENT_DYNCREATE([!output VIEW_CLASS], [!output VIEW_BASE_CLASS])

BEGIN_MESSAGE_MAP([!output VIEW_CLASS], [!output VIEW_BASE_CLASS])
[!if PROJECT_STYLE_EXPLORER]
[!if LIST_VIEW]
	ON_WM_STYLECHANGED()
[!endif]
[!endif]
[!if CONTAINER || CONTAINER_SERVER]
	ON_WM_DESTROY()
[!if !RICH_EDIT_VIEW]
	ON_WM_SETFOCUS()
	ON_WM_SIZE()
	ON_COMMAND(ID_OLE_INSERT_NEW, &[!output VIEW_CLASS]::OnInsertObject)
	ON_COMMAND(ID_CANCEL_EDIT_CNTR, &[!output VIEW_CLASS]::OnCancelEditCntr)
	ON_COMMAND(ID_FILE_PRINT, &[!output VIEW_CLASS]::OnFilePrint)
[!else]
[!if PRINTING]
	// 标准打印命令
	ON_COMMAND(ID_FILE_PRINT, &[!output VIEW_BASE_CLASS]::OnFilePrint)
[!endif]
[!endif]
[!else]
[!if PRINTING]
	// 标准打印命令
	ON_COMMAND(ID_FILE_PRINT, &[!output VIEW_BASE_CLASS]::OnFilePrint)
[!endif]
[!endif]
[!if MINI_SERVER || FULL_SERVER || CONTAINER_SERVER]
	ON_COMMAND(ID_CANCEL_EDIT_SRVR, &[!output VIEW_CLASS]::OnCancelEditSrvr)
[!endif]
[!if PRINTING]
[!if !HTML_VIEW && !HTML_EDITVIEW && !ACTIVE_DOC_CONTAINER]
	ON_COMMAND(ID_FILE_PRINT_DIRECT, &[!output VIEW_BASE_CLASS]::OnFilePrint)
[!if MENUBAR_TOOLBAR || RIBBON_TOOLBAR]
	ON_COMMAND(ID_FILE_PRINT_PREVIEW, &[!output VIEW_CLASS]::OnFilePrintPreview)
[!else]
	ON_COMMAND(ID_FILE_PRINT_PREVIEW, &[!output VIEW_BASE_CLASS]::OnFilePrintPreview)
[!endif]
[!endif]
[!if ACTIVE_DOC_CONTAINER]
	ON_COMMAND(ID_FILE_PRINT_DIRECT, &[!output VIEW_BASE_CLASS]::OnFilePrint)
	ON_COMMAND(ID_FILE_PRINT_PREVIEW, &[!output VIEW_CLASS]::OnFilePrintPreview)
[!if !RICH_EDIT_VIEW]
	ON_UPDATE_COMMAND_UI(ID_FILE_PRINT_PREVIEW, &OnFilePrintPreviewUIUpdate)
[!endif]
[!endif]
[!endif]
[!if MENUBAR_TOOLBAR || RIBBON_TOOLBAR]
	ON_WM_CONTEXTMENU()
	ON_WM_RBUTTONUP()
[!endif]
END_MESSAGE_MAP()

[!if HTML_EDITVIEW]
BEGIN_DHTMLEDITING_CMDMAP([!output VIEW_CLASS])
	DHTMLEDITING_CMD_ENTRY(ID_EDIT_COPY, IDM_COPY)
	DHTMLEDITING_CMD_ENTRY(ID_EDIT_CUT, IDM_CUT)
	DHTMLEDITING_CMD_ENTRY(ID_EDIT_PASTE, IDM_PASTE)
	DHTMLEDITING_CMD_ENTRY(ID_EDIT_UNDO, IDM_UNDO)
END_DHTMLEDITING_CMDMAP()
[!endif]
// [!output VIEW_CLASS] 构造/析构

[!output VIEW_CLASS]::[!output VIEW_CLASS]()
[!if FORM_VIEW || OLEDB_RECORD_VIEW || ODBC_RECORD_VIEW]
	: [!output VIEW_BASE_CLASS]([!output VIEW_CLASS]::IDD)
[!endif]
{
[!if ACCESSIBILITY]
	EnableActiveAccessibility();
[!endif]
[!if FORM_VIEW || OLEDB_RECORD_VIEW || ODBC_RECORD_VIEW]
[!if OLEDB_RECORD_VIEW || ODBC_RECORD_VIEW]
	m_pSet = NULL;
[!endif]
[!endif]
[!if CONTAINER || CONTAINER_SERVER]
[!if !RICH_EDIT_VIEW]
	m_pSelection = NULL;
[!endif]
[!endif]
	// TODO:  在此处添加构造代码

}

[!output VIEW_CLASS]::~[!output VIEW_CLASS]()
{
}
[!if FORM_VIEW || OLEDB_RECORD_VIEW || ODBC_RECORD_VIEW]

void [!output VIEW_CLASS]::DoDataExchange(CDataExchange* pDX)
{
	[!output VIEW_BASE_CLASS]::DoDataExchange(pDX);
[!if ODBC_RECORD_VIEW]
	// 可以在此处插入 DDX_Field* 函数以将控件“连接”到数据库字段，例如
	// DDX_FieldText(pDX, IDC_MYEDITBOX, m_pSet->m_szColumn1, m_pSet);
	// DDX_FieldCheck(pDX, IDC_MYCHECKBOX, m_pSet->m_bColumn2, m_pSet);
	// 有关详细信息，请参阅 MSDN 和 ODBC 示例
[!endif]
[!if OLEDB_RECORD_VIEW]
	// 可以插入 DDX_* 函数以及 SetDlgItem*/GetDlgItem* API 调用以将数据库链接到视图
	// ex. ::SetDlgItemText(m_hWnd, IDC_MYCONTROL, m_pSet->m_MyColumn);
	// 有关详细信息，请参阅 MSDN 和 OLEDB 示例
[!endif]
}
[!endif]

BOOL [!output VIEW_CLASS]::PreCreateWindow(CREATESTRUCT& cs)
{
	// TODO:  在此处通过修改
	//  CREATESTRUCT cs 来修改窗口类或样式

[!if EDIT_VIEW]
	BOOL bPreCreated = CEditView::PreCreateWindow(cs);
	cs.style &= ~(ES_AUTOHSCROLL|WS_HSCROLL);	// 启用换行

	return bPreCreated;
[!else]
	return [!output VIEW_BASE_CLASS]::PreCreateWindow(cs);
[!endif]
}
[!if !TREE_VIEW && !LIST_VIEW && !HTML_VIEW && !HTML_EDITVIEW && !RICH_EDIT_VIEW && !EDIT_VIEW && !FORM_VIEW && !OLEDB_RECORD_VIEW && !ODBC_RECORD_VIEW]

// [!output VIEW_CLASS] 绘制
[!if CONTAINER || CONTAINER_SERVER]
[!if !ACTIVE_DOC_CONTAINER]

void [!output VIEW_CLASS]::OnDraw(CDC* pDC)
{
	if (!pDC)
		return;

	[!output DOC_CLASS]* pDoc = GetDocument();
	ASSERT_VALID(pDoc);
	if (!pDoc)
		return;

	// TODO:  在此处为本机数据添加绘制代码
	// TODO:  同时绘制文档中的所有 OLE 项

	// 在任意位置绘制选定项。  一旦
	//  实现了真正的绘制代码后，应移除此代码。  此位置
	//  与 [!output CONTAINER_ITEM_CLASS] 返回的矩形完全对应，
	//  从而产生就地编辑的效果。

	// TODO:  最终绘制代码完成后移除此代码。
	if (m_pSelection != NULL)
	{
		CSize size;
		CRect rect(10, 10, 210, 210);
		
		if (m_pSelection->GetExtent(&size, m_pSelection->m_nDrawAspect))
		{
			pDC->HIMETRICtoLP(&size);
			rect.right = size.cx + 10;
			rect.bottom = size.cy + 10;
		}
		m_pSelection->Draw(pDC, rect);
	}
}
[!else]

void [!output VIEW_CLASS]::OnDraw(CDC* /*pDC*/)
{
	[!output DOC_CLASS]* pDoc = GetDocument();
	ASSERT_VALID(pDoc);
	if (!pDoc)
		return;

	// TODO:  在此处为本机数据添加绘制代码
}[!endif]
[!else]

void [!output VIEW_CLASS]::OnDraw(CDC* /*pDC*/)
{
	[!output DOC_CLASS]* pDoc = GetDocument();
	ASSERT_VALID(pDoc);
	if (!pDoc)
		return;

	// TODO:  在此处为本机数据添加绘制代码
}
[!endif]
[!endif] 
[!if PRINTING]
[!if TREE_VIEW || LIST_VIEW]


void [!output VIEW_CLASS]::OnDraw(CDC* /*pDC*/)
{
	[!output DOC_CLASS]* pDoc = GetDocument();
	ASSERT_VALID(pDoc);

	// TODO:  在此处为本机数据添加绘制代码
}

[!endif]
[!endif]
[!if SCROLL_VIEW || CONTAINER || CONTAINER_SERVER || OLEDB_RECORD_VIEW || LIST_VIEW || TREE_VIEW || FORM_VIEW || HTML_VIEW || ODBC_RECORD_VIEW]

void [!output VIEW_CLASS]::OnInitialUpdate()
{
[!if ODBC_RECORD_VIEW]
	m_pSet = &GetDocument()->[!output ROWSET_CLASS_VARIABLE_NAME];
[!endif]
[!if OLEDB_RECORD_VIEW]
	m_pSet = &GetDocument()->[!output ROWSET_CLASS_VARIABLE_NAME];
	{
		CWaitCursor wait;
		HRESULT hr = m_pSet->OpenAll();
		if (FAILED(hr))
		{
			// 未能打开记录集。  如果此记录集是
			// 一个存储过程，则确保在调用
			// OpenAll() 方法之前已正确
			// 初始化所有的输入参数。

			AfxMessageBox(_T("未能打开记录集。"), MB_OK);
			// 因为在没有打开行集的情况下试图
			// 更改当前记录将导致故障，
			// 所以禁用“下一个”和“上一个”记录命令
			m_bOnFirstRecord = TRUE;
			m_bOnLastRecord = TRUE;
		}
		if( hr == DB_S_ENDOFROWSET )
		{
			// 行集是空的(不包含任何行)
			AfxMessageBox(_T("已打开记录集，但未返回任何行。"), MB_OK);
			// 禁用“下一个”和“上一个”记录命令
			m_bOnFirstRecord = TRUE;
			m_bOnLastRecord = TRUE;
		}
	}
[!endif]
	[!output VIEW_BASE_CLASS]::OnInitialUpdate();
[!if FORM_VIEW]
[!if APP_TYPE_SDI]
	GetParentFrame()->RecalcLayout();
[!endif]
	ResizeParentToFit();
[!endif]

[!if LIST_VIEW]

	// TODO:  调用 GetListCtrl() 直接访问 ListView 的列表控件，
	//  从而可以用项填充 ListView。
[!if TREE_VIEW]

	// TODO:  调用 GetTreeCtrl() 直接访问 TreeView 的树控件，
	//  从而可以用项填充 TreeView。
[!if HTML_VIEW]
	// TODO:  此代码定位到 Web 上的一个普通站点。
	//  更改此代码可以定位到您喜欢的任何站点。
[!endif]
[!endif]
[!endif]
[!if HTML_VIEW]
	Navigate2(_T("http://www.msdn.microsoft.com/visualc/"),NULL,NULL);
[!endif]
[!if CONTAINER || CONTAINER_SERVER]
[!if !RICH_EDIT_VIEW]

	// TODO:  写入最终选择模式代码之后移除此代码
	m_pSelection = NULL;    // 初始化所选内容

[!endif]
[!if RICH_EDIT_VIEW]

	// 设置打印边距(720 缇 = 1/2 英寸)
	SetMargins(CRect(720, 720, 720, 720));
[!endif]
[!endif]
[!if SCROLL_VIEW]
	CSize sizeTotal;
	// TODO:  计算此视图的合计大小
	sizeTotal.cx = sizeTotal.cy = 100;
	SetScrollSizes(MM_TEXT, sizeTotal);
[!endif]
}
[!endif]
[!if PRINTING]


// [!output VIEW_CLASS] 打印

[!if ACTIVE_DOC_CONTAINER || MENUBAR_TOOLBAR || RIBBON_TOOLBAR]
[!if ACTIVE_DOC_CONTAINER && !RICH_EDIT_VIEW]
void [!output VIEW_CLASS]::OnFilePrintPreviewUIUpdate(CCmdUI* pCmdUI)
{
	if (!pCmdUI)
		return;

	if (m_pSelection != NULL)
	{
		DWORD dwStatus = 0;
		if (SUCCEEDED(m_pSelection->QueryCommand(OLECMDID_PRINTPREVIEW, &dwStatus)) &&
			dwStatus & OLECMDF_ENABLED)
		{
				pCmdUI->Enable(TRUE);
				return;
		}
	}
	pCmdUI->Enable(FALSE);
}
[!endif]

void [!output VIEW_CLASS]::OnFilePrintPreview()
{
[!if MENUBAR_TOOLBAR || RIBBON_TOOLBAR]
#ifndef SHARED_HANDLERS
	AFXPrintPreview(this);
#endif
[!else]
[!if !RICH_EDIT_VIEW]
	if (!m_pSelection)
		return;
	m_pSelection->ExecCommand(OLECMDID_PRINTPREVIEW);
[!else]
	[!output VIEW_BASE_CLASS]::OnFilePrintPreview();
[!endif]
[!endif]
}

[!endif]
[!if !HTML_VIEW && !HTML_EDITVIEW]
BOOL [!output VIEW_CLASS]::OnPreparePrinting(CPrintInfo* pInfo)
{
[!if EDIT_VIEW]
	// 默认 CEditView 准备
	return CEditView::OnPreparePrinting(pInfo);
[!else]
[!if ACTIVE_DOC_CONTAINER]
	if (!CView::DoPreparePrinting(pInfo))
		return FALSE;
	
	if (!COleDocObjectItem::OnPreparePrinting(this, pInfo))
		return FALSE;

	return TRUE;
[!else]
	// 默认准备
	return DoPreparePrinting(pInfo);
[!endif]
[!endif]
}

[!if !RICH_EDIT_VIEW]
[!if EDIT_VIEW]
void [!output VIEW_CLASS]::OnBeginPrinting(CDC* pDC, CPrintInfo* pInfo)
[!else]
void [!output VIEW_CLASS]::OnBeginPrinting(CDC* /*pDC*/, CPrintInfo* /*pInfo*/)
[!endif]
{
[!if EDIT_VIEW]
	// 默认 CEditView 开始打印
	CEditView::OnBeginPrinting(pDC, pInfo);
[!else]
	// TODO:  添加额外的打印前进行的初始化过程
[!endif]
}

[!if EDIT_VIEW]
void [!output VIEW_CLASS]::OnEndPrinting(CDC* pDC, CPrintInfo* pInfo)
[!else]
void [!output VIEW_CLASS]::OnEndPrinting(CDC* /*pDC*/, CPrintInfo* /*pInfo*/)
[!endif]
{
[!if EDIT_VIEW]
	// 默认 CEditView 结束打印
	CEditView::OnEndPrinting(pDC, pInfo);
[!else]
	// TODO:  添加打印后进行的清理过程
[!endif]
}
[!endif]
[!endif]
[!if FORM_VIEW || ACTIVE_DOC_CONTAINER]

[!if ACTIVE_DOC_CONTAINER]
void [!output VIEW_CLASS]::OnPrint(CDC* pDC, CPrintInfo* pInfo)
[!else]
void [!output VIEW_CLASS]::OnPrint(CDC* pDC, CPrintInfo* /*pInfo*/)
[!endif]
{
	// TODO:  在此处添加自定义打印代码
[!if ACTIVE_DOC_CONTAINER]
	if(pInfo->m_bDocObject)
		COleDocObjectItem::OnPrint(this, pInfo, TRUE);
	else
		CView::OnPrint(pDC, pInfo);
[!endif]
}
[!endif]
[!endif]
[!if CONTAINER || CONTAINER_SERVER]

void [!output VIEW_CLASS]::OnDestroy()
{
	// 析构时停用此项；这在
	// 使用拆分视图时非常重要 
   COleClientItem* pActiveItem = GetDocument()->GetInPlaceActiveItem(this);
   if (pActiveItem != NULL && pActiveItem->GetActiveView() == this)
   {
      pActiveItem->Deactivate();
      ASSERT(GetDocument()->GetInPlaceActiveItem(this) == NULL);
   }
   [!output VIEW_BASE_CLASS]::OnDestroy();
}

[!if !RICH_EDIT_VIEW]


// OLE 客户端支持和命令

BOOL [!output VIEW_CLASS]::IsSelected(const CObject* pDocItem) const
{
	// 如果所选内容只包括
	//  [!output CONTAINER_ITEM_CLASS] 对象，则以下实现就足够了。若要处理其他选择机制，
	//  则应替换此处的实现

	// TODO:  实现对所选 OLE 客户端项进行测试的函数

	return pDocItem == m_pSelection;
}

void [!output VIEW_CLASS]::OnInsertObject()
{
	// 调用标准的“插入对象”对话框以获得有关
	//  新 [!output CONTAINER_ITEM_CLASS] 对象的信息
	COleInsertDialog dlg;
[!if ACTIVE_DOC_CONTAINER]
	if (dlg.DoModal(COleInsertDialog::DocObjectsOnly) != IDOK)
		return;
[!else]
	if (dlg.DoModal() != IDOK)
		return;
[!endif]

	BeginWaitCursor();

	[!output CONTAINER_ITEM_CLASS]* pItem = NULL;
	TRY
	{
		// 创建与此文档相连接的新项
		[!output DOC_CLASS]* pDoc = GetDocument();
		ASSERT_VALID(pDoc);
		pItem = new [!output CONTAINER_ITEM_CLASS](pDoc);
		ASSERT_VALID(pItem);

		// 通过对话框数据初始化该项
		if (!dlg.CreateItem(pItem))
			AfxThrowMemoryException();  // 任何异常都将导致该结果
		ASSERT_VALID(pItem);
		
[!if ACTIVE_DOC_CONTAINER]
		pItem->DoVerb(OLEIVERB_SHOW, this);
[!else]
        if (dlg.GetSelectionType() == COleInsertDialog::createNewItem)
			pItem->DoVerb(OLEIVERB_SHOW, this);
[!endif]

		ASSERT_VALID(pItem);
		// 作为任意用户界面设计，这会将所选内容
		//  设置为插入的最后一项

		// TODO:  重新实现所选内容，使其适合于您的应用程序
		m_pSelection = pItem;   // 将所选内容设置为插入的最后一项
		pDoc->UpdateAllViews(NULL);
	}
	CATCH(CException, e)
	{
		if (pItem != NULL)
		{
			ASSERT_VALID(pItem);
			pItem->Delete();
		}
		AfxMessageBox(IDP_FAILED_TO_CREATE);
	}
	END_CATCH

	EndWaitCursor();
}

// 以下命令处理程序提供了标准键盘
//  用户界面以取消就地编辑会话。  此处，
//  容器(而不是服务器)将导致停用
void [!output VIEW_CLASS]::OnCancelEditCntr()
{
	// 关闭此视图中的任何就地活动项。
	COleClientItem* pActiveItem = GetDocument()->GetInPlaceActiveItem(this);
	if (pActiveItem != NULL)
	{
		pActiveItem->Close();
	}
	ASSERT(GetDocument()->GetInPlaceActiveItem(this) == NULL);
}

// 在就地编辑一个对象时，容器需要对 OnSetFocus 和 OnSize 
//  进行特殊处理
void [!output VIEW_CLASS]::OnSetFocus(CWnd* pOldWnd)
{
	COleClientItem* pActiveItem = GetDocument()->GetInPlaceActiveItem(this);
	if (pActiveItem != NULL &&
		pActiveItem->GetItemState() == COleClientItem::activeUIState)
	{
		// 如果该项处于同一视图中，则需要将焦点设置到该项
		CWnd* pWnd = pActiveItem->GetInPlaceWindow();
		if (pWnd != NULL)
		{
			pWnd->SetFocus();   // 不要调用基类
			return;
		}
	}

	[!output VIEW_BASE_CLASS]::OnSetFocus(pOldWnd);
}

void [!output VIEW_CLASS]::OnSize(UINT nType, int cx, int cy)
{
	[!output VIEW_BASE_CLASS]::OnSize(nType, cx, cy);
	COleClientItem* pActiveItem = GetDocument()->GetInPlaceActiveItem(this);
	if (pActiveItem != NULL)
		pActiveItem->SetItemRects();
}

void [!output VIEW_CLASS]::OnFilePrint()
{
	//默认情况下，要求活动文档使用 IOleCommandTarget 打印自身。
	//如果不需要此行为，
	//请移除对 COleDocObjectItem::DoDefaultPrinting 调用。
	//如果由于某种原因调用失败，则将尝试使用 IPrint 接口打印
	//该文档对象。
	CPrintInfo printInfo;
	ASSERT(printInfo.m_pPD != NULL); 
	if (S_OK == COleDocObjectItem::DoDefaultPrinting(this, &printInfo))
		return;
	
	CView::OnFilePrint();

}

[!endif]
[!endif]
[!if MENUBAR_TOOLBAR || RIBBON_TOOLBAR]

void [!output VIEW_CLASS]::OnRButtonUp(UINT /* nFlags */, CPoint point)
{
	ClientToScreen(&point);
	OnContextMenu(this, point);
}

void [!output VIEW_CLASS]::OnContextMenu(CWnd* /* pWnd */, CPoint point)
{
#ifndef SHARED_HANDLERS
	theApp.GetContextMenuManager()->ShowPopupMenu(IDR_POPUP_EDIT, point.x, point.y, this, TRUE);
#endif
}
[!endif]
[!if MINI_SERVER || FULL_SERVER || CONTAINER_SERVER]

// OLE 服务器支持

// 以下命令处理程序提供了标准键盘
//  用户界面以取消就地编辑会话。  此处，
//  服务器(而不是容器)将导致停用
void [!output VIEW_CLASS]::OnCancelEditSrvr()
{
	GetDocument()->OnDeactivateUI(FALSE);
}
[!endif]


// [!output VIEW_CLASS] 诊断

#ifdef _DEBUG
void [!output VIEW_CLASS]::AssertValid() const
{
	[!output VIEW_BASE_CLASS]::AssertValid();
}

void [!output VIEW_CLASS]::Dump(CDumpContext& dc) const
{
	[!output VIEW_BASE_CLASS]::Dump(dc);
}

[!output DOC_CLASS]* [!output VIEW_CLASS]::GetDocument() const // 非调试版本是内联的
{
	ASSERT(m_pDocument->IsKindOf(RUNTIME_CLASS([!output DOC_CLASS])));
	return ([!output DOC_CLASS]*)m_pDocument;
}
#endif //_DEBUG
[!if OLEDB_RECORD_VIEW]


// [!output VIEW_CLASS] 数据库支持
CRowset<>* [!output VIEW_CLASS]::OnGetRowset()
{
	return m_pSet->GetRowsetBase();
}

[!endif]
[!if ODBC_RECORD_VIEW]


// [!output VIEW_CLASS] 数据库支持
CRecordset* [!output VIEW_CLASS]::OnGetRecordset()
{
	return m_pSet;
}

[!endif]


// [!output VIEW_CLASS] 消息处理程序
[!if PROJECT_STYLE_EXPLORER]
[!if LIST_VIEW]
void [!output VIEW_CLASS]::OnStyleChanged(int nStyleType, LPSTYLESTRUCT lpStyleStruct)
{
	//TODO:  添加代码以响应用户对窗口视图样式的更改	
	[!output VIEW_BASE_CLASS]::OnStyleChanged(nStyleType,lpStyleStruct);	
}
[!endif]
[!endif]
