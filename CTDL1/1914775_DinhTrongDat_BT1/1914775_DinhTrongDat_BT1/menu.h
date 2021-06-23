void XuatMenu();
int ChonMenu(int soMenu);
void XuLyMenu(int menu, sinhvien a[MAX], int &n);


void XuatMenu()
{
	cout << "\n================ He thong chuc nang ===============";
	cout << "\n0. Thoat khoi chuong trinh";
	cout << "\n1. Tao danh sach sinh vien ";
	cout << "\n2. Xem danh sach sinh vien";
	cout << "\n3. Tim kiem theo lop va so tin chi";
	cout << "\n4. Tim kiem theo ten";
	cout << "\n5. Tim kiem theo nam sinh va diem trung binh";

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

void XuLyMenu(int menu, sinhvien a[MAX], int &n)
{
	int kq,tichluy;
	char filename[MAX],ten[10],lop[6];
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
		Xuat_DSSV(a, n);

		cout << endl;

		break;
	case 2:
		system("CLS");
		cout << "\n2. Xem Danh sach sinh vien.\n";
		cout << "\nDanh sach sinh vien hien hanh:\n";
		Xuat_DSSV(a, n);
		cout << endl;
		break;

	case 3:
		system("CLS");
		cout << "\n3. Tim kiem theo lop va so tin chi";
		cout << "\nDanh sach sinh vien da tao:\n";
		Xuat_DSSV(a, n);
		cout << "\nNhap lop can tim kiem:\n";
		cin >> lop;
		{
			Tim_TheoLop(lop, a, n);
			{
				TKNP_Theo_TichLuy(a, n);
			}
		}
		break;
	case 4:
		system("CLS");
		cout << "\n4. Tim kiem theo ten";
		cout << "\nDanh sach sinh vien da tao:\n";
		Xuat_DSSV(a, n);
		cout << "\nNhap ten sinh vien can tim kiem: \n";
		cin >> ten;
		Tim_TheoTen(ten, a, n);
		cout << '\n';
		break;

	case 5:
		system("CLS");
		cout << "\n5. Tim kiem theo nam sinh va diem trung binh";
		break;
	
	}
}