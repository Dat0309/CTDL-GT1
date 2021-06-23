
void XuatMenu();
int ChonMenu(int SoMenu);
void XuLyMenu(int menu, int a[MAX], int &n);

void XuatMenu()
{
	cout << "\n=================He thong chuc nang================";
	cout << "\n0. Thoat khoi chuong trinh";
	cout << "\n1. Tao du lieu";
	cout << "\n2. Xem du lieu";
	cout << "\n3. Tim kiem tuyen tinh - tra ve chi so dau tien";
	cout << "\n4. Tim kiem tuyen tinh - tra ve chi so i dau tien, neu co";
	cout << "\n5. Tim kiem tuyen tinh - Tra ve chi so cuoi cung neu co";
	cout << "\n6. Tra ve tat ca chi so i neu co";
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
			kq = TapTinMang_1c(filename, a, n);
		} while (!kq);
		cout << "\nMang vua tao:\n";
		XuatMang(a, n);
		cout << endl;
		break;
	case 2:
		cout << "\n2. Xem du lieu";
		cout << "\nMang vua tao:\n";
		XuatMang(a, n);
		cout << endl;
		break;

	}

}