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

// [!output SERVER_ITEM_HEADER] : [!output SERVER_ITEM_CLASS] 클래스의 인터페이스
//

#pragma once

class [!output SERVER_ITEM_CLASS] : public [!output SERVER_ITEM_BASE_CLASS]
{
	DECLARE_DYNAMIC([!output SERVER_ITEM_CLASS])

// 생성자입니다.
public:
	[!output SERVER_ITEM_CLASS]([!output DOC_CLASS]* pContainerDoc);

// 특성입니다.
	[!output DOC_CLASS]* GetDocument() const
		{ return reinterpret_cast<[!output DOC_CLASS]*>([!output SERVER_ITEM_BASE_CLASS]::GetDocument()); }

// 재정의입니다.
	public:
	virtual BOOL OnDraw(CDC* pDC, CSize& rSize);
	virtual BOOL OnGetExtent(DVASPECT dwDrawAspect, CSize& rSize);

// 구현입니다.
public:
	~[!output SERVER_ITEM_CLASS]();
#ifdef _DEBUG
	virtual void AssertValid() const;
	virtual void Dump(CDumpContext& dc) const;
#endif

protected:
	virtual void Serialize(CArchive& ar);   // 문서 입/출력을 위해 재정의되었습니다.
};

