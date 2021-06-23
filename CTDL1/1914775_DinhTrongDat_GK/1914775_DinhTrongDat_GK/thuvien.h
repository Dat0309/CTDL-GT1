#define MAX_MENU 5
#define MAX 100

struct hocvien
{
	char maSV[8];
	char hoSV[10];
	char tenLot[10];
	char ten[10];
	char lop[6];
	int namSinh;
	double dtb;
	int	tichLuy;
};
typedef hocvien data;
struct tagNode
{
	data info;
	tagNode* pNext;
};
typedef tagNode NODE;
struct LIST
{
	NODE* pHead;
	NODE* pTail;
};
NODE* GetNode(data x);
void CreatLIST(LIST &l);
void InsertHead(LIST &l, data x);
void InsertTail(LIST &l, data x);
void Output_List(LIST l);
//int File_LIST(char *f, LIST &l);//
void TieuDe();
void Xuat_SV(data p);
void Xuat_DSSV(LIST l);

NODE* GetNode(data x)
{
	NODE *p;
	p = new NODE;
	if (p != NULL)
	{
		p->info = x;
		p->pNext = NULL;
	}
	return p;
}

void CreatLIST(LIST &l)
{
	l.pHead = l.pTail = NULL;
}



void InsertTail(LIST &l, data x)
{
	NODE* new_ele = GetNode(x);
	if (new_ele == NULL)
	{
		cout << "\nLoi cap phat bo nho! khong thuc hien duoc thao tac nay";
		return;
	}
	if (l.pHead == NULL)//Chen vao DS rong
	{
		l.pHead = new_ele;
		l.pTail = l.pHead;
		l.pTail->pNext = l.pHead;
	}
	else
	{
		new_ele->pNext = l.pHead;
		l.pTail->pNext = new_ele;
		l.pTail = new_ele;
	}
}

void InsertHead(LIST &l, data x)
{
	NODE* new_ele = GetNode(x);
	if (new_ele == NULL)
	{
		cout << "\nLoi cap phat bo nho! khong thuc hien duoc thao tac nay";
		return;
	}
	if (l.pHead == NULL)//Chen vao DS rong
	{
		l.pHead = new_ele;
		l.pTail = l.pHead;
		l.pTail->pNext = l.pHead;
	}
	else
	{
		new_ele->pNext = l.pHead;
		l.pTail->pNext = new_ele;
		l.pHead = new_ele;
	}
}

int TapTin_List(char *filename, LIST &l)
{
	data x;
	ifstream in(filename);
	if (!in)
	{
		cout << "\nLoi mo file !\n";
		system("PAUSE");
		return 1;
	}
	CreatLIST(l);
	char maSV[8];
	char hoSV[10];
	char tenLot[10];
	char ten[10];
	char lop[6];
	int namSinh;
	double dtb;
	int	tichLuy;

	in >> maSV; strcpy_s(x.maSV, maSV);
	in >> hoSV; strcpy_s(x.hoSV, hoSV);
	in >> tenLot; strcpy_s(x.tenLot, tenLot);
	in >> ten; strcpy_s(x.ten, ten);
	in >> lop; strcpy_s(x.lop, lop);
	in >> namSinh; x.namSinh = namSinh;
	in >> dtb; x.dtb = dtb;
	in >> tichLuy; x.tichLuy = tichLuy;
	InsertTail(l, x);

	while (!in.eof())
	{
		in >> maSV; strcpy_s(x.maSV, maSV);
		in >> hoSV; strcpy_s(x.hoSV, hoSV);
		in >> tenLot; strcpy_s(x.tenLot, tenLot);
		in >> ten; strcpy_s(x.ten, ten);
		in >> lop; strcpy_s(x.lop, lop);
		in >> namSinh; x.namSinh = namSinh;
		in >> dtb; x.dtb = dtb;
		in >> tichLuy; x.tichLuy = tichLuy;
		InsertTail(l, x);
	}

	in.close();
	return 1;
}

void TieuDe()
{
	int i;
	cout << endl;
	cout << ':';
	for (i = 1; i <= 54; i++)
		cout << '=';
	cout << ':' << endl;
	cout << "\n:=========================================================================:\n";
	cout << setiosflags(ios::left);
	cout << ':'
		<< setw(8) << "MaSV"
		<< ':'
		<< setw(10) << "Ho"
		<< setw(10) << "Tenlot"
		<< setw(10) << "Ten"
		<< ':'
		<< setw(8) << "Lop"
		<< ':'
		<< setw(6) << "NS"
		<< ':'
		<< setw(6) << "DTB"
		<< ':'
		<< setw(10) << "TichLuy"
		<< ':';
	cout << endl;
	cout << ':';
	for (int i = 1; i <= 54; i++)
		cout << '=';
	cout << ':';
	cout << "\n:=========================================================================:";
}

void Xuat_SV(data p)
{

	cout << setiosflags(ios::left)
		<< ':'
		<< setw(8) << p.maSV
		<< ':'
		<< setw(10) << p.hoSV
		<< setw(10) << p.tenLot
		<< setw(10) << p.ten
		<< ':'
		<< setw(8) << p.lop
		<< ':'
		<< setw(6) << p.namSinh
		<< ':'
		<< setw(6) << setprecision(2) << p.dtb << ':'
		<< setw(10) << p.tichLuy
		<< ':';
}

void Xuat_DSSV(LIST l)
{

	TieuDe();
	NODE *p = l.pHead;
	NODE *q = l.pHead;
	while (p != NULL && q != NULL)
	{
		cout << endl << ':';
		cout << setiosflags(ios::left)
			<< ':'
			<< setw(8) << p->info.maSV
			<< ':'
			<< setw(10) << p->info.hoSV
			<< setw(10) << p->info.tenLot
			<< setw(10) << p->info.ten
			<< ':'
			<< setw(8) << p->info.lop
			<< ':'
			<< setw(6) << p->info.namSinh
			<< ':'
			<< setw(6) << setprecision(2) << p->info.dtb << ':'
			<< setw(10) << setprecision(2) << p->info.tichLuy << ":"
			<< ':';
		p = p->pNext;
		q = q->pNext;

	}
	cout << endl;
	cout << ':';
	for (int i = 1; i < 54; i++)
		cout << "=";
	cout << ':' << endl;
	cout << "\n:=========================================================================:\n";
	return;
}