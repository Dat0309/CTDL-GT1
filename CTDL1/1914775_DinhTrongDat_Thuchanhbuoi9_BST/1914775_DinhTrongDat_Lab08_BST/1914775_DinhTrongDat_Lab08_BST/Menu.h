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
	KeyType x, y;
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
		kq = File_BST(root, filename);
		if (kq)
			cout << "\nDa chuyen du lieu file " << filename << " vao cay BST";
		else
			cout << "\nDa chuyen du lieu file " << filename << " vao cay BST";
		break;
	case 2:
		system("CLS");
		cout << "\n2.Xuat cay BST theo thu tu";
		cout << "\n\nCay BST hien hanh, xuat theo thu tu truoc (NLR) :\n";
		PreOrder(root);

		system("PAUSE");
		cout << "\n\nCay BST hien hanh, xuat theo thu tu giua (LNR) :\n";
		InOrder(root);
		system("PAUSE");

		cout << "\n\nCay BST hien hanh, xuat theo thu tu cuoi (LRN) :\n";
		PosOrder(root);
		system("PAUSE");

		break;
	case 3:   
		system("CLS");
		cout << "\n3. So nut cua cay";  
		cout << "\nCay BST hien hanh, xuat theo thu tu giua  :\n";  
		InOrder(root); 
		cout << "\nSo nut trong cay : So nut = " << DemSoNut(root);  
		cout << endl;  
		break;
	case 4:  
		system("CLS");  
		cout << "\n4. Dem so nut  co key <x va xuat cac nut ra man hinh";   
		cout << "\nCay BST hien hanh, xuat theo thu tu giua  :\n"; 
		InOrder(root); 
		cout << "\nx = "; 
		cin >> x; 
		cout << "\n\nDanh sach cac nut cua BST co key < " << x << " :\n"; 
		kq = DemNutNhoHon(root, x); 
		cout << "\n\nSo nut cua cay BST co key < " << x << " : " << kq;
		cout << endl; 
		break;
	case 5:  
		system("CLS"); 
		cout << "\n5. Tim kiem khoa x";  
		cout << "\nCay BST hien hanh, xuat theo thu tu giua  :\n"; 
		InOrder(root);  
		cout << endl;

		cout << "\nTim khoa x = ";  
		cin >> x;  
		if (Search(x, root)) 
			cout << "\nkhoa x = " << x << " co trong cay.\n";
		else    
			cout << "\nkhoa x = " << x << " khong co trong cay!\n"; 
		break;
	case 6:  
		system("CLS");  
		cout << "\n6. Kiem tra nut cho truoc co phai la nut la";  
		cout << "\nCay BST hien hanh, xuat theo thu tu giua  :\n";  
		InOrder(root);  
		cout << "\nx = ";   
		cin >> x;  
		system("CLS");  
		kq = IsLeaf_x(root, x);  
		if (kq == -1)  
			cout << "\n\nkey " << x << " khong co trong cay ";
		else   if (kq == 0)  
			cout << "\n\nNut co key " << x << " khong la nut la "; 
		else   
			cout << "\n\nNut co key " << x << " la nut la ";  
		cout << endl; 
		break;
	case 7:  
		system("CLS"); 
		cout << "\n7. Dem so nut la va xuat cac nut la"; 
		cout << "\nCay BST hien hanh, xuat theo thu tu giua  :\n"; 
		InOrder(root);  
		cout << "\n\nDanh sach cac nut la cua BST:\n"; 
		kq = DemNutLa(root);

		cout << "\n\nSo nut la cua cay BST : soNutLa = " << kq; 
		cout << endl;   
		break;
	case 8:  
		system("CLS"); 
		cout << "\n8. Chieu cao cua cay"; 
		cout << "\nCay BST hien hanh, xuat theo thu tu giua  :\n"; 
		InOrder(root); 
		cout << "\nChieu cao cua cay BST : h = " << TinhChieuCao(root); 
		cout << endl; 
		break;
	case 9: 
		system("CLS"); 
		cout << "\n9.Muc cua nut co khoa x"; 
		cout << "\nCay BST hien hanh, xuat theo thu tu giua  :\n";
		InOrder(root); 
		cout << "\nx = ";  
		cin >> x; 
		if (!Search(x, root))
			cout << "\nCay rong hoac Khong co nut nao co khoa " << x; 
		else  
			cout << "\n\nMuc cua nut co khoa  " << x << " : " << TimMuc_x(root, x); 
		cout << endl;  
		break;
	case 10:  
		system("CLS");  
		cout << "\n10.So sanh muc 2 nut"; 
		cout << "\nCay BST hien hanh, xuat theo thu tu giua  :\n";
		InOrder(root); 
		cout << "\nNhap khoa x : "; 
		cin >> x;  
		cout << "\nNhap khoa y : "; 
		cin >> y;  
		if (SoSanhMuc(root, x, y) == 1) 
			cout << "\n\nMuc cua nut co khoa  " << x << " sau hon muc cua nut co khoa " << y; 
		else  
			if (SoSanhMuc(root, x, y) == -1) 
				cout << "\n\nMuc cua nut co khoa  " << y << " sau hon muc cua nut co khoa " << x;  
			else  
				cout << "\n\nNut co khoa  " << x << " va nut co khoa " << y << " cung muc";  
		_getch(); 
		cout << "\n=================================================";  
		cout << "\n\nMuc cua nut co khoa  " << x << " : " << TimMuc_x(root, x); 
		cout << "\n\nMuc cua nut co khoa  " << y << " : " << TimMuc_x(root, y);  
		break;
	case 11:   
		system("CLS");
		cout << "\n11. Them khoa x vao cay"; 
		cout << "\nCay BST hien hanh, xuat theo thu tu giua  :\n"; 
		InOrder(root);   cout << "\nKhoa x = ";   cin >> x;  
		if (InsertNode(root, x) != 1)   
			cout << "\nThem khoa " << x << " khong thanh cong\n";
		else  
		{
		cout << "\nCay BST sau khi them khoa " << x << " :\n";  
		InOrder(root);

	    }  
		cout << endl;   
		break;
	case 12:   
		system("CLS");  
		cout << "\n12. Xoa nut co khoa x"; 
		cout << "\nCay BST hien hanh, xuat theo thu tu giua  :\n"; 
		InOrder(root);  
		cout << "\nKhoa x = ";
		cin >> x;   
		if (!Search(x, root))  
		{ cout << "\nkhoa x = " << x << " khong co trong cay.\n";   
		_getch();  
		break;
		}
			   else  
				   if (DeleteNode(x, root) != 0)   
				   {
					   cout << "\nCay BST sau khi xoa khoa " << x << " :\n";  
					   InOrder(root); 
				   }  
		cout << endl;  
		break;
	}
}
