#include <iostream>
#include <fstream>
#include<conio.h>
#include <math.h>
using namespace std;
#include"Header.h"
#include"Thuvien.h"
void ChayChuongTrinh();
void ChayChuongTrinh()
{
    int menu;
    LLIST l;
    char filename[MAX];
    do
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
            cout << "\nDu lieu tap tin " << filename << " da duoc chuyen vao DSLKDV l"
                << "\nNhan phim bat ky de tiep tuc";
            _getch();
            break;
        }
    } while (1);
}
int main()
{
    ChayChuongTrinh();
    return 1;
}