// [!output HEADER_FILE] : Declaration of the [!output CLASS_NAME]

#pragma once

[!if !DEVICE]
#include "resource.h"       // main symbols
[!else]
#ifdef STANDARDSHELL_UI_MODEL
#include "resource.h"
#endif
#ifdef POCKETPC2003_UI_MODEL
#include "resourceppc.h"
#endif 
#ifdef SMARTPHONE2003_UI_MODEL
#include "resourcesp.h"
#endif
#ifdef AYGSHELL_UI_MODEL
#include "resourceayg.h"
#endif
[!endif]

#include <atlhost.h>

using namespace ATL;

// [!output CLASS_NAME]

class [!output CLASS_NAME] : 
	public CAxDialogImpl<[!output CLASS_NAME]>
{
public:
	[!output CLASS_NAME]()
	{
	}

	~[!output CLASS_NAME]()
	{
	}

	enum { IDD = [!output IDD_DIALOGID] };

BEGIN_MSG_MAP([!output CLASS_NAME])
	MESSAGE_HANDLER(WM_INITDIALOG, OnInitDialog)
[!if DEVICE]
#if defined(_DEVICE_RESOLUTION_AWARE) && !defined(WIN32_PLATFORM_WFSP)
	MESSAGE_HANDLER(WM_SIZE, OnSize)
#endif
#ifndef SHELL_AYGSHELL
[!endif]
	COMMAND_HANDLER(IDOK, BN_CLICKED, OnClickedOK)
	COMMAND_HANDLER(IDCANCEL, BN_CLICKED, OnClickedCancel)
[!if DEVICE]
#else
	COMMAND_ID_HANDLER(IDOK, OnClickedOK)
#endif
[!endif]
	CHAIN_MSG_MAP(CAxDialogImpl<[!output CLASS_NAME]>)
END_MSG_MAP()

// Handler prototypes:
//  LRESULT MessageHandler(UINT uMsg, WPARAM wParam, LPARAM lParam, BOOL& bHandled);
//  LRESULT CommandHandler(WORD wNotifyCode, WORD wID, HWND hWndCtl, BOOL& bHandled);
//  LRESULT NotifyHandler(int idCtrl, LPNMHDR pnmh, BOOL& bHandled);

	LRESULT OnInitDialog(UINT uMsg, WPARAM wParam, LPARAM lParam, BOOL& bHandled)
	{
[!if DEVICE]
#ifdef SHELL_AYGSHELL
		SHINITDLGINFO shidi;
		shidi.dwMask = SHIDIM_FLAGS; 
		shidi.dwFlags = SHIDIF_DONEBUTTON | SHIDIF_SIZEDLG; 
		shidi.hDlg = m_hWnd; 
		SHInitDialog(&shidi);
#endif
[!endif]
		CAxDialogImpl<[!output CLASS_NAME]>::OnInitDialog(uMsg, wParam, lParam, bHandled);
		bHandled = TRUE;
		return 1;  // Let the system set the focus
	}

	LRESULT OnClickedOK(WORD wNotifyCode, WORD wID, HWND hWndCtl, BOOL& bHandled)
	{
		EndDialog(wID);
		return 0;
	}

	LRESULT OnClickedCancel(WORD wNotifyCode, WORD wID, HWND hWndCtl, BOOL& bHandled)
	{
		EndDialog(wID);
		return 0;
	}
[!if DEVICE]
#if defined(_DEVICE_RESOLUTION_AWARE) && !defined(WIN32_PLATFORM_WFSP)
	LRESULT OnSize(UINT /*uMsg*/, WPARAM /*wParam*/, LPARAM /*lParam*/, BOOL& /*bHandled*/)
	{
		DRA::RelayoutDialog(
			_AtlBaseModule.GetResourceInstance(),
			m_hWnd, 
			DRA::GetDisplayMode() != DRA::Portrait ? MAKEINTRESOURCE([!output IDD_DIALOGID_WIDE]) : MAKEINTRESOURCE([!output IDD_DIALOGID]));
		return 0;
	}
#endif
[!endif]
};


