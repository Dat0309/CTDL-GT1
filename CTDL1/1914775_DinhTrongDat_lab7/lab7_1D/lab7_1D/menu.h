void XuatMenu()
{
	cout << "\n========He thong menu======";
	cout << "\n0. Thoat khoi chuonbg trinh";
	cout << "\n1. Tao cay BST";
	cout << "\n2. Xuat cay BST theo thu tu truoc, giua, cuoi";
	cout << "\n3. So nut cua cay";
	cout << "\n4. Dem so nut co key <x";
	cout << "\n5. Tim nut co khoa x";
	cout << "\n6. Kiem tra nut co key cho truoc co phai la nut la";
	cout << "\n7. Dem so nut la va xuat cac nut la";
	cout << "\n8. Chieu cao cua cay";
	cout << "\n9.Muc cua nut co khoa x";
	cout << "\n10.So sanh muc 2 nut";
	cout << "\n11. Them khoa x vao cay";
	cout << "\n12. Xoa nut co khoa x";
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

void XuLyMenu(int menu,  NODE)
{
	char *filename;
	int kq;
	
	switch (menu)
	{

	case 0:
		system("CLS");
		cout << "\n0. Thoat khoi chuong trinh\n";
		break;
	case 1:
		system("CLS");
		cout << "\n1. Tao cay BST";

		break;
	case 2:
		system("CLS");
		cout << "\n2.Xuat cay BST theo thu tu";

		system("PAUSE");

		break;
	case 3:
		system("CLS");
		cout << "\n3. So nut cua cay";

		break;
	case 4:
		system("CLS");
		cout << "\n4. Dem so nut  co key <x va xuat cac nut ra man hinh";

		break;
	case 5:
		system("CLS");
		cout << "\n5. Tim kiem khoa x";

		break;
	case 6:
		system("CLS");
		cout << "\n6. Kiem tra nut cho truoc co phai la nut la";
	
		break;
	case 7:
		system("CLS");
		cout << "\n7. Dem so nut la va xuat cac nut la";

		break;
	case 8:
		system("CLS");
		cout << "\n8. Chieu cao cua cay";

		break;
	case 9:
		system("CLS");
		cout << "\n9.Muc cua nut co khoa x";
	
		break;
	case 10:
		system("CLS");
		cout << "\n10.So sanh muc 2 nut";
	
		break;
	case 11:
		system("CLS");
		cout << "\n11. Them khoa x vao cay";

		break;
	case 12:
		system("CLS");
		cout << "\n12. Xoa nut co khoa x";

		break;
	}
}
