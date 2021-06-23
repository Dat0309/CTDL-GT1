#include <iostream>
#include <fstream> 
#include<conio.h>
#include <math.h> 

using namespace std; 

#include "Header.h" 
#include "thuVien.h"
#include "menu.h"

void ChayChuongTrinh();


void ChayChuongTrinh()
{
	int soMenu = MAX_MENU, menu; 
	LLIST l;
	char filename[MAX]; 
	//Dieu khien viec chon file cho dung  do 
	{  
		system("CLS");  
		cout << "\nNhap ten tap tin, filename = ";  
		_flushall();  
		cin >> filename; 
		if (!File_LLIST(filename, l)) 
		{   
			cout << "\nLoi mo file ! nhap lai\n"; 
			_getch();  
		}  
		else 
		{  
			cout << "\nDu lieu tap tin " << filename << " da duoc chuyen vao DSLKDV l"     <<"\nNhan phim bat ky de tiep tuc";  
			_getch();   
			
		} 
	}
	while (1);  
	//Dieu khien menu  do
	{   
		system("CLS");  
		menu = ChonMenu(soMenu); 
		XuLyMenu(menu, l); 
		system("PAUSE"); 

	} 
	while (menu > 0);
}

int main()
{ 
	ChayChuongTrinh();  
	return 1;
}