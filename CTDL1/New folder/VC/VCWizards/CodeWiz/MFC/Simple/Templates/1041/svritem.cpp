// [!output IMPL_FILE] : �����t�@�C��
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
	
	// OLE �I�[�g���[�V���� �I�u�W�F�N�g���A�N�e�B�u�ł������A�A�v���P�[�V������ 
	//	���s��Ԃɂ��Ă��������A�R���X�g���N�^�[�� AfxOleLockApp ���Ăяo���܂��B
	
	AfxOleLockApp();
[!endif]
}

[!output CLASS_NAME]::~[!output CLASS_NAME]()
{
[!if CREATABLE]
	// ���ׂẴI�u�W�F�N�g�� OLE �I�[�g���[�V�����ō쐬���ꂽ�ꍇ�ɃA�v���P�[�V����
	//	���I�����邽�߂ɁA�f�X�g���N�^�[�� AfxOleUnlockApp ���Ăяo���܂��B
	
	AfxOleUnlockApp();
[!endif]
}
[!if AUTOMATION || CREATABLE]

void [!output CLASS_NAME]::OnFinalRelease()
{
	// �I�[�g���[�V���� �I�u�W�F�N�g�ɑ΂���Ō�̎Q�Ƃ���������Ƃ���
	// OnFinalRelease ���Ăяo����܂��B���N���X�͎����I�ɃI�u�W�F�N
	// �g���폜���܂��B���N���X���Ăяo���O�ɁA�I�u�W�F�N�g�ŕK�v�ȓ�
	// �ʂȌ㏈����ǉ����Ă��������B

	[!output BASE_CLASS]::OnFinalRelease();
}
[!endif]

BOOL [!output CLASS_NAME]::OnDraw(CDC* pDC, CSize& rSize)
{
	// OLE ���ڂ����^�t�@�C���ɕ`�悷�邽�߂Ƀt���[�����[�N�ŌĂяo����܂��B
	// OLE ���ڂ̃��^�t�@�C���́A�R���e�i�[ �A�v���P�[�V�����ō��ڂ� 
	// �\�����邽�߂Ɏg���܂��B�R���e�i�[ �A�v���P�[�V������ 
	// Microsoft Foundation Class ���C�u�����ŏ����ꂽ�ꍇ�A���^�t�@�C���� 
	// �Ή����� COleClientItem �I�u�W�F�N�g�� Draw �����o�[�֐��ɂ���Ďg�p����܂��B
	// ����̎����͂���܂���B���ڂ��w�肳�ꂽ�f�o�C�X �R���e�L�X�g�ɕ`�悷��ɂ́A���̊֐���
	// �I�[�o�[���C�h���Ă��������B
	ASSERT(FALSE);			// TODO �̊�����A���̃R�[�h���폜���܂��B
	return TRUE;
}

BEGIN_MESSAGE_MAP([!output CLASS_NAME], [!output BASE_CLASS])
END_MESSAGE_MAP()
[!if AUTOMATION || CREATABLE]

BEGIN_DISPATCH_MAP([!output CLASS_NAME], [!output BASE_CLASS])
END_DISPATCH_MAP()

// ����: VBA ����^�C�v �Z�[�t�ȃo�C���h���T�|�[�g���邽�߂ɁAIID_I[!output CLASS_NAME_ROOT] �̃T�|�[�g��ǉ����܂��B
//  ���� IID �́A.IDL �t�@�C���̃f�B�X�p�b�` �C���^�[�t�F�C�X�փA�^�b�`����� 
//  GUID �ƈ�v���Ȃ���΂Ȃ�܂���B

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


// [!output CLASS_NAME] �f�f

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


// [!output CLASS_NAME] �V���A����

#ifndef _WIN32_WCE
void [!output CLASS_NAME]::Serialize(CArchive& ar)
{
	if (ar.IsStoring())
	{
		// TODO: �i�[����R�[�h�������ɒǉ����Ă��������B
	}
	else
	{
		// TODO: �ǂݍ��ރR�[�h�������ɒǉ����Ă��������B
	}
}
#endif

// [!output CLASS_NAME] �R�}���h
