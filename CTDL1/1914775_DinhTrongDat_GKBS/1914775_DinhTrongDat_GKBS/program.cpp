#include <iostream>
#include <fstream>
#include <string.h>
#include <iomanip>
#include <conio.h>

using namespace std;

#include "1914775_thuvien.h"
#include "1914775_menu.h"

void ChayChuongTrinh();

int main()
{
	ChayChuongTrinh();
	return 1;
}

void ChayChuongTrinh()
{
	int soMenu = MAX_MENU,
		menu;
	list l;
	char filename[MAX];
	do
	{
		system("CLS");
		cout << "\nNhap ten tap tin, filename = ";
		_flushall();
		cin >> filename;
		if (!Chuyen_TapTin_List(filename, l))
		{
			cout << "\nLoi mo file ! nhap lai\n";
			_getch();
		}
		else
		{
			cout << "\nDu lieu tap tin " << filename << " da duoc chuyen vao DSLKDV l"
				<< "\nNhan phim bat ky de tiep tuc";
			_getch();
			break;
		}
	} while (1);
	do
	{
		system("CLS");
		menu = ChonMenu(soMenu);
		XuLyMenu(menu, l);
		cout << endl;
		system("PAUSE");
	} while (menu > 0);
}