// [!output IMPL_FILE]: ���� ����������
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
	
	// ����� ���������� ������ ���������� � ������� ����� ������� ���������� ������� ������������� OLE, 
	//	����������� �������� AfxOleLockApp.
	
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
	// ����� �������� ������ ����������, ����� ��� ������� �������
	// 	��� ������ OLE-�������������, ���������� �������� AfxOleUnlockApp.
	
	AfxOleUnlockApp();
[!endif]
}
[!if AUTOMATION || CREATABLE]

void [!output CLASS_NAME]::OnFinalRelease()
{
	// ����� ����� ����������� ��������� ������ �� ������ �������������,
	// ���������� OnFinalRelease.  ������� ����� �������������
	// ������ ������.  ����� ������� �������� ������ ��������
	// �������������� �������, ����������� ������ �������.

	[!output BASE_CLASS]::OnFinalRelease();
}
[!endif]
[!if COLESERVERDOC]

#ifndef _WIN32_WCE
COleServerItem* [!output CLASS_NAME]::OnGetEmbeddedItem()
{
	// OnGetEmbeddedItem ���������� ������� ������ ��� ��������� COleServerItem,
	//  ������� ������ � ���� ����������.  ���������� ��� �������������.

	// ������ �������� NULL ���������� ��������� �� ����� ����������� ����� COleServerItem,
	//  ������� ������������ ��������� � ������ ����������, �����
	//  ������� ��������� ���� ASSERT(FALSE).
	//  (�. �. ���������� ����� CMyServerItem.)
	ASSERT(FALSE);			// ������� ��� ����� ���������� �������� TODO
	return NULL;
}
#endif
[!endif]


BEGIN_MESSAGE_MAP([!output CLASS_NAME], [!output BASE_CLASS])
END_MESSAGE_MAP()
[!if AUTOMATION || CREATABLE]

BEGIN_DISPATCH_MAP([!output CLASS_NAME], [!output BASE_CLASS])
END_DISPATCH_MAP()

// ����������: �� �������� ��������� ��� IID_I[!output CLASS_NAME_ROOT], ����� ���������� ���������� � ����� ������ ����� ��������
//  �� VBA.  ���� IID ������ ��������������� GUID, ���������� � 
//  disp-����������� � ����� .IDL.

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


// ����������� [!output CLASS_NAME]

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
// ������������ [!output CLASS_NAME]

void [!output CLASS_NAME]::Serialize(CArchive& ar)
{
	if (ar.IsStoring())
	{
		// TODO: �������� ��� ����������
	}
	else
	{
		// TODO: �������� ��� ��������
	}
}
#endif


// ������� [!output CLASS_NAME]
