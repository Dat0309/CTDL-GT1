#pragma once

#ifdef _WIN32_WCE
#error "COlePropertyPage �� Windows CE �ł̓T�|�[�g����Ă��܂���B"
#endif 

// [!output CLASS_NAME] : �v���p�e�B �y�[�W �_�C�A���O

class [!output CLASS_NAME] : public COlePropertyPage
{
	DECLARE_DYNCREATE([!output CLASS_NAME])
	DECLARE_OLECREATE_EX([!output CLASS_NAME])

// �R���X�g���N�^�[
public:
	[!output CLASS_NAME]();

// �_�C�A���O �f�[�^
	enum { IDD = [!output IDD_DIALOG] };

// ����
protected:
	virtual void DoDataExchange(CDataExchange* pDX);        // DDX/DDV �T�|�[�g

// ���b�Z�[�W �}�b�v
protected:
	DECLARE_MESSAGE_MAP()
};
