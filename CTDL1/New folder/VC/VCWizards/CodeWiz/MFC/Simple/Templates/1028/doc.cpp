// [!output IMPL_FILE] : ��@��
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
	
	// �Y�n�����ε{���� OLE Automation �@�δ����O������A
	//	�غc�禡�����I�s AfxOleLockApp�C
	
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
	// �Y�n�b�ϥ� OLE Automation �إߤF�Ҧ����󤧫ᵲ�����ε{���A
	//	�Ѻc�禡�����I�s AfxOleUnlockApp�C
	
	AfxOleUnlockApp();
[!endif]
}
[!if AUTOMATION || CREATABLE]

void [!output CLASS_NAME]::OnFinalRelease()
{
	// ������ Automation ����̫᪺�ѦҮɡA
	// �|�I�s OnFinalRelease�C�����O�|�۰�
	// �R������C�I�s�����O�e�A�Х��[�J�z����һݪ��B�~�M�� (Cleanup)
	// �{���X�C

	[!output BASE_CLASS]::OnFinalRelease();
}
[!endif]
[!if COLESERVERDOC]

#ifndef _WIN32_WCE
COleServerItem* [!output CLASS_NAME]::OnGetEmbeddedItem()
{
	// �ج[�|�I�s OnGetEmbeddedItem �H���o�P��������p�� COleServerItem�C
	//  �u�����n�ɤ~�|�I�s�C

	// ���O�Ǧ^ NULL�A�ӬO�Ǧ^���V�t�X�o�Ӥ��ϥΤ��s COleServerItem
	//  �l�����O�����СA�M��
	//  �����U�C ASSERT(FALSE)
	//  (�]�N�O�Ǧ^�s�� CMyServerItem.)�C
	ASSERT(FALSE);			// �Цb���� TODO ���Ჾ��������
	return NULL;
}
#endif
[!endif]


BEGIN_MESSAGE_MAP([!output CLASS_NAME], [!output BASE_CLASS])
END_MESSAGE_MAP()
[!if AUTOMATION || CREATABLE]

BEGIN_DISPATCH_MAP([!output CLASS_NAME], [!output BASE_CLASS])
END_DISPATCH_MAP()

// �`�N: �ڭ̥[�J�F�� IID_I[!output CLASS_NAME_ROOT] ���䴩
//  �H�K�q VBA �䴩�����w��ô���C�� IID �����P .IDL �ɤ��A
//  ���[�ܤ��t���� (Dispinterface) �� GUID �۲šC

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


// [!output CLASS_NAME] �E�_

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
// [!output CLASS_NAME] �ǦC��

void [!output CLASS_NAME]::Serialize(CArchive& ar)
{
	if (ar.IsStoring())
	{
		// TODO:  �b���[�J�x�s�{���X
	}
	else
	{
		// TODO:  �b���[�J���J�{���X
	}
}
#endif


// [!output CLASS_NAME] �R�O
