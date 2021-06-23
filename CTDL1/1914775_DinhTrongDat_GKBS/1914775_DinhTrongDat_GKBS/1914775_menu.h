void XuatMenu();
int ChonMenu(int soMenu);
void XuLyMenu(int menu, list& l);

void XuatMenu()
{
	cout << "\n================ HT menu =================";
	cout << "\n0. Thoat khoi chuong trinh";
	cout << "\n1. Tao bang diem qua trinh";
	cout << "\n2. Xuat bang diem qua trinh";
	cout << "\n3. Tinh so luong sinh vien co diem qua trinh ≥ 5.5 ";
	cout << "\n4. Xuat cac sinh vien co diem qua trinh cao nhat";
	cout << "\n5. Sap bang diem tang dan theo diem qua trinh";
}

int ChonMenu(int soMenu)
{
	int stt;
	for (;;)
	{
		system("CLS");
		XuatMenu();
		cout << "\nNhap mot so ( 0 <= so <= " << soMenu << " ) de chon menu, stt = ";
		cin >> stt;
		if (0 <= stt && stt <= soMenu)
			break;
	}
	return stt;
}


void XuLyMenu(int menu, list& l)
{
	char filename[MAX];
	switch (menu)
	{
	case 0:
		system("CLS");
		cout << "\n0. Thoat khoi chuong trinh\n";
		break;
	case 1:
		system("CLS");
		cout << "\n1. Tao bang diem qua trinh";
		Chuyen_TapTin_List(filename, l);
		break;
	case 2:
		system("CLS");
		cout << "\n2. Xuat bang diem qua trinh";
		cout << "\nDanh sach hoc vien :\n";
		Xuat_DSHV(l);
		cout << endl;
		break;
	case 3:
		system("CLS");
		cout << "\n3. Tinh so luong sinh vien co diem qua trinh ≥ 5.5 ";
		cout << "\nTruoc khi tinh";
		Xuat_DSHV(l);
		cout << "\nSau khi tinh";
		Xuat_kqtk(l);
		Xuat_DSHV(l);
		break;
	case 4:
		system("CLS");
		cout << "\n4. Xuat cac sinh vien co diem qua trinh cao nhat";
	case 5:
		system("CLS");
		cout << "\n5. Sap bang diem tang dan theo diem qua trinh";
		cout << "\nDanh sach hoc vien ban dau:\n";
		Xuat_DSHV(l);
		cout << "\nDanh sach sau khi xoa:\n";
		Remove_x(l);
		Xuat_DSHV(l);
		break;
	}
}