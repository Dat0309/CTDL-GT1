void XuatMenu() 
{ 
	cout << "\n========He thong menu======"; 
	cout << "\n0. Thoat khoi chuonbg trinh"; 
	cout << "\n1. Tao bang luong"; 
	cout << "\n2. Xuat bang luong theo thu tu truoc, giua, cuoi";
	cout << "\n3. Xuat thong tin nhan vien khi biet ma nhan vien"; 
	cout << "\n4. Thay doi nam sinh cua 1 nhan vien";  
	cout << "\n5. Tinh chieu cao cua cay";
	cout << "\n6. Tinh so nut cua cay";
	cout << "\n7. Huy cac nhan vien co luong cao nhat";
	cout << "\n8. Tinh muc cua nut nhan vien khi biet ma nhan vien";
}

int ChonMenu(int soMenu)
{
	int stt;  
	for (;;)  
	{
		system("CLS");  
		XuatMenu(); 
		cout << "\nNhap 1 so trong khoang [0,...," << soMenu << "] de chon menu, stt = ";
		cin >> stt; 
		if (0 <= stt && stt <= soMenu)  
			break;
	}  return stt;
}

void XuLyMenu(int menu, BSTree &root) 
{
	char *filename; 
	int kq; 
	KeyType x; 
	BSTree p; 
	double luong; 
	int ns; 
	//========================= 
	switch (menu)  
	{ 
	case 0:  
		system("CLS");  
		cout << "\0. Thoat khoi chuonbg trinh\n"; 
		break; 
	case 1:  
		system("CLS");  
		cout << "\n1. Tao cay BST";  
		filename = new char[50]; 
		do 
		{   
			cout << "\nfilename = "; 
			cin >> filename;  
			kq = File_BST(root, filename); 
		}
		while (kq == 0);  
		cout << "\nDa chuyen du lieu tap tin " << filename << " vao cay BST thanh cong.";  
		delete[]filename;
		break;
	case 2:  
		system("CLS");  
		cout << "\n2. Xuat cay BST theo thu tu giua"; 
		cout << "\n\nCay BST hien hanh, xuat theo thu tu truoc (NLR) :\n"; 
		TieuDe(); 
		PreOrder(root); 
		cout << "\n:"; 
		for (int i = 1; i <= MAXCOT; i++)
			cout << "=";
		cout << ":";  
		system("PAUSE");
		cout << "\n\nCay BST hien hanh, xuat theo thu tu giua (LNR) :\n"; 
		TieuDe();   
		InOrder(root);
		cout << "\n:"; 
		for (int i = 1; i <= MAXCOT; i++)  
			cout << "=";   
		cout << ":";  
		system("PAUSE");
		cout << "\n\nCay BST hien hanh, xuat theo thu tu cuoi (LRN) :\n"; 
		TieuDe();  
		PosOrder(root); 
		cout << "\n:"; 
		for (int i = 1; i <= MAXCOT; i++)  
			cout << "="; 
		cout << ":"; 
		cout << "\nDanh sach co " << DemSoNut(root) << " nhan vien ";  
		system("PAUSE");  
		break; 
	case 3: 
		system("CLS"); 
		cout << "\n3. Xuat thong tin nhan vien khi biet ma nhan vien";  
		cout << "\n\nCay BST hien hanh, xuat theo thu tu giua (LNR) :\n"; 
		TieuDe(); 
		InOrder(root);
		cout << "\n:"; 
		for (int i = 1; i <= MAXCOT; i++) 
			cout << "=";   cout << ":";  
		cout << "\nDanh sach co " << DemSoNut(root) << " nhan vien ";  
		cout << "\nNhap ma nhan vien (khong co ky tu trang, co phan biet ky tu thuong, HOA):\nmaNV = "; 
		cin >> x; 
		p = Search(root, x); 
		if (p == NULL)   
			cout << "\nkhong co nhan vien nao co ma " << x;   
		else   
		{
			cout << "\nThong tin nhan vien co ma " << x << " :\n";
			TieuDe();  
			Xuat_NV(p->info);
			cout << "\n:";
			for (int i = 1; i <= MAXCOT; i++)  
				cout << "=";  
			cout << ":"; }  
		break;
	case 4:  
		system("CLS"); 
		cout << "\n4. Thay doi nam sinh cua 1 nhan vien";  
		cout << "\n\nCay BST hien hanh, xuat theo thu tu giua (LNR) :\n";  
		TieuDe(); 
		InOrder(root); 
		cout << "\n:";  
		for (int i = 1; i <= MAXCOT; i++)
			cout << "=";  
		cout << ":";
		cout << "\nDanh sach co " << DemSoNut(root) << " nhan vien ";  
		cout << "\nNhap ma nhan vien (khong co ky tu trang, co phan biet ky tu thuong, HOA):\nmaNV = ";   
		cin >> x;
		p = Search(root, x); 
		if (p == NULL) 
			cout << "\nkhong co nhan vien nao co ma " << x;
		else   
		{
			cout << "\nThong tin nhan vien co ma " << x << " :\n"; 
			TieuDe();  
			Xuat_NV(p->info);  
			cout << "\n:"; 
			for (int i = 1;
				i <= MAXCOT; i++)  
				cout << "=";
			cout << ":"; 
			cout << "\n\nNhap nam sinh moi cua nhan vien, ns = "; 
			cin >> ns;   
			p->info.namSinh = ns; 
			cout << "\nThong tin nhan vien co ma " << x << " :\n";  
			TieuDe();  
			Xuat_NV(p->info);   
			cout << "\n:";   
			for (int i = 1; i <= MAXCOT; i++)
				cout << "="; 
			cout << ":";
		}  
		cout << endl;  
		break;  case 5:  
			system("CLS");  
			cout << "\n5. Chieu cao cua cay"; 
			TieuDe(); 
			InOrder(root);  
			cout << "\n:"; 
			for (int i = 1; i <= MAXCOT; i++)  
				cout << "="; 
			cout << ":";
			cout << "\nDanh sach co " << DemSoNut(root) << " nhan vien ";
			cout << "\nChieu cao cua cay BST : h = " << TinhChieuCao(root);
			cout << endl;  
			break;
		case 6:
			system("CLS"); 
			cout << "\n5. So nut cua cay"; 
			TieuDe();  
			InOrder(root); 
			cout << "\n:";  
			for (int i = 1; i <= MAXCOT; i++)  
				cout << "=";
			cout << ":"; 
			cout << "\nDanh sach co " << DemSoNut(root) << " nhan vien ";
			cout << endl;
			break;  
		case 7:
			system("CLS"); 
			cout << "\n7. Tinh muc cua nut nhan vien khi biet ma nhan vien";
			cout << endl;
			cout << "\n\nCay BST hien hanh, xuat theo thu tu giua (LNR) :\n"; 
			TieuDe();
			InOrder(root); 
			cout << "\n:";  
			for (int i = 1; i <= MAXCOT; i++) 
				cout << "=";  
			cout << ":"; 
			cout << "\nDanh sach co " << DemSoNut(root) << " nhan vien ";


		cout << "\n\nNhap ma nhan vien(khong co KT trang, co phan biet KT thuong, HOA), x = ";
		cin >> x;
		p = Search(root, x);
		if (p == NULL)  
			cout << "\nkhong co nhan vien nao co ma " << x;
		else  
			cout << "\nMuc cua nhan vien co ma " << x << " la : " << TimMuc_x(root, x);
		break;
		case 8:   
			system("CLS");  
			cout << "\n8. Huy cac nhan vien co luong cao nhat"; 
			cout << "\n\nCay BST hien hanh, xuat theo thu tu giua (LNR) :\n"; 
			TieuDe();
			InOrder(root);
			cout << "\n:"; 
			for (int i = 1; i <= MAXCOT; i++)   
				cout << "=";  
			cout << ":";
			cout << "\nDanh sach co " << DemSoNut(root) << " nhan vien ";

			cout << endl;  
			break; 
 } 
}
