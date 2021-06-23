#pragma once


// [!output CLASS_NAME]

class [!output CLASS_NAME] : public [!output BASE_CLASS]
{
[!if CREATABLE]
	DECLARE_DYNCREATE([!output CLASS_NAME])
[!else]
	DECLARE_DYNAMIC([!output CLASS_NAME])
[!endif]

public:
[!if CCOLORDIALOG]
	[!output CLASS_NAME](COLORREF clrInit = 0, DWORD dwFlags = 0, CWnd* pParentWnd = NULL);
[!else]
[!if CFILEDIALOG]
	[!output CLASS_NAME](BOOL bOpenFileDialog, // 对于 FileOpen 为 TRUE，对于 FileSaveAs 为 FALSE
		LPCTSTR lpszDefExt = NULL,
		LPCTSTR lpszFileName = NULL,
		DWORD dwFlags = OFN_HIDEREADONLY | OFN_OVERWRITEPROMPT,
		LPCTSTR lpszFilter = NULL,
		CWnd* pParentWnd = NULL);
[!else]
[!if CFONTDIALOG]
	[!output CLASS_NAME](LPLOGFONT lplfInitial = NULL,
			DWORD dwFlags = CF_EFFECTS | CF_SCREENFONTS,
			CDC* pdcPrinter = NULL,
			CWnd* pParentWnd = NULL);
#ifndef _AFX_NO_RICHEDIT_SUPPORT
	[!output CLASS_NAME](const CHARFORMAT& charformat,
			DWORD dwFlags = CF_SCREENFONTS,
			CDC* pdcPrinter = NULL,
			CWnd* pParentWnd = NULL);
#endif
[!else]
[!if CPAGESETUPDIALOG]
	[!output CLASS_NAME](DWORD dwFlags = PSD_MARGINS | PSD_INWININIINTLMEASURE, CWnd* pParentWnd = NULL);
[!else]
[!if CPRINTDIALOG]
	[!output CLASS_NAME](BOOL bPrintSetupOnly,
			// 对于“打印设置”为 TRUE，对于“打印对话框”为 FALSE
			DWORD dwFlags = PD_ALLPAGES | PD_USEDEVMODECOPIES | PD_NOPAGENUMS
				| PD_HIDEPRINTTOFILE | PD_NOSELECTION,
			CWnd* pParentWnd = NULL);
[!else]
[!if CVSTOOLSLISTBOX]
	[!output CLASS_NAME](CMFCToolBarsToolsPropertyPage* pParent);
[!else]
	[!output CLASS_NAME]();
[!endif]
[!endif]
[!endif]
[!endif]
[!endif]
[!endif]
	virtual ~[!output CLASS_NAME]();
[!if AUTOMATION || CREATABLE]

	virtual void OnFinalRelease();
[!endif]
[!if CCONTROLBAR]
	virtual void OnUpdateCmdUI(CFrameWnd* pTarget, BOOL bDisableIfNoHndler);
[!endif]

protected:
	DECLARE_MESSAGE_MAP()
[!if CREATABLE]
	DECLARE_OLECREATE([!output CLASS_NAME])
[!endif]
[!if AUTOMATION || CREATABLE]
	DECLARE_DISPATCH_MAP()
	DECLARE_INTERFACE_MAP()
[!endif]
};


