#include<iostream>
#include<fstream>
#include<conio.h>

using namespace std;

#include "BSTree.h"
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

	int menu, soMenu = 13;
	BSTree root = NULL;
	do
	{
		menu = ChonMenu(soMenu);
		XuLyMenu(menu, root);
		system("PAUSE");
	} while (menu > 0);

}