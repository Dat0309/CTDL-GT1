#include<iostream>
#include<conio.h>
#include<string.h>
#include<fstream>
#include<iomanip>

using namespace std;
#include"HeaderTD.h"
#include"thuvien.h"
#include"HeaderDB.h"
#include"xephang.h"
#include"1914775_menu.h"
void ChayChuongTrinh();

int main()
{
	ChayChuongTrinh();
	return 1;
}
void ChayChuongTrinh()
{
	int soMenu = 7,
		menu,
		n = 0;
	LIST_KQTD l;
	LIST_KQXH L;
	do
	{
		system("CLS");
		menu = ChonMenu(soMenu);
		XulyMenu(menu, l, L);
		cout << endl;
		system("PAUSE");
	} while (menu > 0);
}