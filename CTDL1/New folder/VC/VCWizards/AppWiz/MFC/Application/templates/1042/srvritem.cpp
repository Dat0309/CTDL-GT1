[!if RIBBON_TOOLBAR]
// 이 MFC 샘플 소스 코드는 MFC Microsoft Office Fluent 사용자 인터페이스("Fluent UI")를 
// 사용하는 방법을 보여 주며, MFC C++ 라이브러리 소프트웨어에 포함된 
// Microsoft Foundation Classes Reference 및 관련 전자 문서에 대해 
// 추가적으로 제공되는 내용입니다.  
// Fluent UI를 복사, 사용 또는 배포하는 데 대한 사용 약관은 별도로 제공됩니다.  
// Fluent UI 라이선싱 프로그램에 대한 자세한 내용은 
// http://go.microsoft.com/fwlink/?LinkId=238214.
//
// Copyright (C) Microsoft Corporation
// All rights reserved.
[!endif]

// [!output SERVER_ITEM_IMPL] : [!output SERVER_ITEM_CLASS] 클래스의 구현
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


// [!output SERVER_ITEM_CLASS] 구현

IMPLEMENT_DYNAMIC([!output SERVER_ITEM_CLASS], [!output SERVER_ITEM_BASE_CLASS])

[!output SERVER_ITEM_CLASS]::[!output SERVER_ITEM_CLASS]([!output DOC_CLASS]* pContainerDoc)
	: [!output SERVER_ITEM_BASE_CLASS](pContainerDoc, TRUE)
{
	// TODO: 여기에 일회성 생성 코드를 추가합니다.
	//  (예: 항목의 데이터 소스에 추가 클립보드 형식 추가)
}

[!output SERVER_ITEM_CLASS]::~[!output SERVER_ITEM_CLASS]()
{
	// TODO: 여기에 정리 코드를 추가합니다.
}

void [!output SERVER_ITEM_CLASS]::Serialize(CArchive& ar)
{
	// 항목이 클립보드에 복사되면 프레임워크에서 [!output SERVER_ITEM_CLASS]::Serialize를
	//  호출합니다.  이러한 호출은
	//  OLE 콜백 OnGetClipboardData를 통해 자동으로 발생시킬 수 있습니다.
	//  포함 항목의 경우 기본적으로 해당 문서의 Serialize 함수에 위임하는 것이
	//  좋습니다.  연결을 지원할 경우에는 문서의 일부만
	//  serialization할 수 있습니다.

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
	// 이 응용 프로그램과 같은 대부분의 응용 프로그램은 항목의
	//  내용 모양 그리기만 처리합니다.
	//  OnDrawEx를 재정의하여 DVASPECT_THUMBNAIL과 같은 다른 모양을 지원하려면
	//  이 OnGetExtent의 구현을 수정하여 추가 모양을  처리하도록
	//  해야 합니다.

	if (dwDrawAspect != DVASPECT_CONTENT)
		return [!output SERVER_ITEM_BASE_CLASS]::OnGetExtent(dwDrawAspect, rSize);

	// [!output SERVER_ITEM_CLASS]::OnGetExtent를 호출합니다.
	//  전체 항목의 범위를 HIMETRIC 단위로 가져오기 위해서입니다.  여기에서의 기본 구현은 단순히
	//  하드 코드된 단위 수를 반환하는 것입니다.

	// TODO: 이 임의의 크기를 바꿉니다.

	rSize = CSize(3000, 3000);   // 3000 x 3000 HIMETRIC 단위

	return TRUE;
}

BOOL [!output SERVER_ITEM_CLASS]::OnDraw(CDC* pDC, CSize& rSize)
{
	if (!pDC)
		return FALSE;

	// rSize를 사용할 경우 이 줄을 제거하십시오.
	UNREFERENCED_PARAMETER(rSize);

	// TODO: 매핑 모드와 범위를 설정합니다.
	//  범위는 보통 OnGetExtent에서 반환된 크기와 같습니다.
	pDC->SetMapMode(MM_ANISOTROPIC);
	pDC->SetWindowOrg(0,0);
	pDC->SetWindowExt(3000, 3000);

	// TODO: 여기에 그리기 코드를 추가합니다.  옵션으로 HIMETRIC 범위를 채울 수도 있습니다.
	//  모든 그리기 작업은 메타 파일 디바이스 컨텍스트(pDC)에서 발생합니다.

[!if CONTAINER_SERVER]
	// TODO: 포함된 [!output CONTAINER_ITEM_CLASS] 개체도 그립니다.

[!endif]
[!if CONTAINER_SERVER]
	// 다음 코드는 첫째 항목을 임의의 위치에 그립니다.

	// TODO: 실제 그리기 코드가 완료되면 이 코드를 제거합니다.

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


// [!output SERVER_ITEM_CLASS] 진단

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

