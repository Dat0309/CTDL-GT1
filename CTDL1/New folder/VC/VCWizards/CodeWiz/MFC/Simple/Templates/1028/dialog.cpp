// [!output IMPL_FILE] : ��@��
//

#include "stdafx.h"
[!if PROJECT_NAME_HEADER]
#include "[!output PROJECT_NAME].h"
[!endif]
#include "[!output HEADER_FILE]"
#include "afxdialogex.h"
[!if !MERGE_FILE]

#ifdef _DEBUG
#define new DEBUG_NEW
#endif
[!endif]


// [!output CLASS_NAME] ��ܤ��

[!if CREATABLE]
IMPLEMENT_DYNCREATE([!output CLASS_NAME], [!output BASE_CLASS])
[!else]
IMPLEMENT_DYNAMIC([!output CLASS_NAME], [!output BASE_CLASS])
[!endif]

[!if CPROPERTYPAGE]
[!output CLASS_NAME]::[!output CLASS_NAME]()
	: CPropertyPage([!output CLASS_NAME]::IDD)
[!else]
[!output CLASS_NAME]::[!output CLASS_NAME](CWnd* pParent /*=NULL*/)
	: [!output BASE_CLASS]([!output CLASS_NAME]::IDD, pParent)
[!endif]
{
[!if ACCESSIBILITY]
#ifndef _WIN32_WCE
	EnableActiveAccessibility();
#endif
[!endif]

[!if AUTOMATION || CREATABLE]
	EnableAutomation();

[!endif]
[!if CREATABLE]
	
	// �Y�n�����ε{���� OLE Automation �@�δ����O������A
	//	�غc�禡�����I�s AfxOleLockApp�C
	
	AfxOleLockApp();

[!endif]
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

void [!output CLASS_NAME]::DoDataExchange(CDataExchange* pDX)
{
	[!output BASE_CLASS]::DoDataExchange(pDX);
}


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


// [!output CLASS_NAME] �T���B�z�`��
