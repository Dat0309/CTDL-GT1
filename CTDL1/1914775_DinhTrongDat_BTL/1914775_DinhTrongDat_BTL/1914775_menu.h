void XuatMenu()
{
	cout << "\n========He thong menu======";
	cout << "\n0. Thoat khoi chuonbg trinh";
	cout << "\n1. Xem lich thi dau vong bang";
	cout << "\n2. Xem lich thi dau toan giai";
	cout << "\n3. Xem ket qua cac tran dau vong bang";
	cout << "\n4. Xem ket qua xep hang vong bang";
	cout << "\n5. Xem ket qua tranh hang 3";
	cout << "\n6. Xem ket qua chung ket";
	cout << "\n7. Thong bao ket qua chung cuoc";
}

int ChonMenu(int soMenu)
{
	int stt;
	for (;;)
	{
		system("CLS");
		XuatMenu();
		cout << "\nNhap l so trong khoang [0,...," << soMenu << "] de chon menu, stt=";
		cin >> stt;
		if (0 <= stt&&stt <= soMenu)
			break;
	}
	return stt;
}

void XulyMenu(int menu, LIST_KQTD &l, LIST_KQXH &L)
{
	int vong;
	LIST_KQXH h;
	char filename[MAX];
	switch (menu)
	{
	case 0:
		system("CLS");
		cout << "\n0.Thoat khoi chuong trinh\n";
		break;
	case 1:
		system("CLS");
		cout << "\n1.Xem lich thi dau vong bang";

		break;
	case 2:
		system("CLS");
		cout << "\n2.Xem lich thi dau toan giai";
		break;
	case 3 :
		system("CLS");
		cout << "\n3.Xem ket qua cac tran dau vong bang";
		break;
	case 4:
		system("CLS");
		cout << "\n4.Xem ket qua xep hang vong bang";
		break;
	case 5:
		system("CLS");
		cout << "\n5.Xemw ket qua tranh hang 3";
		break;
	case 6:
		system("CLS");
		cout << "\n6.Xem ket qua chung ket";
		break;
	case 7:
		system("CLS");
		cout << "\n7.Thong bao ket qua chung cuoc";
		break;
	}
}