void XuatMenu();
int ChonMenu(int soMenu);
void XuLyMenu(int menu, nhanvien a[MAX], int &n);


void XuatMenu()
{
	cout << "\n================ He thong chuc nang ===============";
	cout << "\n0. Thoat khoi chuong trinh";
	cout << "\n1. Tao danh sach sinh vien ";
	cout << "\n2. Xem danh sach sinh vien";
	cout << "\n3. Sap xep danh sach tang dan theo maNv";
	cout << "\n4. Sap xep danh sach tang dan theo diachi";
}

int ChonMenu(int soMenu)
{
	int stt;  for (;;)
	{
		system("CLS");
		XuatMenu();
		cout << "\nNhap mot so (0 <= so <= " << soMenu << " ) de chon menu, stt = ";
		cin >> stt;
		if (0 <= stt && stt <= soMenu)
			break;
	}
	return stt;
}

void XuLyMenu(int menu, nhanvien a[MAX], int &n)
{
	int kq;
	char filename[MAX];
	switch (menu)
	{
	case 0:
		system("CLS");
		cout << "\n0. Thoat khoi chuong trinh\n";
		break;
	case 1:
		system("CLS");
		cout << "\n1. Tao Danh sach sinh vien.\n";
		do
		{
			cout << "\nNhap ten tap tin, filename = ";
			cin >> filename;
			kq = TapTin_MangCT(filename, a, n);
		} while (!kq);
		cout << "\nDanh sach sinh vien vua nhap:\n";
		Xuat_DSNV(a, n);
		cout << endl;

		break;
	case 2:
		system("CLS");
		cout << "\n2. Xem Danh sach sinh vien.\n";
		cout << "\nDanh sach sinh vien hien hanh:\n";
		Xuat_DSNV(a, n);
		cout << endl;
		break;

	case 3:
		system("CLS");
		cout << "\n3. Sap xep theo ma nhan vien";

		
		break;
	case 4:
		system("CLS");
		cout << "\n4. Sap xep theo dia chi nhan vien";
		cout << "\nXuat danh sach sinh vienL \n";
		
		break;

	}
}