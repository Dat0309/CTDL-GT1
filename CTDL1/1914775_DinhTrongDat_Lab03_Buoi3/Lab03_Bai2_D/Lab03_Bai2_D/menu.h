void XuatMenu();
int ChonMenu(int soMenu);
void XuLyMenu(int menu, sinhvien a[MAX], int &n);


void XuatMenu()
{
	cout << "\n================ He thong chuc nang ===============";
	cout << "\n0. Thoat khoi chuong trinh";
	cout << "\n1. Tao danh sach sinh vien ";
	cout << "\n2. Xem danh sach sinh vien";
	cout << "\n3. Sap xep Quicksort";
	cout << "\n4. Sap xep Heapsort";
	cout << "\n5. Sap xep Mergsort";
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
	int kq;
	struct sinhvien F[MAX];
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
		cout << "\n3. Quicksort";
		cout << "\Xuat danh sach sinh vien: \n";
		Xuat_DSSV(a, n);
		QuickSort(a, n);
		cout << "\nDanh sach sinh vien sau khi Quicksort la:\n";
		Xuat_DSSV(a, n);
		cout << endl;
		break;
	case 4:
		system("CLS");
		cout << "\n4. Heapsort";
		cout << "\nXuat danh sach sinh vienL \n";
		Xuat_DSSV(a, n);
		HeapSort(a, n);
		cout << "\nDanh sach sinh vien sau khi heapsort la :\n";
		Xuat_DSSV(a, n);
		cout << endl;
		break;

	case 5:
		system("CLS");
		cout << "\n5.Mergesort";
		cout << "\nXuat danh sach sinh vien:\n";
		Xuat_DSSV(a, n);
		MergeSort(F, n);
		cout << "\nXuat danh sach sinh vien sau khi mergesort\n";
		Xuat_DSSV(a, n);
		cout << endl;
		break;
	
	}
}