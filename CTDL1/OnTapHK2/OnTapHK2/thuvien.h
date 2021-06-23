#define MAX 100
struct HocVien
{
	char MaHv[10];
	char ho[10];
	char tenLot[10];
	char ten[10];
	char lop[10];
	int namSinh;
	double diemTb;
	int tichLuy;
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

//Khoi tao danh sach lien ket down ly lich rong
void CreateList_LL(LL& l)
{
	l.pHead = l.pTail = NULL;
}

//Chen x vao cuoi danh sach
void InsertTail_LL(LL& l, HocVien x)
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
int NhapLL(char* filename, LL& l)
{
	HocVien x;
	ifstream in(filename);
	if (!in)
	{
		return 0;
	}
	CreateList_LL(l);
	char MaHv[10];
	char ho[10];
	char tenLot[10];
	char ten[10];
	char lop[10];
	int namSinh;
	double diemTb;
	int tichLuy;

	in >> MaHv; strcpy_s(x.MaHv, MaHv);
	in >> ho; strcpy_s(x.ho, ho);
	in >> tenLot; strcpy_s(x.tenLot, tenLot);
	in >> ten; strcpy_s(x.ten, ten);
	in >> lop; strcpy_s(x.lop, lop);
	in >> namSinh; x.namSinh = namSinh;
	in >> diemTb; x.diemTb = diemTb;
	in >> tichLuy; x.tichLuy = tichLuy;
	InsertTail_LL(l, x);

	while (!in.eof())
	{
		in >> MaHv; strcpy_s(x.MaHv, MaHv);
		in >> ho; strcpy_s(x.ho, ho);
		in >> tenLot; strcpy_s(x.tenLot, tenLot);
		in >> ten; strcpy_s(x.ten, ten);
		in >> lop; strcpy_s(x.lop, lop);
		in >> namSinh; x.namSinh = namSinh;
		in >> diemTb; x.diemTb = diemTb;
		in >> tichLuy; x.tichLuy = tichLuy;
		InsertTail_LL(l, x);
	}
	in.close();
	return 1;
}
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
	cout << setw(10) << "MAHV"
		<< ":"
		<< setw(30) << "Ho & Ten"
		<< ":"
		<< setw(10) << "Lop"
		<< ":"
		<< setw(10) << "Nam Sinh"
		<< ":"
		<< setw(10) << "Diem TB"
		<< ":"
		<< setw(12) << "Tich Luy"
		<< ":";
	cout << endl;
	XuatKeNgang();
}
void XuatDS(LL l)
{
	XuatTieuDe();
	NODE* p;
	p = l.pHead;
	while (p !=NULL)
	{
		cout << endl;
		cout << setiosflags(ios::left);
		cout << ":";
		cout << setw(10) << p->info.MaHv
			<< ":"
			<< setw(10) << p->info.ho
			<< setw(10) << p->info.tenLot
			<< setw(10) << p->info.ten
			<< ":"
			<< setw(10) << p->info.lop
			<< ":"
			<< setw(10) << p->info.namSinh
			<< ":"
			<< setw(10) << p->info.diemTb
			<< ":"
			<< setw(10) << p->info.tichLuy;
		p = p->pNext;
	}
	cout << endl;
	XuatKeNgang();
}


int isEmpty(LL l)
{
	if (l.pHead == NULL)
		return 1;
	return 0;
}
void addTail(LL& l, NODE* newele)
{
	if (isEmpty(l))
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
void Copy(LL& l, LL& l1)
{
	CreateList_LL(l1);
	NODE* p;
	HocVien x;
	for (p = l.pHead; p != NULL; p = p->pNext)
	{
		x = p->info;
		InsertTail_LL(l1, x);
	}
}
//==========Sapxeptheolop//
