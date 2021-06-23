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

// [!output SERVER_ITEM_IMPL]: Implementierung der Klasse [!output SERVER_ITEM_CLASS]
//

#include "stdafx.h"
#include "[!output APP_HEADER]"

#include "[!output DOC_HEADER]"
#include "[!output SERVER_ITEM_HEADER]"
[!if CONTAINER_SERVER]
#include "[!output CONTAINER_ITEM_HEADER]"
[!endif]

#ifdef _DEBUG
#define new DEBUG_NEW
#endif


// [!output SERVER_ITEM_CLASS]-Implementierung

IMPLEMENT_DYNAMIC([!output SERVER_ITEM_CLASS], [!output SERVER_ITEM_BASE_CLASS])

[!output SERVER_ITEM_CLASS]::[!output SERVER_ITEM_CLASS]([!output DOC_CLASS]* pContainerDoc)
	: [!output SERVER_ITEM_BASE_CLASS](pContainerDoc, TRUE)
{
	// TODO: Hier Code für One-Time-Konstruktion einfügen
	//  (z.B. Hinzufügen von zusätzlichen Zwischenablageformaten zur Datenquelle des Elements)
}

[!output SERVER_ITEM_CLASS]::~[!output SERVER_ITEM_CLASS]()
{
	// TODO: Hier Bereinigungscode hinzufügen
}

void [!output SERVER_ITEM_CLASS]::Serialize(CArchive& ar)
{
	// [!output SERVER_ITEM_CLASS]::Serialize wird automatisch aufgerufen, wenn
	//  das Element in die Zwischenablage kopiert wird.  Dies kann automatisch
	//  über die OLE-Rückruffunktion OnGetClipboardData geschehen.  Ein Standardwert für
	//  das eingebundene Element dient einfach zur Delegierung der Serialisierungsfunktion des
	//  Dokuments.  Wenn Sie Links unterstützen, möchten Sie vielleicht nur einen Teil des
	//  Dokuments serialisieren.

	if (!IsLinkedItem())
	{
		[!output DOC_CLASS]* pDoc = GetDocument();
		ASSERT_VALID(pDoc);
		if (pDoc)
			pDoc->Serialize(ar);
	}
}

BOOL [!output SERVER_ITEM_CLASS]::OnGetExtent(DVASPECT dwDrawAspect, CSize& rSize)
{
	// Die meisten Anwendungen (wie auch diese) unterstützen als einzigen Aspekt das Zeichnen
	//  des Elementinhalts.  Möchten Sie andere Aspekte unterstützen, wie z.B.
	//  DVASPECT_THUMBNAIL (durch Überschreiben von OnDrawEx), sollte diese
	//  Implementierung von OnGetExtent dahingehend geändert werden, dass sie
	//  zusätzliche Aspekte verarbeiten kann.

	if (dwDrawAspect != DVASPECT_CONTENT)
		return [!output SERVER_ITEM_BASE_CLASS]::OnGetExtent(dwDrawAspect, rSize);

	// [!output SERVER_ITEM_CLASS]::OnGetExtent wird aufgerufen, um das Extent in
	//  HIMETRIC-Einheiten des gesamten Elements zu ermitteln.  Die Standardimplementierung
	//  liefert hier einfach eine fest programmierte Einheitenanzahl zurück.

	// TODO: Ersetzen Sie diese willkürlich gewählte Größe

	rSize = CSize(3000, 3000);   // 3000 x 3000 HIMETRIC-Einheiten

	return TRUE;
}

BOOL [!output SERVER_ITEM_CLASS]::OnDraw(CDC* pDC, CSize& rSize)
{
	if (!pDC)
		return FALSE;

	// Entfernen Sie dies, wenn Sie rSize verwenden
	UNREFERENCED_PARAMETER(rSize);

	// TODO: Legen Sie Zuordnungsmodus und Extent fest
	//  (Das Extent stimmt üblicherweise mit der von OnGetExtent zurückgelieferten Größe überein)
	pDC->SetMapMode(MM_ANISOTROPIC);
	pDC->SetWindowOrg(0,0);
	pDC->SetWindowExt(3000, 3000);

	// TODO: Hier Code zum Zeichnen einfügen.  Füllen Sie wahlweise das HIMETRIC-Extent aus.
	//  Alle Zeichenoperationen finden innerhalb des Metadatei-Gerätekontexts (pDC) statt.

[!if CONTAINER_SERVER]
	// TODO: Auch eingebettete [!output CONTAINER_ITEM_CLASS]-Objekte zeichnen.

[!endif]
[!if CONTAINER_SERVER]
	// Der folgende Code zeichnet das erste Element an einer willkürlich gewählten Position.

	// TODO: Entfernen Sie diesen Code, sobald die richtige Zeichenroutine vollständig ist

	[!output DOC_CLASS]* pDoc = GetDocument();
	ASSERT_VALID(pDoc);
	if (!pDoc)
		return FALSE;

	POSITION pos = pDoc->GetStartPosition();
	[!output CONTAINER_ITEM_CLASS]* pItem = DYNAMIC_DOWNCAST([!output CONTAINER_ITEM_CLASS], pDoc->GetNextClientItem(pos));
	if (pItem != NULL)
		pItem->Draw(pDC, CRect(10, 10, 1010, 1010));
[!endif]
	return TRUE;
}


// [!output SERVER_ITEM_CLASS]-Diagnose

#ifdef _DEBUG
void [!output SERVER_ITEM_CLASS]::AssertValid() const
{
	[!output SERVER_ITEM_BASE_CLASS]::AssertValid();
}

void [!output SERVER_ITEM_CLASS]::Dump(CDumpContext& dc) const
{
	[!output SERVER_ITEM_BASE_CLASS]::Dump(dc);
}
#endif

