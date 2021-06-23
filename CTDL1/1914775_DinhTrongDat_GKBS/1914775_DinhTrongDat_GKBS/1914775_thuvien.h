#define MAX_MENU 20
#define MAX 100
struct bangdiem
{
	char maSV[8];
	char hoSV[10];
	char tenLot[10];
	char ten[10];
	int namSinh;
	char lop[6];
	double BT1;
	double BT2;
	double GK;
	double CC;
	int	DQT;
};

struct  tagNode
{
	bangdiem info;;
	tagNode* pNext;
};

typedef tagNode Node;

struct list
{
	Node* pHead;
	Node* pTail;
};
Node* GetNode(bangdiem x);
void CreatList(list& l);
void InsertHead(list& l, bangdiem x);
void  InsertTail(list& l, bangdiem x);

int Chuyen_TapTin_List(char* filename, list& l);
void TieuDe();
void Xuat_DSHV(list l);
void Xuat_HV(bangdiem x);

Node* GetNode(bangdiem x)
{
	Node* p;
	p = new Node;
	if (p != NULL)
	{
		p->info = x;
		p->pNext = NULL;
	}
	return p;
}

void CreatList(list& l)
{
	l.pHead = l.pTail = NULL;
}

void InsertHead(list& l, bangdiem x)
{
	Node* new_ele = GetNode(x);
	if (new_ele == NULL)
		return;
	if (l.pHead == NULL)
	{
		l.pHead = new_ele; l.pTail = l.pHead;
	}
	else
	{
		new_ele->pNext = l.pHead;
		l.pHead = new_ele;
	}
}


void  InsertTail(list& l, bangdiem x)
{
	Node* new_ele = GetNode(x);
	if (new_ele == NULL)
		return;
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

int Chuyen_TapTin_List(char* filename, list& l)
{
	bangdiem x;
	ifstream in(filename);
	if (!in)
	{
		cout << "\nLoi mo file !\n";
		system("PAUSE");
		return 0;
	}
	
	CreatList(l);
	char maSV[8];
	char hoSV[10];
	char tenLot[10];
	char ten[10];
	int namSinh;
	char lop[6];
	double BT1;
	double BT2;
	double GK;
	double CC;
	int	DQT;

	in >> maSV; strcpy_s(x.maSV, maSV);
	in >> hoSV; strcpy_s(x.hoSV, hoSV);
	in >> tenLot; strcpy_s(x.tenLot, tenLot);
	in >> ten; strcpy_s(x.ten, ten);
	in >> lop; strcpy_s(x.lop, lop);
	in >> namSinh; x.namSinh = namSinh;
	in >> BT1; x.BT1 = BT1;
	in >> BT2; x.BT2 = BT2;
	in >> GK; x.GK = GK;
	in >> CC; x.CC = CC;
	in >> DQT; x.DQT = DQT;
	InsertTail(l, x);
	while (!in.eof())
	{
		in >> maSV; strcpy_s(x.maSV, maSV);
		in >> hoSV; strcpy_s(x.hoSV, hoSV);
		in >> tenLot; strcpy_s(x.tenLot, tenLot);
		in >> ten; strcpy_s(x.ten, ten);
		in >> lop; strcpy_s(x.lop, lop);
		in >> namSinh; x.namSinh = namSinh;
		in >> BT1; x.BT1 = BT1;
		in >> BT2; x.BT2 = BT2;
		in >> GK; x.GK = GK;
		in >> CC; x.CC = CC;
		in >> DQT; x.DQT = DQT;
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
		<< setw(6) << "BT1"
		<< ':'
		<< setw(6) << "BT2"
		<< ':'
		<< setw(6) << "GK"
		<< ':'
		<< setw(6) << "CC"
		<< ':'
		<< setw(10) << "DQT"
		<< ':';
	cout << endl;
	cout << ':';
	for (int i = 1; i <= 54; i++)
		cout << '=';
	cout << ':';
	cout << "\n:=========================================================================:";

}

//Xuat 1 s1nh vien
void Xuat_HV(bangdiem x)
{

	cout << setiosflags(ios::left)
		<< ':'
		<< setw(8) << x.maSV
		<< ':'
		<< setw(10) << x.hoSV
		<< setw(10) << x.tenLot
		<< setw(10) << x.ten
		<< ':'
		<< setw(8) << x.lop
		<< ':'
		<< setw(6) << x.namSinh
		<< ':'
		<< setw(6) << setprecision(2) << x.BT1 << ':'
		<< setw(6) << setprecision(2) << x.BT2 << ':'
		<< setw(6) << setprecision(2) << x.GK << ':'
		<< setw(6) << setprecision(2) << x.CC << ':'
		<< setw(10) << setprecision(2) << x.DQT << ':'
		<< ':';
}


void Xuat_DSHV(list l)
{
	TieuDe();
	Node *p = l.pHead;
	Node *q = l.pHead;
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
			<< setw(6) << setprecision(2) << p->info.BT1 << ':'
			<< setw(6) << setprecision(2) << p->info.BT2 << ':'
			<< setw(6) << setprecision(2) << p->info.GK << ':'
			<< setw(6) << setprecision(2) << p->info.CC << ':'
			<< setw(10) << setprecision(2)<< p->info.DQT
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

Node* Tim_HV(list l)
{
	Node* p, *q;
	q = NULL;
	p = l.pHead;
	do
	{
		if (strcmp(p->info.maSV, "DL23452") == 0)
		{
			q = p;
			break;
		}
		p = p->pNext;
	} while (p != l.pHead);
	return q;
}

void Xuat_kqtk(list l)
{
	Node* q;
	char maHV[8];
	q = Tim_HV(l);
	if (!q)
		cout << "\nDS khong co hoc vien co ma " << maHV;
	else
	{
		q->info.DQT = 35;
	}
}
int RemoveNode_First(list& l)
{
	Node* p = l.pHead;
	Node* q = NULL;
	while (p != NULL)
	{
		if (p->info.namSinh == 1994)
			break;
		q = p; p = p->pNext;
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
			l.pTail = NULL;
	}
	delete p;
	return 1;
}
void Remove_x(list& l)
{
	while (RemoveNode_First(l));
}