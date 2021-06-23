
void XuatMenu();
int ChonMenu(int SoMenu);
void XuLyMenu(int menu, int a[MAX], int &n);

void XuatMenu()
{
	cout << "\n=================He thong chuc nang================";
	cout << "\n0. Thoat khoi chuong trinh";
	cout << "\n1. Tao du lieu";
	cout << "\n2. Xem du lieu";
	cout << "\n3. Tim kiem tuyen tinh - tra ve chi so i dau tien";
	cout << "\n4. Tim kiem tuyen tinh - tra ve chi so i dau tien, neu co x";
	cout << "\n5. Tim kiem tuyen tinh - Tra ve chi so i cuoi cung neu co x";
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
	int x;
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
	case 3:
		cout << "\n3. Tim kiem tuyen tinh - tra ve chi so i dau tien";
		cout << "\n Mang du lieu ban dau:\n";
		XuatMang(a, n);
		cout << "\nNhap x=";
		cin >> x;
		kq = TKTT_DauTien(a, n, x);
		if (kq == -1)
			cout << endl << x << "khong co trong mang";
		else
			cout << endl << x << "xuat hien trong a tai vi tri dau tien la :" << kq;
		cout << endl;
		break;
	case 4:
		cout << "\n4. Tim kiem tuyen tinh (co linh canh) - tra ve chi so i dau tien";
		cout << "\nMang du lieu ban dau\n";
		XuatMang(a, n);
		cout << "\nNhap x=\n";
		cin >> x;
		kq = TKTT_DauTien_LC(a, n, x);
		if (kq = -1)
			cout << endl << x << "khong co trong mang";
		else
			cout << endl << x << "xuat hien trong a tai vi tri dau tien la:" << kq;
		cout << endl;
		break;
	case 5:
		cout << "\n5. Tim kiem tuyen tinh - tra ve chi so i cuoi cung";
		cout << "\nMang du lieu ban dau";
		XuatMang(a, n);
		cout << "\nNhap x=";
		cin >> x;
		kq = TKTT_CuoiCung(a, n, x);
		if (kq == -1)
			cout << endl << x << "khong có trong mang";
		else
			cout << endl << x << "xuat hien tai vi tri cuoi cung trong mang la:"<<kq;
		cout << endl;
		break;
	case 6:
		cout << "\n6. Tra ve tat ca chi so i neu co";
		cout << "\nMang du lieu ban dau:\n";
		XuatMang(a, n);
		cout << "\nNhap x=\n";
		cin >> x;
		TKTT_CacChiSo(a, n, x);
		cout << endl;
		break;
	}

}