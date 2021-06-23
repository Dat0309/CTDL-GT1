void HoanVi(data2 &x, data2 &y)
{
	data2 t = x;
	x = y;
	y = t;
}
//Sap ket qua giam theo diem, theo hieu so, theo so ban thang, tang theo ten doi. Chua danh so xep hang
void SapGiamTheoDiem_HieuSo_SoBT_DenVong(LIST_KQXH &h, int vong)
{
	NODE2 *p, *q;//Duyet doi bong
	//Sap giam theo diem
	for (p = h.pHead; p != h.pTail; p = p->pNext)
		for (q = p->pNext; q != NULL; q = q->pNext)
			if (p->kqxh.diem < q->kqxh.diem)
				HoanVi(p->kqxh, q->kqxh);
	//Sap bang ket qua giam theo tong diem, giam theo hieu so
	for (p = h.pHead; p != h.pTail; p = p->pNext)
		for (q = p->pNext; q != NULL; q = q->pNext)
			if (p->kqxh.diem == q->kqxh.diem)
				if (p->kqxh.hieuSo < q->kqxh.hieuSo)
					HoanVi(p->kqxh, q->kqxh);
	//Sap bang ket qua giam theo tong diem, giam theo hieu so, giam theo so ban thang
	for (p = h.pHead; p != h.pTail; p = p->pNext)
		for (q = p->pNext; q != NULL; q = q->pNext)
			if (p->kqxh.diem == q->kqxh.diem)
				if (p->kqxh.hieuSo == q->kqxh.hieuSo)
					if (p->kqxh.sBThang < q->kqxh.sBThang)
						HoanVi(p->kqxh, q->kqxh);
	//Sap bang ket qua giam theo tong diem, giam theo hieu so, giam theo so ban thang, tang theo ten doi
	for (p = h.pHead; p != h.pTail; p = p->pNext)
		for (q = p->pNext; q != NULL; q = q->pNext)
			if (p->kqxh.diem == q->kqxh.diem)
				if (p->kqxh.hieuSo == q->kqxh.hieuSo)
					if (p->kqxh.sBThang == q->kqxh.sBThang)
						if (_strcmpi(p->kqxh.tenDoi, q->kqxh.tenDoi) > 0)
							HoanVi(p->kqxh, q->kqxh);
}

void XepHang_DenVong(LIST_KQXH &h, int vong)
{
	int vt = 1, //luu thu hang, dau tien la 1
		soVT; //so luong cac doi cung 1 hang, khi dang xet mot hang
	NODE2 *p, *q; //duyet doi
	SapGiamTheoDiem_HieuSo_SoBT_DenVong(h, vong);
	//Bang ket qua h da giam theo diem, hieu so, so ban thang va tang theo ten doi
	p = h.pHead;
	p->kqxh.xh = 1; //doi dau tien xep hang 1
	soVT = 1; //khoi tao so doi bang nhau la 1, khi dang tinh cac doi bang nhau
	for (q = p->pNext; q != NULL; q = q->pNext)
	{
		if (q->kqxh.diem == p->kqxh.diem &&
			q->kqxh.hieuSo == p->kqxh.hieuSo &&
			q->kqxh.sBThang == p->kqxh.sBThang)
		{
			q->kqxh.xh = vt; //xep cac doi bang nhau cung hang
			soVT++;//so doi bang nhau tang them 1
		}
		else
		{
			vt += soVT;//hang doi ke tiep tang them soVT, (khong chac la 1)
			q->kqxh.xh = vt;
			soVT = 1;//khoi tao lai soVT = 1
		}
		p = q; //khoi tao lai p
	}
}
//Xuat tieu de bang ket qua
void XuatTieuDe_KQ()
{
	cout << endl;
	cout << ':';
	for (int i = 1; i <= 70; i++)
		cout << NGANGDOI;
	cout << ':';
	cout << endl;
	cout << setiosflags(ios::left)
		<< ": "
		<< setw(15) << "Ten doi"
		<< ": "
		<< setw(4) << "ST"
		<< ": "
		<< setw(4) << "T"//So tran thang
		<< ": "
		<< setw(4) << "H"//So tran Hoa
		<< ": "
		<< setw(4) << "B"//So tran thua
		<< ": "
		<< setw(4) << "BT"//So ban thang
		<< ": "
		<< setw(4) << "BB"//So ban thua
		<< ": "
		<< setw(4) << "HS"//hieu so
		<< ": "
		<< setw(4) << "Diem"//Diem
		<< ": "
		<< setw(4) << "XH"//Xep hang
		<< ':';
	cout << endl;
	cout << ':';
	for (int i = 1; i <= 70; i++)
		cout << NGANGDOI;
	cout << ':';
}
//Xuat KQ 1 doi
void XuatKQ_1D(data2 x)
{
	cout << setiosflags(ios::left)
		<< ": "
		<< setw(15) << x.tenDoi
		<< ": "
		<< setw(4) << x.st
		<< ": "
		<< setw(4) << x.sTThang//So tran thang
		<< ": "
		<< setw(4) << x.sTHoa//So tran Hoa
		<< ": "
		<< setw(4) << x.sTThua//So tran thua
		<< ": "
		<< setw(4) << x.sBThang//So ban thang
		<< ": "
		<< setw(4) << x.sBThua//So ban thua
		<< ": "
		<< setw(4) << x.hieuSo//hieu so
		<< ": "
		<< setw(4) << x.diem//Diem
		<< ": "
		<< setw(4) << x.xh//Xep hang
		<< ':';
}
//Xuat bang ket qua xep hang
void Xuat_KQXH(LIST_KQXH h)
{
	NODE2 *p;
	XuatTieuDe_KQ();
	for (p = h.pHead; p != h.pTail; p = p->pNext)
	{
		cout << endl;
		XuatKQ_1D(p->kqxh);
		cout << endl;
		cout << ':';
		for (int i = 1; i <= 70; i++)
			cout << NGANGDON;
		cout << ':';
	}
	cout << endl;
	XuatKQ_1D(p->kqxh);
	cout << endl;
	cout << ':';
	for (int i = 1; i <= 70; i++)
		cout << NGANGDOI;
	cout << ':';
}
