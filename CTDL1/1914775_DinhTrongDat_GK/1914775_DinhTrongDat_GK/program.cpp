#include<iostream>
#include<iomanip>
#include <fstream>
#include<string.h>
#include<conio.h>
#include <math.h>
using namespace std;
#include"thuvien.h"
#include"1914775_menu.h"

void ChayChuongTrinh();

void ChayChuongTrinh()
{
	int soMenu = MAX_MENU,
		menu;
	LIST l;
	char filename[MAX];
	do
	{
		system("CLS");
		cout << "\nNhap ten tap tin, filename = ";
		_flushall();
		cin >> filename;
		if (!TapTin_List(filename, l))
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

int main()
{
	ChayChuongTrinh();
	return 1;
}