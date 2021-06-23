#include<iostream>
#include<string.h>
#include<fstream>
#include<conio.h>
#include<iomanip>

using namespace std;

#include "Header.h"
#include "Thuvien.h"
#include "Menu.h"

void ChayChuongTrinh();
int main()
{
	ChayChuongTrinh();
	return 1;
}

void ChayChuongTrinh()
{
	BSTree root = NULL;
	int menu, soMenu = 7;
	do
	{
		menu = ChonMenu(soMenu);
		XuLyMenu(menu, root);
		system("PAUSE");
	} while (menu > 0);
}