#pragma once

// [!output PROPERTY_PAGE_HEADER]: ���������� ������ �������� ������� [!output PROPERTY_PAGE_CLASS].


// [!output PROPERTY_PAGE_CLASS]: ��� ���������� ��. [!output PROPERTY_PAGE_IMPL].

class [!output PROPERTY_PAGE_CLASS] : public COlePropertyPage
{
	DECLARE_DYNCREATE([!output PROPERTY_PAGE_CLASS])
	DECLARE_OLECREATE_EX([!output PROPERTY_PAGE_CLASS])

// �����������
public:
	[!output PROPERTY_PAGE_CLASS]();

// ������ ����������� ����
	enum { IDD = IDD_PROPPAGE_[!output UPPER_CASE_SAFE_PROJECT_IDENTIFIER_NAME] };

// ����������
protected:
	virtual void DoDataExchange(CDataExchange* pDX);    // ��������� DDX/DDV

// ����� ���������
protected:
	DECLARE_MESSAGE_MAP()
};
