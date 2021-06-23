//he thong menu

void XuatMenu();
int ChonMenu(int soMenu);
void XuLyMenu(int menu, hocvien a[MAX], int &n);

//=======================================================

void XuatMenu()
{
	cout << "\n================ HT menu =================";
	cout << "\n0. Thoat khoi chuong trinh";
	cout << "\n1. Tao danh sach tu tap tin";
	cout << "\n2. Xem danh sach";
	cout << "\n3. Tim kiem hoc vien theo ma hoc vien";
	cout << "\n4. Tim kiem hoc vien theo lop";
	cout << "\n5. Tim kiem hoc vien theo diem trunng binh";
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
	char filename[MAX] = "HocVien.txt", maSV[10],lop[6];
	double dtb;
	int i=0;
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
		cout << "\n3. Tim kiem theo ma hoc vien";
		cout << "\nDanh sach hoc vien:\n";
		Xuat_DSSV(a, n);
		cout << "\nNhap ma hoc vien can tim:\n";
		cin >> maSV;
		Tim_MaSo_DauTien(maSV, a, n);
		cout << "\nCac hoc vien trong danh sach co ma so >= " << maSV << " la:\n"; 
		Xuat_SV(a[i]);
		cout << endl;
		break;

	case 4:
		system("CLS");
		cout << "\n4. Tim kiem theo lop";
		cout << "\nDanh sach hoc vien:\n";
		Xuat_DSSV(a, n);
		cout << "\nNhap lop cua sinh vien can tim:\n";
		cin >> lop;
		Tim_TheoLop(lop, a, n);
		cout << endl;
		break;

	case 5:
		system("CLS");
		cout << "\n5. Tim kiem theo diem trung binh";
		cout << "\nDanh sach hoc vien:\n";
		Xuat_DSSV(a, n);
		cout << "\nNhap DTB cua sinh vien can tim:\n";
		cin >> dtb;
		Tim_TheoDTB(dtb, a, n);
		cout << endl;
		break;

	}
}




