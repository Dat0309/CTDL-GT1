[!if RIBBON_TOOLBAR]
// Questo codice sorgente degli esempi di MFC illustra l'utilizzo dell'interfaccia utente Microsoft Office Fluent di MFC 
// e viene fornito esclusivamente come riferimento in supplemento 
// al materiale di riferimento e alla documentazione in formato elettronico MFC 
// forniti con il software della libreria MFC C++.  
// Le condizioni di licenza per la copia, l'utilizzo o la distribuzione dell'interfaccia utente Microsoft Office Fluent sono disponibili separatamente.  
// Per ulteriori informazioni sul programma di licenza dell'interfaccia utente Microsoft Office Fluent, visitare il sito 
// http://go.microsoft.com/fwlink/?LinkId=238214.
//
// Copyright (C) Microsoft Corporation
// Tutti i diritti riservati.
[!endif]

#pragma once

class CPropertiesToolBar : public CMFCToolBar
{
public:
	virtual void OnUpdateCmdUI(CFrameWnd* /*pTarget*/, BOOL bDisableIfNoHndler)
	{
		CMFCToolBar::OnUpdateCmdUI((CFrameWnd*) GetOwner(), bDisableIfNoHndler);
	}

	virtual BOOL AllowShowOnList() const { return FALSE; }
};

class CPropertiesWnd : public CDockablePane
{
// Costruzione
public:
	CPropertiesWnd();

	void AdjustLayout();

//  Attributi
public:
	void SetVSDotNetLook(BOOL bSet)
	{
		m_wndPropList.SetVSDotNetLook(bSet);
		m_wndPropList.SetGroupNameFullWidth(bSet);
	}

protected:
	CFont m_fntPropList;
	CComboBox m_wndObjectCombo;
	CPropertiesToolBar m_wndToolBar;
	CMFCPropertyGridCtrl m_wndPropList;

//  Implementazione
public:
	virtual ~CPropertiesWnd();

protected:
	afx_msg int OnCreate(LPCREATESTRUCT lpCreateStruct);
	afx_msg void OnSize(UINT nType, int cx, int cy);
	afx_msg void OnExpandAllProperties();
	afx_msg void OnUpdateExpandAllProperties(CCmdUI* pCmdUI);
	afx_msg void OnSortProperties();
	afx_msg void OnUpdateSortProperties(CCmdUI* pCmdUI);
	afx_msg void OnProperties1();
	afx_msg void OnUpdateProperties1(CCmdUI* pCmdUI);
	afx_msg void OnProperties2();
	afx_msg void OnUpdateProperties2(CCmdUI* pCmdUI);
	afx_msg void OnSetFocus(CWnd* pOldWnd);
	afx_msg void OnSettingChange(UINT uFlags, LPCTSTR lpszSection);

	DECLARE_MESSAGE_MAP()

	void InitPropList();
	void SetPropListFont();

	int m_nComboHeight;
};

