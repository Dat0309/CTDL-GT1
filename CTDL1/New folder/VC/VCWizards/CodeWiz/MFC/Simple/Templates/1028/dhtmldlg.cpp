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


// [!output CLASS_NAME] ��ܤ��

IMPLEMENT_DYNCREATE([!output CLASS_NAME], CDHtmlDialog)

[!output CLASS_NAME]::[!output CLASS_NAME](CWnd* pParent /*=NULL*/)
	: CDHtmlDialog([!output CLASS_NAME]::IDD, [!output CLASS_NAME]::IDH, pParent)
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

	CDHtmlDialog::OnFinalRelease();
}
[!endif]

void [!output CLASS_NAME]::DoDataExchange(CDataExchange* pDX)
{
	CDHtmlDialog::DoDataExchange(pDX);
}

BOOL [!output CLASS_NAME]::OnInitDialog()
{
	CDHtmlDialog::OnInitDialog();
	return TRUE;  // �Ǧ^ TRUE�A���D�z�ﱱ��]�w�J�I
}

BEGIN_MESSAGE_MAP([!output CLASS_NAME], CDHtmlDialog)
END_MESSAGE_MAP()

BEGIN_DHTML_EVENT_MAP([!output CLASS_NAME])
	DHTML_EVENT_ONCLICK(_T("ButtonOK"), OnButtonOK)
	DHTML_EVENT_ONCLICK(_T("ButtonCancel"), OnButtonCancel)
END_DHTML_EVENT_MAP()

[!if AUTOMATION || CREATABLE]

BEGIN_DISPATCH_MAP([!output CLASS_NAME], CDHtmlDialog)
END_DISPATCH_MAP()

// �`�N: �ڭ̥[�J�F�� IID_I[!output CLASS_NAME_ROOT] ���䴩
//  �H�K�q VBA �䴩�����w��ô���C�� IID �����P .IDL �ɤ��A
//  ���[�ܤ��t���� (Dispinterface) �� GUID �۲šC

// {[!output DISPIID_REGISTRY_FORMAT]}
static const IID IID_I[!output CLASS_NAME_ROOT] =
[!output DISPIID_STATIC_CONST_GUID_FORMAT];

BEGIN_INTERFACE_MAP([!output CLASS_NAME], CDHtmlDialog)
	INTERFACE_PART([!output CLASS_NAME], IID_I[!output CLASS_NAME_ROOT], Dispatch)
END_INTERFACE_MAP()
[!endif]
[!if CREATABLE]

// {[!output CLSID_REGISTRY_FORMAT]}
IMPLEMENT_OLECREATE([!output CLASS_NAME], "[!output TYPEID]", [!output CLSID_IMPLEMENT_OLECREATE_FORMAT])
[!endif]


// [!output CLASS_NAME] �T���B�z�`��

HRESULT [!output CLASS_NAME]::OnButtonOK(IHTMLElement* /*pElement*/)
{
	OnOK();
	return S_OK;
}

HRESULT [!output CLASS_NAME]::OnButtonCancel(IHTMLElement* /*pElement*/)
{
	OnCancel();
	return S_OK;
}
