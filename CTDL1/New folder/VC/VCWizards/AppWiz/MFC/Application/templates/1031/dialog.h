[!if RIBBON_TOOLBAR]
// In diesem MFC-Beispielquellcode wird die Verwendung der MFC Microsoft Office Fluent-Benutzeroberfläche 
// ("Fluent-Benutzeroberfläche") demonstriert. Der Beispielquellcode wird ausschließlich zu Referenzzwecken und als Ergänzung zur 
// Microsoft Foundation Classes-Referenz und zugehöriger elektronischer Dokumentation 
// bereitgestellt, die in der MFC C++-Bibliotheksoftware enthalten sind.  
// Lizenzbedingungen zum Kopieren, Verwenden oder Verteilen der Fluent-Benutzeroberfläche sind separat erhältlich.  
// Weitere Informationen zum Lizenzierungsprogramm für die Fluent-Benutzeroberfläche finden Sie unter 
// http://go.microsoft.com/fwlink/?LinkId=238214.
//
// Copyright (C) Microsoft Corporation
// Alle Rechte vorbehalten.
[!endif]

// [!output DIALOG_HEADER]: Headerdatei
//

#pragma once

[!if AUTOMATION]
class [!output DIALOG_AUTO_PROXY_CLASS];

[!endif]

// [!output DIALOG_CLASS]-Dialogfeld
class [!output DIALOG_CLASS] : public [!output DIALOG_BASE_CLASS]
{
[!if AUTOMATION]
	DECLARE_DYNAMIC([!output DIALOG_CLASS]);
	friend class [!output DIALOG_AUTO_PROXY_CLASS];

[!endif]
// Konstruktion
public:
	[!output DIALOG_CLASS](CWnd* pParent = NULL);	// Standardkonstruktor
[!if AUTOMATION]
	virtual ~[!output DIALOG_CLASS]();
[!endif]

// Dialogfelddaten
[!if HTML_DIALOG]
	enum { IDD = IDD_[!output UPPER_CASE_SAFE_PROJECT_IDENTIFIER_NAME]_DIALOG, IDH = IDR_HTML_[!output UPPER_CASE_SAFE_PROJECT_IDENTIFIER_NAME]_DIALOG };
[!else]
	enum { IDD = IDD_[!output UPPER_CASE_SAFE_PROJECT_IDENTIFIER_NAME]_DIALOG };
[!endif]

	protected:
	virtual void DoDataExchange(CDataExchange* pDX);	// DDX/DDV-Unterstützung

[!if HTML_DIALOG]
	HRESULT OnButtonOK(IHTMLElement *pElement);
	HRESULT OnButtonCancel(IHTMLElement *pElement);
[!endif]

// Implementierung
protected:
[!if AUTOMATION]
	[!output DIALOG_AUTO_PROXY_CLASS]* m_pAutoProxy;
[!endif]
	HICON m_hIcon;
[!if AUTOMATION]

	BOOL CanExit();
[!endif]

	// Generierte Funktionen für die Meldungstabellen
	virtual BOOL OnInitDialog();
[!if ABOUT_BOX]	
	afx_msg void OnSysCommand(UINT nID, LPARAM lParam);
[!endif]
	afx_msg void OnPaint();
	afx_msg HCURSOR OnQueryDragIcon();
[!if AUTOMATION]
	afx_msg void OnClose();
	virtual void OnOK();
	virtual void OnCancel();
[!endif]
	DECLARE_MESSAGE_MAP()
[!if HTML_DIALOG]
	DECLARE_DHTML_EVENT_MAP()
[!endif]
};
