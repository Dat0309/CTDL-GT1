// [!output CONTROL_IMPL]�: impl�mentation de la classe du contr�le ActiveX [!output CONTROL_CLASS].

#include "stdafx.h"
#include "[!output PROJECT_NAME].h"
#include "[!output CONTROL_HEADER]"
#include "[!output PROPERTY_PAGE_HEADER]"
#include "afxdialogex.h"

#ifdef _DEBUG
#define new DEBUG_NEW
#endif

IMPLEMENT_DYNCREATE([!output CONTROL_CLASS], COleControl)

// Table des messages

BEGIN_MESSAGE_MAP([!output CONTROL_CLASS], COleControl)
[!if SUBCLASS_WINDOW]
	ON_MESSAGE(OCM_COMMAND, &[!output CONTROL_CLASS]::OnOcmCommand)
[!endif]
[!if INSERTABLE]
	ON_OLEVERB(AFX_IDS_VERB_EDIT, OnEdit)
[!endif]
	ON_OLEVERB(AFX_IDS_VERB_PROPERTIES, OnProperties)
END_MESSAGE_MAP()

// Table de dispatch

BEGIN_DISPATCH_MAP([!output CONTROL_CLASS], COleControl)
[!if ASYNC_PROPERTY_LOAD]
	DISP_STOCKPROP_READYSTATE()
[!endif]
[!if ABOUT_BOX]
	DISP_FUNCTION_ID([!output CONTROL_CLASS], "AboutBox", DISPID_ABOUTBOX, AboutBox, VT_EMPTY, VTS_NONE)
[!endif]
END_DISPATCH_MAP()

// Table d'�v�nements

BEGIN_EVENT_MAP([!output CONTROL_CLASS], COleControl)
[!if ASYNC_PROPERTY_LOAD]
	EVENT_STOCK_READYSTATECHANGE()
[!endif]
END_EVENT_MAP()

// Pages de propri�t�s

// TODO: ajoutez autant de pages de propri�t�s que n�cessaire.  N'oubliez pas d'augmenter le compteur�!
BEGIN_PROPPAGEIDS([!output CONTROL_CLASS], 1)
	PROPPAGEID([!output PROPERTY_PAGE_CLASS]::guid)
END_PROPPAGEIDS([!output CONTROL_CLASS])

// Initialisation de la fabrique de classes et du guid

[!if CONTROL_TYPE_ID_SET]
IMPLEMENT_OLECREATE_EX([!output CONTROL_CLASS], "[!output CONTROL_TYPE_ID]",
	[!output CONTROL_CLSID_IMPLEMENT_OLECREATE_FORMAT])
[!else]
IMPLEMENT_OLECREATE_NOREGNAME([!output CONTROL_CLASS],
	[!output CONTROL_CLSID_IMPLEMENT_OLECREATE_FORMAT])
[!endif]

// ID et version de biblioth�que de types

IMPLEMENT_OLETYPELIB([!output CONTROL_CLASS], _tlid, _wVerMajor, _wVerMinor)

// ID d'interface

const IID IID_D[!output SAFE_PROJECT_IDENTIFIER_NAME] = [!output PRIMARY_IID_STATIC_CONST_GUID_FORMAT];
const IID IID_D[!output SAFE_PROJECT_IDENTIFIER_NAME]Events = [!output EVENT_IID_STATIC_CONST_GUID_FORMAT];

// Informations de type du contr�le

static const DWORD _dw[!output SAFE_PROJECT_IDENTIFIER_NAME]OleMisc =
[!if SIMPLE_FRAME]
	OLEMISC_SIMPLEFRAME |
[!endif]
[!if INVISIBLE_AT_RUNTIME]
	OLEMISC_INVISIBLEATRUNTIME |
[!endif]
[!if ACTIVATE_WHEN_VISIBLE]
	OLEMISC_ACTIVATEWHENVISIBLE |
[!if MOUSE_NOTIFICATIONS]
	OLEMISC_IGNOREACTIVATEWHENVISIBLE |
[!endif]
[!endif]
	OLEMISC_SETCLIENTSITEFIRST |
	OLEMISC_INSIDEOUT |
	OLEMISC_CANTLINKINSIDE |
	OLEMISC_RECOMPOSEONRESIZE;

IMPLEMENT_OLECTLTYPE([!output CONTROL_CLASS], IDS_[!output UPPER_CASE_SAFE_PROJECT_IDENTIFIER_NAME], _dw[!output SAFE_PROJECT_IDENTIFIER_NAME]OleMisc)

// [!output CONTROL_CLASS]::[!output CONTROL_CLASS]Factory::UpdateRegistry -
// Ajoute ou supprime les entr�es de la base de registres pour [!output CONTROL_CLASS]

