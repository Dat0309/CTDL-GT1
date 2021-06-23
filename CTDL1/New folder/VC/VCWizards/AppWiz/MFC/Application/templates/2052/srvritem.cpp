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

// [!output SERVER_ITEM_IMPL] : [!output SERVER_ITEM_CLASS] 类的实现
//

#include "stdafx.h"
#include "[!output APP_HEADER]"

#include "[!output DOC_HEADER]"
#include "[!output SERVER_ITEM_HEADER]"
[!if CONTAINER_SERVER]
#include "[!output CONTAINER_ITEM_HEADER]"
[!endif]

#ifdef _DEBUG
#define new DEBUG_NEW
#endif


// [!output SERVER_ITEM_CLASS] 实现

IMPLEMENT_DYNAMIC([!output SERVER_ITEM_CLASS], [!output SERVER_ITEM_BASE_CLASS])

[!output SERVER_ITEM_CLASS]::[!output SERVER_ITEM_CLASS]([!output DOC_CLASS]* pContainerDoc)
	: [!output SERVER_ITEM_BASE_CLASS](pContainerDoc, TRUE)
{
	// TODO:  在此添加一次性构造代码
	//  (如将附加剪贴板格式添加到项的数据源中)
}

[!output SERVER_ITEM_CLASS]::~[!output SERVER_ITEM_CLASS]()
{
	// TODO:  在此处添加清理代码
}

void [!output SERVER_ITEM_CLASS]::Serialize(CArchive& ar)
{
	// 如果将该项复制到剪贴板中，则框架将调用 [!output SERVER_ITEM_CLASS]::Serialize。
	//  这可以
	//  通过 OLE 回调 OnGetClipboardData 来自动执行。
	//  对于嵌入项，默认最好直接委托给文档的 Serialize 函数。
	//  如果支持链接，则只需序列化
	//  文档的一部分。

	if (!IsLinkedItem())
	{
		[!output DOC_CLASS]* pDoc = GetDocument();
		ASSERT_VALID(pDoc);
		if (pDoc)
			pDoc->Serialize(ar);
	}
}

BOOL [!output SERVER_ITEM_CLASS]::OnGetExtent(DVASPECT dwDrawAspect, CSize& rSize)
{
	// 大多数与此类似的应用程序只对绘制项的内容
	//  方面进行处理。  如果希望支持其他方面，如
	//  DVASPECT_THUMBNAIL (通过重写 OnDrawEx)，则应修改
	//  OnGetExtent 的此实现以处理
	//  其他方面。

	if (dwDrawAspect != DVASPECT_CONTENT)
		return [!output SERVER_ITEM_BASE_CLASS]::OnGetExtent(dwDrawAspect, rSize);

	// 调用 [!output SERVER_ITEM_CLASS]::OnGetExtent 以便获取整个项的
	//  HIMETRIC 单元表示的范围。  此处的默认实现
	//  只返回单元的硬编码数字。

	// TODO:  替换此任意大小

	rSize = CSize(3000, 3000);   // 3000 x 3000 HIMETRIC 单元

	return TRUE;
}

BOOL [!output SERVER_ITEM_CLASS]::OnDraw(CDC* pDC, CSize& rSize)
{
	if (!pDC)
		return FALSE;

	// 如果使用 rSize，则将此移除
	UNREFERENCED_PARAMETER(rSize);

	// TODO:  设置映射模式和范围
	//  (此范围通常与从 OnGetExtent 返回的大小相同)
	pDC->SetMapMode(MM_ANISOTROPIC);
	pDC->SetWindowOrg(0,0);
	pDC->SetWindowExt(3000, 3000);

	// TODO:  在此处添加绘制代码。  也可以填充 HIMETRIC 范围。
	//  所有绘制都将在图元文件设备上下文(pDC)中进行。

[!if CONTAINER_SERVER]
	// TODO: 同时绘制嵌入的 [!output CONTAINER_ITEM_CLASS] 对象。

[!endif]
[!if CONTAINER_SERVER]
	// 以下代码将在任意位置绘制第一个项。

	// TODO:  完成真正的绘制代码后，将移除此代码

	[!output DOC_CLASS]* pDoc = GetDocument();
	ASSERT_VALID(pDoc);
	if (!pDoc)
		return FALSE;

	POSITION pos = pDoc->GetStartPosition();
	[!output CONTAINER_ITEM_CLASS]* pItem = DYNAMIC_DOWNCAST([!output CONTAINER_ITEM_CLASS], pDoc->GetNextClientItem(pos));
	if (pItem != NULL)
		pItem->Draw(pDC, CRect(10, 10, 1010, 1010));
[!endif]
	return TRUE;
}


// [!output SERVER_ITEM_CLASS] 诊断

#ifdef _DEBUG
void [!output SERVER_ITEM_CLASS]::AssertValid() const
{
	[!output SERVER_ITEM_BASE_CLASS]::AssertValid();
}

void [!output SERVER_ITEM_CLASS]::Dump(CDumpContext& dc) const
{
	[!output SERVER_ITEM_BASE_CLASS]::Dump(dc);
}
#endif

