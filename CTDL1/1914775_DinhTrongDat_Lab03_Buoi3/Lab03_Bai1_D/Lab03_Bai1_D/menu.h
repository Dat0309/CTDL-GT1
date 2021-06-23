
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
	cout << "\n4. Chen truc tiep";
	cout << "\n5. Doi cho truc tiep";
	cout << "\n6. Bubble sort";
	cout << "\n7. Chen nhi phan";
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
		cout << "\n3. Chon truc tiep";
		cout << "\nMang vua tao:\n";
		Output(a, n);
		Selection_L(a, n);
		cout << "\nMang sau khi sap xep chon truc tiep la: \n";
		Output(a, n);
		cout << endl;
		break;
	case 4:
		cout << "\n4. Chen truc tiep";
		cout << "\nMang vua tao:\n";
		Output(a, n);
		Insertion_L(a, n);
		cout << "\nMang sau khi sap xep chen truc tiep la: \n";
		Output(a, n);
		cout << endl;
		break;
	case 5:
		cout << "\n5. Doi cho truc tiep";
		cout << "\nMang vua tao:\n";
		Output(a, n);
		Interchange_L(a, n);
		cout << "\nMang sau khi sap xep doi truc tiep la: \n";
		Output(a, n);
		cout << endl;
		break;
	case 6:
		cout << "\n6. Bubble sort";
		cout << "\Mang vua tao:\n";
		Output(a, n);
		Buble_L(a, n);
		cout << "\nMang sau khi sap xep kieu bubble là: \n";
		Output(a, n);
		cout << endl;
		break;
	case 7:
		cout << "\n7. Chen nhi phan";
		cout << "\nMang vua tao la:\n";
		Output(a, n);
		Binary_Insertion(a, n);
		cout << "\nMang sau khi sap xep chen nhi phan la: \n";
		Output(a, n);
		cout << endl;
		break;
	}

}