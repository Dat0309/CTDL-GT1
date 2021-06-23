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

// [!output WND_VIEW_HEADER]: Schnittstelle der Klasse [!output WND_VIEW_CLASS]
//


#pragma once


// [!output WND_VIEW_CLASS]-Fenster

class [!output WND_VIEW_CLASS] : public [!output WND_VIEW_BASE_CLASS]
{
// Konstruktion
public:
	[!output WND_VIEW_CLASS]();

// Attribute
public:

// Vorgänge
public:

// Überschreibungen
	protected:
	virtual BOOL PreCreateWindow(CREATESTRUCT& cs);

// Implementierung
public:
	virtual ~[!output WND_VIEW_CLASS]();

	// Generierte Funktionen für die Meldungstabellen
protected:
	afx_msg void OnPaint();
	DECLARE_MESSAGE_MAP()
};

