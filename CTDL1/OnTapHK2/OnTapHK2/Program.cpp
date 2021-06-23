#include<iostream>
#include<fstream>
#include<string.h>
#include<iomanip>
#include<conio.h>

using namespace std;

#include "thuvien.h"
#include "menu.h"

void ChayChuongTrinh()
{
	
	LL l;
	int menu, soMenu = 5;
	do
	{
		menu = ChonMenu(soMenu);
		XuLyMenu(menu, l);
	} while (menu > 0);
	system("PAUSE");

}

int main()
{
	ChayChuongTrinh();
	return 1;
}