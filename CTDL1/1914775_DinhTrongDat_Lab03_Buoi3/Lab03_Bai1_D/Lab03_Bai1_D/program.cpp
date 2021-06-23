#include <iostream>
#include <fstream> 

using namespace std;

#include "thuvien.h" 
#include "menu.h" 

void ChayChuongTrinh();

int main()
{
	ChayChuongTrinh();
	return 1;
}

void ChayChuongTrinh()
{
	int SoMenu = 7,
		menu;
	int a[MAX],
		n = 0;
	do
	{
		system("CLS");
		menu = ChonMenu(SoMenu);
		XuLyMenu(menu, a, n);
		system("PAUSE");
	} while (menu > 0);
}