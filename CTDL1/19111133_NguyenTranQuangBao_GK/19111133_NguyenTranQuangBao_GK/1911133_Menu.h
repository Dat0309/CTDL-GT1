void XuatMenu()
{
	cout << "\n==========He THONG CHUC NANG============";
	cout << "\n0. Thoat khoi chuong trinh.";
	cout << "\n1. Tao danh sach sinh vien.";
	cout << "\n2. Xuat danh sach sinh vien.";
	cout << "\n3. Sua so tin chi tich luy trong bang diem cua hoc vien co ma:  DL23452 thanh 35.";
	cout << "\n4. Xuat hoc vien theo tung lop trong bang diem.";
	cout << "\n5. Xoa hoc vien co nam sinh 1994 ra khoi bang diem mon hoc.";
	cout << "\n========================================";
}
int ChonMenu(int somenu)
{
	int stt;
	for (;;)
	{
		system("CLS");
		XuatMenu();
		cout << "\nChon 1 so tu [0,... " << somenu << "] de chon chuc nang, stt = ";
		cin >> stt;
		if (stt >= 0 && stt <= somenu)
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
		cout << "\nDa chuyen thanh cong du lieu trong tap tin: " << filename << " vao DSLKD!";
		break;
	case 2:
		system("CLS");
		cout << "\n2. Xuat danh sach sinh vien.";
		cout << "\nDanh sach hien hanh:\n";
		XuatDS(l);
		break;
	case 3:
		system("CLS");
		cout << "\n3. Sua so tin chi tich luy trong bang diem cua hoc vien co ma:  DL23452 thanh 35.";
		cout << "\nDanh sach hien hanh:\n";
		XuatDS(l);

		cout << "\n DS SAU KHI SUA DOI \n";
		NhapTichLuy(l);
		XuatDS(l);
		break;
	case 4:
		system("CLS");
		cout << "\n4. Xuat hoc vien theo tung lop trong bang diem.";
		cout << "\nDanh sach hien hanh:\n";
		XuatDS(l);
		cout << "\n DS XUAT THEO LOP \n";
		TachLop(l);
		break;
	case 5:
		system("CLS");
		cout << "\n5. Xoa hoc vien co nam sinh 1994 ra khoi bang diem mon hoc.";
		cout << "\nDanh sach hien hanh:\n";
		XuatDS(l);
		Xoa(l);
		cout << endl;
		cout << "\nDS SAU KHI XOA NAM SINH 1994\n";
		XuatDS(l);
		break;
	}
	cout << endl;
	system("PAUSE");
}

