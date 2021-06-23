#define MAX 100
#define MAX_MENU 18
typedef int data;
struct tagNode
{
	data		info;
	tagNode*	pNext;
};
typedef tagNode NODE;
struct LIST
{
	NODE* pHead;
	NODE* pTail;
};

//Nhap, Xuat , he thong
void XuatDS(LIST l);
int File_List(char *f, LIST &l);
NODE* GetNode(data x);
void CreatList(LIST &l);
int IsEmpty(LIST l);
//Tim kiem
NODE *Search_First(LIST l, data x);
NODE *Search_End(LIST l, data x);
int Search_Node_x_First(LIST l, data x);
int Search_Node_x_End(LIST l, data x);
void Search_Node_x(LIST l, data x);
//Chen
void AddFirst(LIST &l, NODE* new_ele);
void InsertHead(LIST &l, data x);
void AddTail(LIST &l, NODE *new_ele);
void InsertTail(LIST &l, data x);
void InsertAfter(LIST &l, NODE *q, data x);
void Insert_x_After_first_y(LIST &l, data y, data x);
void Insert_x_After_End_y(LIST &l, data y, data x);//Huy
void RemoveHead(LIST &l);
void RemoveTail(LIST &l);
void RemoveList(LIST &l);
int RemoveNode_First(LIST &l, data x);
int RemoveNode_End(LIST &l, data x);
void Remove_x(LIST &l, data x);//Sap xep
void List_Selection_Sort1(LIST &l);
void List_Selection_Sort2(LIST &l);
//Chuc nang khac
int SoNut_x(LIST l, data x);
int SoNut(LIST l);
void Copy(LIST &l1, LIST l);
void Hoanvi(data &x, data &y);

