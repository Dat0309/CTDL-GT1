#pragma once

// [!output PROPERTY_PAGE_HEADER] : [!output PROPERTY_PAGE_CLASS] �v���p�e�B �y�[�W �N���X�̐錾�ł��B


// [!output PROPERTY_PAGE_CLASS] : �����Ɋւ��Ă� [!output PROPERTY_PAGE_IMPL] ���Q�Ƃ��Ă��������B

class [!output PROPERTY_PAGE_CLASS] : public COlePropertyPage
{
	DECLARE_DYNCREATE([!output PROPERTY_PAGE_CLASS])
	DECLARE_OLECREATE_EX([!output PROPERTY_PAGE_CLASS])

// �R���X�g���N�^�[
public:
	[!output PROPERTY_PAGE_CLASS]();

// �_�C�A���O �f�[�^
	enum { IDD = IDD_PROPPAGE_[!output UPPER_CASE_SAFE_PROJECT_IDENTIFIER_NAME] };

// ����
protected:
	virtual void DoDataExchange(CDataExchange* pDX);    // DDX/DDV �T�|�[�g

// ���b�Z�[�W �}�b�v
protected:
	DECLARE_MESSAGE_MAP()
};

