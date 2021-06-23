// dllmain.cpp: ���������� ��������� ������������� ��� DLL.
//

#include "stdafx.h"
#include <afxwin.h>
#include <afxdllx.h>

#ifdef _DEBUG
#define new DEBUG_NEW
#endif

static AFX_EXTENSION_MODULE [!output SAFE_PROJECT_IDENTIFIER_NAME]DLL = { NULL, NULL };

extern "C" int APIENTRY
DllMain(HINSTANCE hInstance, DWORD dwReason, LPVOID lpReserved)
{
	// ������� ���� ���, ���� �� ����������� lpReserved
	UNREFERENCED_PARAMETER(lpReserved);

	if (dwReason == DLL_PROCESS_ATTACH)
	{
		TRACE0("������������� [!output PROJECT_NAME].DLL!\n");
		
		// ����������� ������������� DLL ����������
		if (!AfxInitExtensionModule([!output SAFE_PROJECT_IDENTIFIER_NAME]DLL, hInstance))
			return 0;

		// �������� DLL � ������� ��������
		// ����������. ���� ����������� ������� �������� ������ DLL ���������� � �������
		//  ������� MFC DLL (��������, ������� ActiveX),
		//  � �� ���������� MFC, �� �������
		//  ������� ������ ������ �� DllMain � ��������� �� � ���������
		//  �������, ���������������� �� ������ DLL ����������.  ������� DLL-����������,
		//  ������������ ��� DLL ����������, ������ ����� ����� ������� ������� ������
		//  ������� ��� ������������� DLL ����������.  � ��������� ������
		//  ������ CDynLinkLibrary �� ����� ���������� �
		//  ������� �������� ������� DLL, ��� �������� � ��������� ���������
		//  .

		new CDynLinkLibrary([!output SAFE_PROJECT_IDENTIFIER_NAME]DLL);

[!if SOCKETS]
		// ������������� �������
		// ����������. ���� ����������� ������� �������� ������ DLL ���������� � �������
		//  ������� MFC DLL (��������, ������� ActiveX),
		//  � �� ���������� MFC, �� �������
		//  ������� ��������� ������ �� DllMain � ��������� �� � ���������
		//  �������, ���������������� �� ������ DLL ����������.  ������� DLL-����������,
		//  ������������ ��� DLL ����������, ������ ����� ����� ������� ������� ������
		//  ������� ��� ������������� DLL ����������.
		if (!AfxSocketInit())
		{
			return FALSE;
		}
	
[!endif]
	}
	else if (dwReason == DLL_PROCESS_DETACH)
	{
		TRACE0("���������� ������ [!output PROJECT_NAME].DLL!\n");

		// ��������� ������ ����������, ������ ��� ����� ������� �����������
		AfxTermExtensionModule([!output SAFE_PROJECT_IDENTIFIER_NAME]DLL);
	}
	return 1;   // ��
}
