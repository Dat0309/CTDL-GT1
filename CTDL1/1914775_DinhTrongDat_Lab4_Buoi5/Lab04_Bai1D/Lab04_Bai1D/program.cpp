#include <iostream>
#include <fstream>
#include <math.h>
using namespace std;
#include"thuvien.h"
#include"menu.h"
void ChayChuongTrinh();

void ChayChuongTrinh()
{
	int soMenu = MAX_MENU,
		menu;
	LIST l;
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