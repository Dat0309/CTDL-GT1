#include <iostream>
#include <fstream> 
#include<iomanip>
#include<string.h> 

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

	nhanvien a[MAX];
	int soMenu = 4, menu, n = 0;
	do
	{
		system("CLS");
		menu = ChonMenu(soMenu);
		XuLyMenu(menu, a, n);
		system("PAUSE");
	} while (menu > 0);
}