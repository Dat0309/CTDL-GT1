#pragma once

// [!output PROPERTY_PAGE_HEADER] : [!output PROPERTY_PAGE_CLASS] �ݩʭ����O���ŧi�C


// [!output PROPERTY_PAGE_CLASS] : �аѾ\ [!output PROPERTY_PAGE_IMPL] ����@�C

class [!output PROPERTY_PAGE_CLASS] : public COlePropertyPage
{
	DECLARE_DYNCREATE([!output PROPERTY_PAGE_CLASS])
	DECLARE_OLECREATE_EX([!output PROPERTY_PAGE_CLASS])

// �غc�禡
public:
	[!output PROPERTY_PAGE_CLASS]();

// ��ܤ�����
	enum { IDD = IDD_PROPPAGE_[!output UPPER_CASE_SAFE_PROJECT_IDENTIFIER_NAME] };

// �{���X��@
protected:
	virtual void DoDataExchange(CDataExchange* pDX);    // DDX/DDV �䴩

// �T������
protected:
	DECLARE_MESSAGE_MAP()
};

