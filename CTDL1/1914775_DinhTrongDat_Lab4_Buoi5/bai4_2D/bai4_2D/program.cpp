#include <iostream>
#include <fstream>
#include <string.h>
#include <iomanip>
#include <conio.h>
using namespace std;

#include "thuvien.h"


void ChayChuongTrinh();

int main()
{
	ChayChuongTrinh();
	return 1;
}

void ChayChuongTrinh()
{
	system("PAUSE");
	LL l;
	BD g;
	char f1[30] = "LLSV.txt", f2[30] = "DiemQT.txt";
	TapTin_List_LL(f1, l);
	TapTin_List_BD(f2, g);
	cout << "\n\:====================DIEM QUA TRINH====================:";
	XuatBangDiem(l, g);
	_getch();
}