void XuatDS(LIST l)
{
	NODE *p;
	if (IsEmpty(l))
	{
		cout << "\nDS rong!\n";
		return;
	}
	p = l.pHead;
	while (p != NULL)
	{
		cout << p->info << '\t';
		p = p->pNext;
	}
}
int File_List(char *f, LIST &l)
{
	ifstream in(f); //Mo de doc
	if (!in)
		return 0;
	CreatList(l);
	data x;
	in >> x;
	InsertTail(l, x);
	while (!in.eof())
	{
		in >> x;
		InsertTail(l, x);
	}
	in.close();
	return 1;
}
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
}void CreatList(LIST &l)
{
	l.pHead = l.pTail = NULL;
}
int IsEmpty(LIST l)
{
	if (l.pHead == NULL) // DS rổng
		return 1;
	return 0;
}// Co :Ham tra ve con tro chua dc cua nut dau tien co info la x. Khong co: tra ve NULL
NODE *Search_First(LIST l, data x)
{
	NODE *p;
	p = l.pHead;
	while ((p != NULL) && (p->info != x))
		p = p->pNext;
	return p;
}
//Tim nut co info la x:
//Khong co: ham tra ve -1
//Neu co, ham tra ve vi tri cua nut dau tien co info la x
//Nut dau tien dem tu 0
int Search_Node_x_First(LIST l, data x)
{
	NODE *p;
	int i = 0;
	p = l.pHead;
	while ((p != NULL) && (p->info != x))
	{
		p = p->pNext;
		i++;
	}
	if (p == NULL)
		i = -1;
	return i;
}//Ham tra ve con tro p chua dia chi nut cuoi cung co x (neu co).
NODE *Search_End(LIST l, data x)
{
	NODE *p, *q = NULL;
	p = l.pHead;
	while (p != NULL)
	{
		if (p->info == x)
			q = p;
		p = p->pNext;
	}
	return q;
}//Neu co, ham tra ve vi tri cua nut cuoi cung co info la x
//Nut dau tien dem tu 0
int Search_Node_x_End(LIST l, data x)
{
	NODE *p;
	int Kq = -1, i = 0;
	p = l.pHead;
	while (p != NULL)
	{
		if (p->info == x)
			Kq = i;
		i++;
		p = p->pNext;
	}
	return Kq;
}
//Tim nut co info la x:
//Khong co: ham tra ve -1
//Neu co, ham xuat tat ca cac vi tri x xuat hien
//Nut dau tien dem tu 0
void Search_Node_x(LIST l, data x)
{
	NODE *p;
	int i = 0;
	p = Search_First(l, x);
	if (p == NULL)
	{
		cout << endl << x << " khong co trong danh sach";
		return;
	}
	cout << endl << x << " xuat hien trong danh sach tai cac vi tri :\n";
	p = l.pHead;
	while (p != NULL)
	{
		if (p->info == x)
			cout << i << '\t';
		p = p->pNext;
		i++;
	}
}//Ham chen nut vao dau l
void AddFirst(LIST &l, NODE* new_ele)
{
	if (l.pHead == NULL)
	{
		l.pHead = new_ele;
		l.pTail = l.pHead;
	}
	else
	{
		new_ele->pNext = l.pHead;
		l.pHead = new_ele;
	}
}
//Ham chen x vao dau l
void InsertHead(LIST &l, data x)
{
	NODE* new_ele = GetNode(x);
	if (new_ele == NULL)
	{
		cout << "\nLoi cap phat bo nho! khong thuc hien duoc thao tac nay";
		return;
	}
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
//Chen cuoi
void AddTail(LIST &l, NODE *new_ele)
{
	if (IsEmpty(l))
	{
		l.pHead = new_ele; l.pTail = l.pHead;
	}
	else
	{
		l.pTail->pNext = new_ele;
		l.pTail = new_ele;
	}
}
//Chen cuoi
void InsertTail(LIST &l, data x)
{
	NODE* new_ele = GetNode(x);
	if (new_ele == NULL)
	{
		cout << "\nLoi cap phat bo nho! khong thuc hien duoc thao tac nay";
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
//Chen sau mot nut q
void InsertAfter(LIST &l, NODE *q, data x)
{
	NODE* new_ele = GetNode(x);
	if (new_ele == NULL)
	{
		cout << "\nLoi cap phat bo nho! khong thuc hien duoc thao tac nay";
		return;
	}
	if (q != NULL)
	{
		new_ele->pNext = q->pNext;
		q->pNext = new_ele;
		if (q == l.pTail)
			l.pTail = new_ele;
	}
	else
		AddFirst(l, new_ele);
}
// Chen x vao sau vi tri y xuat hien dau tien trong danh sach neu co, neu khong chen vao dau danh sach
void Insert_x_After_first_y(LIST &l, data y, data x)
{
	NODE *q;
	q = Search_First(l, y);//tim y dau tien
	//chen sau q
	InsertAfter(l, q, x);
}
// Chen x vao sau vi tri y xuat hien cuoi cung trong danh sach neu co, neu khong chen vao dau danh sach
void Insert_x_After_End_y(LIST &l, data y, data x)
{
	NODE *q;
	q = Search_End(l, y);//tim y dau tien
	//chen sau q
	InsertAfter(l, q, x);
}
//Huy nut dau
void RemoveHead(LIST &l)
{
	NODE *p;
	if (l.pHead == NULL)
	{
		cout << "\nDS rong!khong xoa duoc, chon thao tac khac!!!\n";
		return;
	}
	p = l.pHead;
	l.pHead = l.pHead->pNext;
	delete p;
	if (l.pHead == NULL)
		l.pTail = NULL;
}
//Huy nut cuoi
void RemoveTail(LIST &l)
{
	NODE *p, *q;
	if (l.pHead == NULL)
	{
		cout << "\nDS rong!khong xoa duoc, chon thao tac khac!!!\n";
		return;
	}
	//xac dinh dia chi nut dung truoc Tail : q
	p = l.pHead;
	q = NULL;
	while (p != l.pTail)
	{
		q = p;
		p = p->pNext;
	}
	l.pTail = q;
	delete p;
	if (l.pTail == NULL)
		l.pHead = NULL;
	else
		l.pTail->pNext = NULL;
}
//xoa nut dau tien co x
//kq = 0 : khong co nut nao co x
//kq = 1, thanh cong
int RemoveNode_First(LIST &l, data x)
{
	NODE *p = l.pHead;
	NODE *q = NULL;
	while (p != NULL)
	{
		if (p->info == x)
			break;
		q = p; p = p->pNext;
	}
	if (p == NULL)
		return 0;
	//xoa nut sau q
	if (q != NULL)
	{
		if (p == l.pTail)
			l.pTail = q; //xoa nut cuoi
		q->pNext = p->pNext;
	}
	else //xoa nut dau
	{
		l.pHead = p->pNext;
		if (l.pHead == NULL)
			l.pTail = NULL;
	}
	delete p;
	return 1;
}
//xoa nut cuoi cung co x
//kq = 0 : khong co nut nao co x
//kq = 1, thanh cong
int RemoveNode_End(LIST &l, data x)
{
	NODE *p = l.pHead;
	NODE *q = NULL;//truoc p
	NODE *r = NULL;
	NODE *t = NULL;//truoc r
	while (p != NULL)
	{
		if (p->info == x)
		{
			r = p;
			t = q;
		}
		q = p; p = p->pNext;
	}
	if (r == NULL)
		return 0;
	//xoa nut sau t
	if (t != NULL)
	{
		if (r == l.pTail)
			l.pTail = t; //xoa nut cuoi
		t->pNext = r->pNext;
	}
	else //xoa nut dau
	{
		l.pHead = r->pNext;
		if (l.pHead == NULL)
			l.pTail = NULL;
	}
	delete p;
	return 1;
}
//Huy cac nut co du lieu x
void Remove_x(LIST &l, data x)
{
	while (RemoveNode_First(l, x));
}
//Huy DS
void RemoveList(LIST &l)
{
	NODE *p;
	while (l.pHead != NULL)
	{
		p = l.pHead;
		l.pHead = p->pNext;
		delete p;
	}
	l.pTail = NULL;
}
//sap xep
//Chon truc tiep: Hoan doi du lieu
void List_Selection_Sort1(LIST &l)
{
	NODE *min;
	NODE *p, *q;
	p = l.pHead;
	while (p != l.pTail)
	{
		min = p;
		q = p->pNext;
		while (q != NULL)
		{
			if (q->info < min->info)
				min = q;
			q = q->pNext;
		}
		Hoanvi(min->info, p->info);
		p = p->pNext;
	}
}
//Sap tang DS: Hoan doi lien ket
void List_Selection_Sort2(LIST &l)
{
	LIST lRes;//DS ket qua trung gian
	NODE *min, //luu nut dau tien co gia tri min tai moi buoc
		*minprev;//Truoc min
	NODE *p,//truoc q
		*q; //duyet tim min tai moi buoc, moi buoc xac dinh boi pHead, sau moi buoc l giam mot nut
	CreatList(lRes);
	while (l.pHead != NULL)
	{
		p = l.pHead;
		q = p->pNext; // sau p
		min = p;
		minprev = NULL;
		while (q != NULL)
		{
			if (q->info < min->info)
			{
				min = q;
				minprev = p;
			}
			p = q;
			q = q->pNext;
		}
		if (minprev != NULL)
			minprev->pNext = min->pNext;
		else //nut dau la min, se cat nut nay nen cap nhat pHead
			l.pHead = min->pNext;
		min->pNext = NULL;
		AddTail(lRes, min);
	}
	Copy(l, lRes);
}
//Dem so luong nut
int SoNut(LIST l)
{
	NODE *p;
	int i = 0;
	p = l.pHead;
	while (p != NULL)
	{
		p = p->pNext;
		i++;
	}
	return i;
}
//Copy l sang l1
void Copy(LIST &l1, LIST l)
{
	CreatList(l1);
	if (IsEmpty(l))
	{
		cout << "\nDS rong!";
		return;
	}
	NODE *p;
	data x;
	for (p = l.pHead; p != NULL; p = p->pNext)
	{
		x = p->info;
		InsertTail(l1, x);
	}
}
void Hoanvi(data &x, data &y)
{
	data t = x;
	x = y;
	y = t;
}