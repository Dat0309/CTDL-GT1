#pragma once

#ifdef _WIN32_WCE
#error "COlePropertyPage �� �������������� � Windows CE."
#endif 

// [!output CLASS_NAME]: ���������� ���� �������� �������

class [!output CLASS_NAME] : public COlePropertyPage
{
	DECLARE_DYNCREATE([!output CLASS_NAME])
	DECLARE_OLECREATE_EX([!output CLASS_NAME])

// ������������
public:
	[!output CLASS_NAME]();

// ������ ����������� ����
	enum { IDD = [!output IDD_DIALOG] };

// ����������
protected:
	virtual void DoDataExchange(CDataExchange* pDX);        // ��������� DDX/DDV

// ����� ���������
protected:
	DECLARE_MESSAGE_MAP()
};
