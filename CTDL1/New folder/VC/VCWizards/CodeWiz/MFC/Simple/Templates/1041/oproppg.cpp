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


// [!output CLASS_NAME] �_�C�A���O

IMPLEMENT_DYNCREATE([!output CLASS_NAME], COlePropertyPage)



// ���b�Z�[�W �}�b�v

BEGIN_MESSAGE_MAP([!output CLASS_NAME], COlePropertyPage)
END_MESSAGE_MAP()



// �N���X �t�@�N�g������� GUID �����������܂��B

// {[!output CLSID_REGISTRY_FORMAT]}
IMPLEMENT_OLECREATE_EX([!output CLASS_NAME], "[!output TYPEID]",
	[!output CLSID_IMPLEMENT_OLECREATE_FORMAT])



// [!output CLASS_NAME]::[!output CLASS_NAME]Factory::UpdateRegistry -
// [!output CLASS_NAME] �̃V�X�e�� ���W�X�g�� �G���g����ǉ��܂��͍폜���܂��B

BOOL [!output CLASS_NAME]::[!output CLASS_NAME]Factory::UpdateRegistry(BOOL bRegister)
{
	// TODO: �y�[�W�̎�ނ̕����񃊃\�[�X���`���Ă��������B���� '0' �� ID �ɒu�������܂��B

	if (bRegister)
		return AfxOleRegisterPropertyPageClass(AfxGetInstanceHandle(),
			m_clsid, 0);
	else
		return AfxOleUnregisterClass(m_clsid, NULL);
}



// [!output CLASS_NAME]::[!output CLASS_NAME] - �R���X�g���N�^�[

// TODO: �y�[�W �L���v�V�����̕����񃊃\�[�X���`���Ă��������B���� '0' �� ID �ɒu�������܂��B

[!output CLASS_NAME]::[!output CLASS_NAME]() :
	COlePropertyPage(IDD, 0)
{
[!if ACCESSIBILITY]
#ifndef _WIN32_WCE
	EnableActiveAccessibility();
#endif
[!endif]

}



// [!output CLASS_NAME]::DoDataExchange - �y�[�W����уv���p�e�B�ԂŃf�[�^���ړ����܂��B

void [!output CLASS_NAME]::DoDataExchange(CDataExchange* pDX)
{
	DDP_PostProcessing(pDX);
}



// [!output CLASS_NAME] ���b�Z�[�W �n���h���[
