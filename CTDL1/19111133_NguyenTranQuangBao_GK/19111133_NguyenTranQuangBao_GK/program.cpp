#include<iostream>
#include<fstream>
#include<string.h>
#include<iomanip>

using namespace std;

#include"1911133_Thuvien.h"
#include"1911133_Menu.h"

void ChayChuongTrinh()
{
	LL l;
	int menu, somenu = 5;
	do
	{
		menu = ChonMenu(somenu);
		XuLyMenu(menu, l);
	} while (menu > 0);
}
int main()
{
	ChayChuongTrinh();
	return 1;
}