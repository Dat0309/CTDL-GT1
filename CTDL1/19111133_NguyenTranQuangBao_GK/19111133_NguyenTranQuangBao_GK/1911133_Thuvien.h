#define MAX 100
struct HocVien
{
	char maHV[10];
	char ho[10];
	char tenlot[10];
	char ten[10];
	char lop[10];
	int namsinh;
	double diemtb;
	int tichluy;
};
struct tagNode
{
	HocVien info;
	tagNode* pNext;
};
typedef tagNode NODE;
struct LL
{
	NODE* pHead;
	NODE* pTail;
};
NODE* GetNode_LL(HocVien x)
{
	NODE* p;
	p = new NODE;
	if (p != NULL)
	{
		p->info = x;
		p->pNext = NULL;
	}
	return p;
}

//Khoi tao DSLK don ly lich rong
void CreatList_LL(LL& l)
{
	l.pHead = l.pTail = NULL;
}

//Chen x vao cuoi ds
void  InsertTail_LL(LL& l, HocVien x)
{
	NODE* new_ele = GetNode_LL(x);	
	if (new_ele == NULL)
	{
		cout << "\nKhong du bo nho";
		system("CLS");
		return;
	}

	if (l.pHead == NULL)
	{
		l.pHead = new_ele; l.pTail = l.pHead;
	}
	else
	{
		l.pTail->pNext = new_ele;
		l.pTail = new_ele;
	}
}
//
int NhapLL(char* filename, LL& l)
{
	HocVien x;
	ifstream in(filename);
	if (!in)
	{
		return 0;
	}
	CreatList_LL(l);
	char maHV[10];
	char ho[10];
	char tenlot[10];
	char ten[10];
	char lop[10];
	int namsinh;
	double diemtb;
	int tichluy;

	in >> maHV; strcpy_s(x.maHV, maHV);
	in >> ho; strcpy_s(x.ho, ho);
	in >> tenlot; strcpy_s(x.tenlot, tenlot);
	in >> ten; strcpy_s(x.ten, ten);
	in >> lop; strcpy_s(x.lop, lop);
	in >> namsinh; x.namsinh = namsinh;
	in >> diemtb; x.diemtb = diemtb;
	in >> tichluy; x.tichluy = tichluy;
	InsertTail_LL(l, x);

	while (!in.eof())
	{
		in >> maHV; strcpy_s(x.maHV, maHV);
		in >> ho; strcpy_s(x.ho, ho);
		in >> tenlot; strcpy_s(x.tenlot, tenlot);
		in >> ten; strcpy_s(x.ten, ten);
		in >> lop; strcpy_s(x.lop, lop);
		in >> namsinh; x.namsinh = namsinh;
		in >> diemtb; x.diemtb = diemtb;
		in >> tichluy; x.tichluy = tichluy;
		InsertTail_LL(l, x);
	}
	in.close();
	return 1;
}

