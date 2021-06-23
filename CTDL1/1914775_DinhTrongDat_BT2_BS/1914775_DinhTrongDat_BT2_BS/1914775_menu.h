

void XuatMenu();
int ChonMenu(int soMenu);
void XuLyMenu(int menu, hocvien a[MAX], int &n);



void XuatMenu()
{
	cout << "\n================ HT menu =================";
	cout << "\n0. Thoat khoi chuong trinh";
	cout << "\n1. Tao danh sach tu tap tin";
	cout << "\n2. Xem danh sach";
	cout << "\n3. Sap xep tang dan theo diem trung binh";
	cout << "\n4. Sap xep tang dan theo so tin chi tich luy";
	cout << "\n5. Sap xep tang dan theo nam sinh";
	cout << "\n==========================================";
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


void XuLyMenu(int menu, hocvien a[MAX], int &n)
{
	char filename[MAX] = "HocVien.txt";

	switch (menu)
	{
	case 0:
		system("CLS");
		cout << "\n0. Thoat khoi chuong trinh\n";
		break;
	case 1:
		system("CLS");
		cout << "\n1. Tao danh sach tu tap tin";

		if (!Chuyen_TapTin_MangCT(filename, a, n))
			cout << "\nMo tap tin " << filename << " bi loi!\n";
		else
			cout << "\nDa chuyen thanh cong du lieu tap tin " << filename << " vao danh sach :\n";

		break;
	case 2:
		system("CLS");
		cout << "\n2. Xem danh sach";
		cout << "\nDanh sach hoc vien:\n";
		Xuat_DSSV(a, n);
		cout << endl;
		break;


	case 3:
		system("CLS");
		cout << "\n3. Sap xep tang dan theo diem trung binh";
		cout << "\nXuat danh sach hoc vien:\n";
		Xuat_DSSV(a, n);
		ChonTrucTiep(a, n);
		cout << "\nDanh sach sau khi sap xep la:\n";
		Xuat_DSSV(a, n);
		cout << endl;
		break;

	case 4:
		system("CLS");
		cout << "\n4. Sap xep tang dan theo so tin chi tich luy";
		cout << "\nXuat danh sach sinh vien:\n";
		Xuat_DSSV(a, n);
		Buble(a, n);
		cout << "\nDanh sach sinh vien sau khi sap xeo:\n";
		Xuat_DSSV(a, n);
		cout << endl;
		break;

	case 5:
		system("CLS");
		cout << "\n3. Sap xep tang dan theo nam sinh";
		cout << "\nXuat danh sach sinh vien: \n";
		Xuat_DSSV(a, n);
		HeapSort(a, n);
		cout << "\nDanh sach hoc vien sau khi sap xep la: \n";
		Xuat_DSSV(a, n);
		cout << endl;
		break;

	}
}





