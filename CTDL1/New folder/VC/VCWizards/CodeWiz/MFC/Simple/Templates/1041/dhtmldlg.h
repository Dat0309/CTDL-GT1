#pragma once

#ifdef _WIN32_WCE
#error "CDHtmlDialog �� Windows CE �ł̓T�|�[�g����Ă��܂���B"
#endif 

// [!output CLASS_NAME] �_�C�A���O

class [!output CLASS_NAME] : public CDHtmlDialog
{
	DECLARE_DYNCREATE([!output CLASS_NAME])

public:
	[!output CLASS_NAME](CWnd* pParent = NULL);   // �W���R���X�g���N�^�[
	virtual ~[!output CLASS_NAME]();
// �I�[�o�[���C�h
[!if AUTOMATION || CREATABLE]

	virtual void OnFinalRelease();
[!endif]
	HRESULT OnButtonOK(IHTMLElement *pElement);
	HRESULT OnButtonCancel(IHTMLElement *pElement);

// �_�C�A���O �f�[�^
	enum { IDD = [!output IDD_DIALOG], IDH = [!output HTML_ID] };

protected:
	virtual void DoDataExchange(CDataExchange* pDX);    // DDX/DDV �T�|�[�g
	virtual BOOL OnInitDialog();

	DECLARE_MESSAGE_MAP()
	DECLARE_DHTML_EVENT_MAP()
[!if CREATABLE]
	DECLARE_OLECREATE([!output CLASS_NAME])
[!endif]
[!if AUTOMATION || CREATABLE]
	DECLARE_DISPATCH_MAP()
	DECLARE_INTERFACE_MAP()
[!endif]
};
