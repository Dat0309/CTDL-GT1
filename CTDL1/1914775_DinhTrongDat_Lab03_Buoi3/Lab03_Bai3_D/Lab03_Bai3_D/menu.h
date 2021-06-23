
void XuatMenu();
int ChonMenu(int SoMenu);
void XuLyMenu(int menu, int a[MAX], int &n);

void XuatMenu()
{
	cout << "\n=================He thong chuc nang================";
	cout << "\n0. Thoat khoi chuong trinh";
	cout << "\n1. Tao du lieu";
	cout << "\n2. Xem du lieu";
	cout << "\n3. Chon truc tiep ";
	cout << "\n4. Chon hai dau";
	cout << "\n5. Chen truc tiep";
	cout << "\n6. Doi cho truc tiep";
	cout << "\n7. Bubblesort";
	cout << "\n8. Sharkersort";
	cout << "\n===================================================";
	cout << "\n                =====================              ";
	cout << "\n             1914775  0(=_=)0                      ";
}

int ChonMenu(int SoMenu)
{
	int stt;
	for (;;)
	{
		system("CLS");
		XuatMenu();
		cout << "\nNhap mot so (0 <= so<=" << SoMenu << ") de chon Menu, stt= ";
		cin >> stt;
		if (0 <= stt&&stt <= SoMenu)
			break;
	}
	return stt;
}

void XuLyMenu(int menu, int a[MAX], int &n)
{

	int kq;
	char filename[MAX];
	switch (menu)
	{
	case 0:
		cout << "\n0. Thoat khoi chuong trinh\n";
		break;
	case 1:
		cout << "\n1. Tao du lieu";
		do
		{
			cout << "\nNhap ten tap tin, filename =\n";
			cin >> filename;
			kq = File_Array(filename, a, n);
		} while (!kq);
		cout << "\nMang vua tao:\n";
		Output(a, n);
		cout << endl;
		break;
	case 2:
		cout << "\n2. Xem du lieu";
		cout << "\nMang vua tao:\n";
		Output(a, n);
		cout << endl;
		break;
	case 3:
		cout << "\n3.Chon truc tiep ";
		cout << "\nMang vua tao:\n";
		Output(a, n);
		Selection_R(a, n);
		cout << "\nMang sau khi sap xep là: \n";
		Output(a, n);
		cout << endl;
		break;
	case 4:
		cout << "\n4. Chon hai dau";
		cout << "\nMang vua tao:\n";
		Output(a, n);
		Selection_R_L(a, n);
		cout << "\nMang vua sap xep la: \n";
		Output(a, n);
		cout << endl;
		break;
	case 5:
		cout << "\n5. Chen truc tiep";
		cout << "\nMang vua tao:\n";
		Output(a, n);
		Insertion_R(a, n);
		cout << "\nMang sau khi sap xep chen truc tiep la: \n";
		Output(a, n);
		cout << endl;
		break;
	case 6:
		cout << "\n6. Doi cho truc tiep";
		cout << "\Mang vua tao:\n";
		Output(a, n);
		Interchange_R(a, n);
		cout << "\nMang sau khi sap xep doi cho truc tiep la: \n";
		Output(a, n);
		cout << endl;
		break;
	case 7:
		cout << "\n7. Bubble sort";
		cout << "\nMang vua tao:\n";
		Output(a, n);
		Buble_R(a, n);
		cout << "\nMang sau khi bubble sort la: \n";
		Output(a, n);
		cout << endl;
		break;
	case 8:
		cout << "\n8.Sharker sort";
		cout << "\nMang vua tao:\n";
		Output(a, n);
		Shaker(a, n);
		cout << "\nMang sau khi Shaker sort la:\n";
		Output(a, n);
		cout << endl;
		break;
	}

}