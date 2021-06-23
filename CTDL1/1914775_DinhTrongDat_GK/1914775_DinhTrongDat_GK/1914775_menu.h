void XuatMenu();
int ChonMenu(int soMenu);
void XuLyMenu(int menu, LIST &l);
void XuatMenu()
{
	cout << "\n================ HE THONG CHUC NANG ================";
	cout << "\n0. Thoat khoi chuong trinh";
	cout << "\n1. Tao danh sach hoc vien ";
	cout << "\n2. Xem danh sach hoc vien";
	cout << "\n3. Sua so tin chi tich luy trong bang diem cua hoc vien co ma hoc vien DL23452 thanh 35";
	cout << "\n4. Xuat danh sach hoc vien tung lop trong bang diem";
	cout << "\n5. Xoa cac hoc vien co nam sinh 1994 ra khoi bang diem mon hoc";
	cout << "\n====================================================";
}

int ChonMenu(int soMenu)
{
	int stt;
	for (;;)
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
void XuLyMenu(int menu, LIST &l)
{
	switch (menu)
	{
	case 0:
		system("CLS");
		cout << "\n0. Thoat khoi chuong trinh\n";
		break;
	case 1:
		system("CLS");
		cout << "\n1. Tao danh sach hoc vien";
		break;
	case 2:
		system("CLS");
		cout << "\n2. Xem danh sach hoc vien";
		Xuat_DSSV(l);
		system("PAUSE");
		break;
	case 3:
		system("CLS");
		cout << "\n3. Sua so tin chi tich luy trong bang diem cua hoc vien co ma hoc vien DL23452 thanh 35";
		break;
	case 4:
		system("CLS");
		cout << "\n4. Xuat danh sach hoc vien tung lop trong bang diem";
		break;
	case 5:
		system("CLS");
		cout << "\n5. Xoa cac hoc vien co nam sinh 1994 ra khoi bang diem mon hoc";
		break;
	}
}