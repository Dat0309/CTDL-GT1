#pragma once

#ifdef _WIN32_WCE
#error "Windows CE ���䴩 COlePropertyPage�C"
#endif 

// [!output CLASS_NAME] : �ݩʭ���ܤ��

class [!output CLASS_NAME] : public COlePropertyPage
{
	DECLARE_DYNCREATE([!output CLASS_NAME])
	DECLARE_OLECREATE_EX([!output CLASS_NAME])

// �غc�禡
public:
	[!output CLASS_NAME]();

// ��ܤ�����
	enum { IDD = [!output IDD_DIALOG] };

// �{���X��@
protected:
	virtual void DoDataExchange(CDataExchange* pDX);        // DDX/DDV �䴩

// �T������
protected:
	DECLARE_MESSAGE_MAP()
};
