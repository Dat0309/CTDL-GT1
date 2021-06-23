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

void XuLyMenu(int menu, BSTree &root)
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
		filename = new char[50];
		cout << "\nTen tap tin : filename = ";
		_flushall();
		cin >> filename;
		kq = File_Bst(root, filename);
		if (kq)
			cout << "\nDa chuyen du lieu file " << filename << " vao cay BST";
		else
			cout << "\nKhong thanh cong!!!";
		break;
	case 2:
		system("CLS");
		cout << "\n2.Xuat cay BST theo thu tu";
		cout << "\n\nCay BST hien hanh, xuat theo thu tu truoc (NLR) :\n";
		PreOrder(root);
		cout << "\n\nCay BST hien hanh, xuat theo thu tu giua (LNR) :\n";
		InOrder(root);
		cout << "\n\nCay BST hien hanh, xuat theo thu tu cuoi (LRN) :\n";
		PosOrder(root);
		break;
	}
}