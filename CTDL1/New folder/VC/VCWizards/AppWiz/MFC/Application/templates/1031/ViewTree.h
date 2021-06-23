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

#pragma once

/////////////////////////////////////////////////////////////////////////////
// CViewTree-Fenster

class CViewTree : public CTreeCtrl
{
// Konstruktion
public:
	CViewTree();

// Überschreibungen
protected:
	virtual BOOL OnNotify(WPARAM wParam, LPARAM lParam, LRESULT* pResult);

// Implementierung
public:
	virtual ~CViewTree();

protected:
	DECLARE_MESSAGE_MAP()
};
