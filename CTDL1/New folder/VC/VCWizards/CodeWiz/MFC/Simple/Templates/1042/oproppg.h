#pragma once

#ifdef _WIN32_WCE
#error "Windows CE������ COlePropertyPage�� �������� �ʽ��ϴ�."
#endif 

// [!output CLASS_NAME] : �Ӽ� ������ ��ȭ �����Դϴ�.

class [!output CLASS_NAME] : public COlePropertyPage
{
	DECLARE_DYNCREATE([!output CLASS_NAME])
	DECLARE_OLECREATE_EX([!output CLASS_NAME])

// �������Դϴ�.
public:
	[!output CLASS_NAME]();

// ��ȭ ���� �������Դϴ�.
	enum { IDD = [!output IDD_DIALOG] };

// �����Դϴ�.
protected:
	virtual void DoDataExchange(CDataExchange* pDX);        // DDX/DDV �����Դϴ�.

// �޽��� ���Դϴ�.
protected:
	DECLARE_MESSAGE_MAP()
};
