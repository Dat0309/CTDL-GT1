#pragma once

// [!output PROPERTY_PAGE_HEADER] : [!output PROPERTY_PAGE_CLASS] �Ӽ� ������ Ŭ������ �����Դϴ�.


// [!output PROPERTY_PAGE_CLASS] : ������ ������ [!output PROPERTY_PAGE_IMPL]��(��) �����Ͻʽÿ�.

class [!output PROPERTY_PAGE_CLASS] : public COlePropertyPage
{
	DECLARE_DYNCREATE([!output PROPERTY_PAGE_CLASS])
	DECLARE_OLECREATE_EX([!output PROPERTY_PAGE_CLASS])

// �������Դϴ�.
public:
	[!output PROPERTY_PAGE_CLASS]();

// ��ȭ ���� �������Դϴ�.
	enum { IDD = IDD_PROPPAGE_[!output UPPER_CASE_SAFE_PROJECT_IDENTIFIER_NAME] };

// �����Դϴ�.
protected:
	virtual void DoDataExchange(CDataExchange* pDX);    // DDX/DDV �����Դϴ�.

// �޽��� ���Դϴ�.
protected:
	DECLARE_MESSAGE_MAP()
};