BOOL [!output CONTROL_CLASS]::[!output CONTROL_CLASS]Factory::UpdateRegistry(BOOL bRegister)
{
	// TODO: v�rifiez que votre contr�le suit les r�gles du mod�le de thread apartment.
	// Reportez-vous � MFC TechNote 64 pour plus d'informations.
	// Si votre contr�le ne se conforme pas aux r�gles du mod�le apartment, vous
	// devez modifier le code ci-dessous, en modifiant le 6� param�tre de
[!if INSERTABLE]
	// afxRegInsertable | afxRegApartmentThreading en afxRegInsertable.
[!else]
	// afxRegApartmentThreading en 0.
[!endif]

	if (bRegister)
		return AfxOleRegisterControlClass(
			AfxGetInstanceHandle(),
			m_clsid,
			m_lpszProgID,
			IDS_[!output UPPER_CASE_SAFE_PROJECT_IDENTIFIER_NAME],
			IDB_[!output UPPER_CASE_SAFE_PROJECT_IDENTIFIER_NAME],
[!if INSERTABLE]
			afxRegInsertable | afxRegApartmentThreading,
[!else]
			afxRegApartmentThreading,
[!endif]
			_dw[!output SAFE_PROJECT_IDENTIFIER_NAME]OleMisc,
			_tlid,
			_wVerMajor,
			_wVerMinor);
	else
		return AfxOleUnregisterClass(m_clsid, m_lpszProgID);
}

[!if RUNTIME_LICENSE]

// Cha�nes de licence

static const TCHAR _szLicFileName[] = _T("[!output PROJECT_NAME].lic");
static const WCHAR _szLicString[] = L"Copyright (c) [!output YEAR] [!output COMPANY_NAME]";

// [!output CONTROL_CLASS]::[!output CONTROL_CLASS]Factory::VerifyUserLicense -
// Contr�le l'existence d'une licence utilisateur

BOOL [!output CONTROL_CLASS]::[!output CONTROL_CLASS]Factory::VerifyUserLicense()
{
	return AfxVerifyLicFile(AfxGetInstanceHandle(), _szLicFileName,
		_szLicString);
}

// [!output CONTROL_CLASS]::[!output CONTROL_CLASS]Factory::GetLicenseKey -
// Retourne une cl� de licence runtime

BOOL [!output CONTROL_CLASS]::[!output CONTROL_CLASS]Factory::GetLicenseKey(DWORD dwReserved,
	BSTR *pbstrKey)
{
	if (pbstrKey == NULL)
		return FALSE;

	*pbstrKey = SysAllocString(_szLicString);
	return (*pbstrKey != NULL);
}

[!endif]

// [!output CONTROL_CLASS]::[!output CONTROL_CLASS] - Constructeur

[!output CONTROL_CLASS]::[!output CONTROL_CLASS]()
{
	InitializeIIDs(&IID_D[!output SAFE_PROJECT_IDENTIFIER_NAME], &IID_D[!output SAFE_PROJECT_IDENTIFIER_NAME]Events);
[!if SIMPLE_FRAME]

	EnableSimpleFrame();
[!endif]
[!if ASYNC_PROPERTY_LOAD]

	m_lReadyState = READYSTATE_LOADING;
	// TODO: appelez InternalSetReadyState lorsque readystate change.
[!endif]
	// TODO: initialisez ici les donn�es de l'instance de votre contr�le.
}

// [!output CONTROL_CLASS]::~[!output CONTROL_CLASS] - Destructeur

[!output CONTROL_CLASS]::~[!output CONTROL_CLASS]()
{
	// TODO: nettoyez ici les donn�es de l'instance de votre contr�le.
}

// [!output CONTROL_CLASS]::OnDraw - Fonction de dessin

void [!output CONTROL_CLASS]::OnDraw(
			CDC* pdc, const CRect& rcBounds, const CRect& /* rcInvalid */)
{
	if (!pdc)
		return;

[!if SUBCLASS_WINDOW]
	DoSuperclassPaint(pdc, rcBounds);
[!else]
	// TODO: remplacez le code suivant par votre code de dessin.
	pdc->FillRect(rcBounds, CBrush::FromHandle((HBRUSH)GetStockObject(WHITE_BRUSH)));
	pdc->Ellipse(rcBounds);
[!endif]
[!if OPTIMIZED_DRAW]

	if (!IsOptimizedDraw())
	{
		// Le conteneur ne prend pas en charge le dessin optimis�.

		// TODO: si vous avez s�lectionn� un objet GDI quelconque dans le contexte de p�riph�rique *pdc,
		//		restaurez ici les objets pr�c�demment s�lectionn�s.
	}
[!endif]
}

