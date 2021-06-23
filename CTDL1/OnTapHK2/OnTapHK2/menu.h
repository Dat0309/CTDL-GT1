void XuatMenu()
{
	cout << "\n=============HE THONG CHUC NANG=============";
	cout << "\n0. Thoat chuong trinh.";
	cout << "\n1. Tao danh sach sinh vien.";
	cout << "\n2. Xuat danh sach sinh vien.";
	cout << "\n3. ";
	cout << "\n4. ";
	cout << "\n5. ";
}
int ChonMenu(int soMenu)
{
	int stt;
	for (;;)
	{
		system("CLS");
		XuatMenu();
		cout << "\nChon 1 so trong khoang [0..." << soMenu << "] de chon chuc nang, stt=";
		cin >> stt;
		if (stt >= 0 && stt <= soMenu)
			break;
	}
	return stt;
}
void XuLyMenu(int menu, LL& l)
{
	int kq;
	HocVien x;
	char filename[50] = "HocVien.txt";
	switch (menu)
	{
	case 0:
		system("CLS");
		cout << "\n0. Thoat khoi chuong trinh.";
		break;
	case 1:
		system("CLS");
		cout << "\n1. Tao danh sach sinh vien.";
		do
		{
			kq = NhapLL(filename, l);
		} while (!kq);
		cout << "\nDa chuyen thanh cong du lieu trong tap tin: " << filename << "vao CAY NHI PHAN!\n";
		system("PAUSE");
		break;
	case 2:
		system("CLS");
		cout << "\n2.Xuat danh sach sinh vien.";
		cout << "\nDanh sach hien hanh:\n";
		XuatDS(l);
		system("PAUSE");
		break;
	}
}