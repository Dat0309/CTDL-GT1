#include <iostream>
using namespace std;
#include "Thuvien.h"
void ChayChuongTrinh();
int main()
{
	ChayChuongTrinh();
	return 1;
}
void ChayChuongTrinh()
{
	int a[MAX], n;
	int m;
	cout << "\nn = "; cin >> n;
	NhapDay(a, n);
	cout << "\nm = "; cin >> m;
	cout << "\nDay ban dau:\n";
	XuatDay(a, n);
	Transpose(a, n, m);
	cout << "\nDay ket qua:\n";
	XuatDay(a, n);
	cout << endl;
	system("PAUSE");
}