// [!output CONTROL_CLASS]::DoPropExchange - Prise en charge de la persistance

void [!output CONTROL_CLASS]::DoPropExchange(CPropExchange* pPX)
{
	ExchangeVersion(pPX, MAKELONG(_wVerMinor, _wVerMajor));
	COleControl::DoPropExchange(pPX);

	// TODO: appelez les fonctions PX_ pour chaque propri�t� personnalis�e persistante.
}

[!if WINDOWLESS || UNCLIPPED_DEVICE_CONTEXT || FLICKER_FREE || MOUSE_NOTIFICATIONS || OPTIMIZED_DRAW]

// [!output CONTROL_CLASS]::GetControlFlags -
// Indicateurs permettant de personnaliser l'impl�mentation MFC des contr�les ActiveX.
//
DWORD [!output CONTROL_CLASS]::GetControlFlags()
{
	DWORD dwFlags = COleControl::GetControlFlags();

[!if UNCLIPPED_DEVICE_CONTEXT]
	// La sortie du contr�le n'est pas coup�e.
	// Le contr�le garantit qu'il ne dessinera pas en dehors de son
	// rectangle client.
	dwFlags &= ~clipPaintDC;
[!endif]
[!if WINDOWLESS]

	// Ce contr�le peut �tre activ� sans cr�er une fen�tre.
	// TODO: lors de l'�criture de gestionnaires de messages du contr�le, n'utilisez pas
	//		la variable membre m_hWnd sans contr�ler au pr�alable que sa
	//		valeur n'est pas NULL.
	dwFlags |= windowlessActivate;
[!endif]
[!if FLICKER_FREE]

	// Ce contr�le ne sera pas redessin� lors d'une transition
	// entre l'�tat actif et inactif.
	dwFlags |= noFlickerActivate;
[!endif]
[!if MOUSE_NOTIFICATIONS]

	// Ce contr�le peut recevoir des notifications de la souris lorsqu'il est inactif.
	// TODO: si vous �crivez des gestionnaires pour WM_SETCURSOR et WM_MOUSEMOVE,
	//		n'utilisez pas la variable membre m_hWnd sans contr�ler au pr�alable
	//		que sa valeur n'est pas NULL.
	dwFlags |= pointerInactive;
[!endif]
[!if OPTIMIZED_DRAW]

	// Le contr�le peut optimiser sa m�thode OnDraw en ne restaurant pas
	// les objets GDI d'origine dans le contexte de p�riph�rique.
	dwFlags |= canOptimizeDraw;
[!endif]
	return dwFlags;
}

[!endif]

// [!output CONTROL_CLASS]::OnResetState - R�initialise le contr�le � son �tat par d�faut

void [!output CONTROL_CLASS]::OnResetState()
{
	COleControl::OnResetState();  // R�initialise les valeurs par d�faut trouv�es dans DoPropExchange

	// TODO: r�initialisez ici les autres valeurs d'�tat du contr�le.
}

[!if ABOUT_BOX]

// [!output CONTROL_CLASS]::AboutBox - Affiche une bo�te de dialogue "� propos de" � l'utilisateur

void [!output CONTROL_CLASS]::AboutBox()
{
	CDialogEx dlgAbout(IDD_ABOUTBOX_[!output UPPER_CASE_SAFE_PROJECT_IDENTIFIER_NAME]);
	dlgAbout.DoModal();
}

[!endif]
[!if SUBCLASS_WINDOW]

// [!output CONTROL_CLASS]::PreCreateWindow - Modifie les param�tres pour CreateWindowEx

BOOL [!output CONTROL_CLASS]::PreCreateWindow(CREATESTRUCT& cs)
{
[!if SUBCLASS_WINDOW]
	cs.lpszClass = _T("[!output WINDOW_CLASS]");
[!else]
	// TODO: indiquez le nom de la classe de fen�tre � sous-classer.
	cs.lpszClass = _T("");
[!endif]
	return COleControl::PreCreateWindow(cs);
}

// [!output CONTROL_CLASS]::IsSubclassedControl - Il s'agit d'un contr�le sous-class�

BOOL [!output CONTROL_CLASS]::IsSubclassedControl()
{
	return TRUE;
}

// [!output CONTROL_CLASS]::OnOcmCommand - G�re les messages de commande

LRESULT [!output CONTROL_CLASS]::OnOcmCommand(WPARAM wParam, LPARAM lParam)
{
	WORD wNotifyCode = HIWORD(wParam);

	// TODO: activez ici wNotifyCode.

	return 0;
}

[!endif]

// Gestionnaires de messages de [!output CONTROL_CLASS]
