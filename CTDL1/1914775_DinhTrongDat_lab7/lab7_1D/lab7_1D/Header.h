#define MAX_MENU 13 
#define MAX		13
typedef int data;
struct tagNode
{
	data  info; 
	tagNode*  pNext;
};
typedef tagNode NODE;
struct LLIST
{
	NODE* pHead; 
	NODE* pTail; 
};

NODE*  GetNode(data x)
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
void CreatLLIST(LLIST &l);
void InsertHead(LLIST &l, data x);
void  InsertTail(LLIST &l, data x);
void Output_Llist(LLIST l);
int File_LLIST(char *f, LLIST &l);


void CreatLLIST(LLIST &l) 
{
	l.pHead = l.pTail = NULL;
}

void InsertHead(LLIST &l, data x)
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
void  InsertTail(LLIST &l, data x) 
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
void Output_Llist(LLIST l)
{
	NODE  *p; 
	if (l.pHead == NULL) 
	{
		cout << "\nDS don vong rong!\n"; 
		return;
	}  
	p = l.pHead;
	do  
	{ 
		cout << p->info << '\t'; 
		p = p->pNext;
	} 
	while (p != l.pHead); //Chua giap vong 
}
int File_LLIST(char *f, LLIST &l)
{
	ifstream in(f); 
	//Mo de doc 
	if (!in) 
		return 0; 

	CreatLLIST(l); 
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