//=======================
void XuatKeNgang()
{
	cout << ":";
	for (int i = 0; i < 87; i++)
		cout << "=";
	cout << ":";
}
void XuatTieuDe()
{
	XuatKeNgang();
	cout << endl;
	cout << setiosflags(ios::left);
	cout << ":";		
	cout << setw(10) << "MaHV" << ":"
		<< setw(32) << "Ho & Ten" << ":"
		<< setw(10) << "Lop" << ":"
		<< setw(10) << "Nam Sinh" << ":"
		<< setw(10) << "DiemTB" << ":"
		<< setw(10) << "TichLuy" << ":";
	cout << endl;
	XuatKeNgang();
}
void XuatDS(LL l)
{
	XuatTieuDe();
	NODE* p;
	p = l.pHead;
	while (p != NULL)	 
	{
		cout << endl;
		cout << setiosflags(ios::left);
		cout << ":";
		cout << setw(10) << p->info.maHV << ":"
			<< setw(10) << p->info.ho << ":"
			<< setw(10) << p->info.tenlot << ":"
			<< setw(10) << p->info.ten << ":"
			<< setw(10) << p->info.lop << ":"
			<< setw(10) << p->info.namsinh << ":"
			<< setw(10) << p->info.diemtb << ":"
			<< setw(10) << p->info.tichluy << ":";
		p = p->pNext;
	}
	cout << endl;
	XuatKeNgang();
}
//sap theo lop
int IsEmpty(LL l)
{
	if (l.pHead == NULL)
		return 1;
	return 0;
}
void AddTail(LL& l, NODE* newele)
{
	if (IsEmpty(l))
	{
		l.pHead = newele;
		l.pTail = l.pHead;
	}
	else
	{
		l.pTail->pNext = newele;
		l.pTail = newele;
	}
}
void HoanVi(HocVien& x, HocVien& y)
{
	HocVien t = x;
	x = y;
	y = t;
}
void Copy(LL& l1, LL& l)
{
	CreatList_LL(l1);
	NODE* p;
	HocVien x;
	for (p = l.pHead; p != NULL; p = p->pNext)
	{
		x = p->info;
		InsertTail_LL(l1, x);
	}
}

//===============================//
void SapTheoLop(LL& l)
{
	LL lRes;
	NODE* min, *minprev;
	NODE* p, *q;
	CreatList_LL(lRes);
	while (l.pHead != NULL)
	{
		p = l.pHead;
		q = p->pNext;
		min = p;
		minprev = NULL;
		while (q != NULL)
		{
			if (_stricmp(q->info.lop, min->info.lop) < 0)
			{
				min = q;
				minprev = p;
			}
			p = q;
			q = q->pNext;
		}
		if (minprev != NULL)
			minprev->pNext = min->pNext;
		else
			l.pHead = min->pNext;
		min->pNext = NULL;
		AddTail(lRes, min);
	}
	Copy(l, lRes);
}

//nhap tich luy

void NhapTichLuy(LL& l)
{
	NODE* p;
	p = l.pHead;
	while (p != NULL)
	{
		if (_stricmp(p->info.maHV, "DL23452") == 0)
		{
			p->info.tichluy = 35;
		}
		p = p->pNext;
	};

}
///
int Del_1994(LL& l)
{
	NODE* p = l.pHead;
	NODE* q = NULL;
	while (p != NULL)
	{
		if (p->info.namsinh == 1994)
			break;
		q = p;
		p = p->pNext;
	}
	if (p == NULL)
		return 0;
	if (q != NULL)
	{
		if (p == l.pTail)
			l.pTail = q;
		q->pNext = p->pNext;
	}
	else
	{
		l.pHead = p->pNext;
		if (l.pHead == NULL)
			l.pTail == NULL;
	}
	delete p;
	return 1;
}
void Xoa(LL& l)
{
	while (Del_1994(l));

}
//
void TachLop(LL l)
{
	NODE* p;
	LL l1, l2, l3;
	p = l.pHead;
	if (p == NULL)
	{
		cout << "\nDanh sach rong!";
		system("PAUSE");
		return;
	}
	CreatList_LL(l1);
	CreatList_LL(l2);
	CreatList_LL(l3);
	while (p != NULL)
	{
		if (_strcmpi(p->info.lop, "CTK36") == 0)
			InsertTail_LL(l1, p->info);
		else
		if (_strcmpi(p->info.lop, "CTK37") == 0)
			InsertTail_LL(l2, p->info);
		else
		if (_strcmpi(p->info.lop, "CTK38") == 0)
			InsertTail_LL(l3, p->info);
		p = p->pNext;
	}
	cout << "\nDANH SACH LOP CTK36\n";
	XuatDS(l1);
	cout << "\DANH SACH LOP CTK37\n";
	XuatDS(l2);
	cout << "\nDANH SACH LOP CTK38\n";
	XuatDS(l3);
}