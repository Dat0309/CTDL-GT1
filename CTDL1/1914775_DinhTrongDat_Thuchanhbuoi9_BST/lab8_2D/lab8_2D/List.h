
//Kieu cac nut trong Queue, Stack 
struct NODE 
{  
	BSTree info;  
	NODE* pNext; 
}; 

struct List //Queeue, Stack 
{  
	NODE *pHead;  
	NODE *pTail; 
}; 


NODE  *GetNode(BSTree info);
void CreateList(List &l);
int IsEmpty(List l);
void Insertail(List &l, BSTree info);
BSTree RemoHead(List &l);
void InsertHead(List &s, BSTree info);
void BFS(BSTree root);
void BFS_Muc_k(BSTree root, int k);
void BFS_TheoMuc(BSTree root);
void DFS(BSTree root);



	//Tao nut rong
NODE  *GetNode(BSTree info)
{  
	NODE *p = new NODE; 
	if (p != NULL)
	{  
		p->info = info; 
		p->pNext = NULL;
	} 
	return p;
} 


	//Tao List rong (Queue, Stack)
void CreateList(List &l)
{  
	l.pHead = l.pTail = NULL;
} 

int IsEmpty(List l) 
	{
		if (l.pHead == NULL)
			return 1; 
		return 0;
}

//Them cuoi : EnQueue -> phuc vu cho Queue 
void Insertail(List &l, BSTree info)
{  
	NODE *x = GetNode(info);
	if (x == NULL) 
		return; 
	if (l.pHead == NULL) 
	{  
		l.pHead = x;
		l.pTail = l.pHead; 
	} 
	else 
	{  
		l.pTail->pNext = x;   
		l.pTail = x;   
		l.pTail->pNext = NULL; 
	} 
} 

//Xoa dau, tra ve du lieu nut bi xoa : ->Phuc vu cho Queue, Stack : DeQueue , Pop
BSTree RemoHead(List &l)//lay ra va huy ptu dau list. 
{  
	NODE *p;  
	BSTree x;
	if (l.pHead == NULL) 
		return NULL; 
	else 
	{  
		p = l.pHead; 
		x = p->info; 
		l.pHead = p->pNext; 
		delete p;  
		return x;  
	} 
} 
//Them dau, phuc vu cho Stack : Push 
void InsertHead(List &s, BSTree info)
{ 
	NODE *x = GetNode(info); 
	if (x == NULL)  
		return; 
	if (s.pHead == NULL)
	{  
		s.pHead = x; 
		s.pTail = s.pHead; 
	} 
	else
	{  
		x->pNext = s.pHead->pNext;
		s.pHead->pNext = x;  
		s.pHead = x;
	} 
} 


//--------------Queue-----------
//Xuat theo chieu rong (tung muc) : Dung Queue 
void BFS(BSTree root) 
{ 
	List q; 
	NODE *t; 
	BSTree p; 
	CreateList(q); 
	if (root == NULL) 
		cout << "\n Cay rong."; 
	else 
	{   
		t = GetNode(root); 
		Insertail(q, t->info); 
		do  
		{  
			p = RemoHead(q); 
			cout << p->key << '\t';  
			if (p->left != NULL) 
			{   
				t = GetNode(p->left); 
					Insertail(q, t->info);
			}    if (p->right != NULL)    { t = GetNode(p->right);     Insertail(q, t->info); }

		} while (IsEmpty(q) == 0);   cout << endl;
	}
}

//Xuat nut muc k 
void BFS_Muc_k(BSTree root, int k)
{ 
	List q;
	NODE *t; 
	BSTree p; 
	CreateList(q); 
	if (root == NULL)  
		cout << "\n Cay rong."; 
	else 
	{  
		t = GetNode(root); 
		Insertail(q, t->info); 
		do  
		{  
			p = RemoHead(q); 
			if (TimMuc_x(root, p->key) == k)  
				cout << p->key << '\t';  
			if (p->left != NULL) 
			{   
				t = GetNode(p->left); 
				Insertail(q, t->info);  
			} 
			if (p->right != NULL)   
			{    
				t = GetNode(p->right);   
				Insertail(q, t->info);   
			} 

  }
		while (IsEmpty(q) == 0); 
  cout << endl; 
	} 
}

//Xuat theo muc
void BFS_TheoMuc(BSTree root)
{  
	int i, h; 
	h = TinhChieuCao(root);
	cout << "\n\nXuat BST theo chieu rong (tung muc):\n"; 
	for (i = 0; i <= h; i++) 
	{   
		cout << endl << "Muc " << i << " : ";
		BFS_TheoMuc(root);
	} 
} 

//Stack //----------------------------------------------
//Xuat theo chieu sau : dung Stack 
void DFS(BSTree root) 
{  
	List s;
	NODE *t; 
	BSTree p; 
	CreateList(s); 
	if (root == NULL) 
		cout << "\n Cay rong.";
	else
	{  
		t = GetNode(root); 
		InsertHead(s, t->info);
		do  
		{ 
			p = RemoHead(s);
			cout << p->key << '\t'; 

if 
(p->left != NULL)  
DFS(p->left);    
if (p->right != NULL)   
{ 
	t = GetNode(p->right); 
	InsertHead(s, t->info);
}  
		} 
		while (IsEmpty(s) == 0);  
		cout << endl; 
	} 
}