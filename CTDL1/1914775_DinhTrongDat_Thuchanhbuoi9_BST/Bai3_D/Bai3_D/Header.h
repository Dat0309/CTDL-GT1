#pragma once 
#define MAXCOT 70 

typedef char KeyType[8];
struct nhanvien 
{
	KeyType maNV;
	char hoTen[25];  
	int  namSinh; 
	char diachi[15];
	double luong; 
};

struct BSNode
{ 
	nhanvien info; 
	BSNode *left;  
	BSNode *right; 
};
typedef BSNode *BSTree;
//Tao nut voi x cho truoc 
BSNode  *CreateNode(nhanvien x) 
{  
	BSNode *p = new BSNode; 
	if (p != NULL)  
	{   
		p->info = x;  
		p->left = NULL;  
		p->right = NULL; 
	} 
	return p; 
}

//Khoi tao cay BST rong 
void CreateBST(BSTree &root)
{ 
	root = NULL; 
} 

//Them x vao cay BST
int InsertNode(BSTree &root, nhanvien x) 
{

	//Cay khac rong 
	if (root != NULL) 
	{  
		if (strcmp(root->info.maNV, x.maNV) == 0)    
			return 0; 
		// x da co san   
		if ((strcmp(root->info.maNV, x.maNV)> 0))  
			return  InsertNode(root->left, x);  
		else   
			return InsertNode(root->right, x); 
	}
	//root == NULL : chen vi tri nut ngoai thích hop - la nut la sau khi chen xong 

	root = CreateNode(x); 
	if (root == NULL)  
		return -1; 
	return 1;
	//thanh cong
} 

//Tao cay BST tu file 
int File_BST(BSTree &root, char *filename)
{
	ifstream in(filename);
	if (!in)
		return 0;

	KeyType maNV; //truong khoa, dung de dua du lieu len cay   
	char hoTen[25];
	int  namSinh;
	char diachi[15];
	double luong;

	int kq;  CreateBST(root);
	nhanvien x;

	in >> maNV; strcpy_s(x.maNV, maNV);
	in >> hoTen; strcpy_s(x.hoTen, hoTen);
	in >> namSinh; x.namSinh = namSinh;
	in >> diachi; strcpy_s(x.diachi, diachi);
	in >> luong; x.luong = luong;

	kq = InsertNode(root, x);
	if (kq == 0 || kq == -1)
		return 0;
	while (!in.eof())
	{
		in >> maNV; strcpy_s(x.maNV, maNV);
		in >> hoTen; strcpy_s(x.hoTen, hoTen);
		in >> namSinh; x.namSinh = namSinh;
		in >> diachi; strcpy_s(x.diachi, diachi);
		in >> luong; x.luong = luong;

		kq = InsertNode(root, x);
		if (kq == 0 || kq == -1)
			return 0;
	}
	in.close();
	return 1;
}

void TieuDe() 
{ 
	int i;
	cout << "\n:"; 
	for (i = 1; i <= MAXCOT; i++) 
		cout << "=";
	cout << ":\n"; 
	cout << setiosflags(ios::left);
	cout << ':' 
		<< setw(8) << "Ma NV"
		<< ':'
		<< setw(25) << "Ho va Ten" 
		<< ':'
		<< setw(5) << "NS" 
		<< ':'
		<< setw(15) << "Dia Chi"
		<< ':' 
		<< setw(13) << "Luong" 
		<< ':';  
	cout << "\n:";  
	for (i = 1; i <= MAXCOT; i++)  
		cout << "=";  
	cout << ":"; 
}

void Xuat_NV(nhanvien p) 
{ 
	cout << endl; 
	cout << setiosflags(ios::left)
		<< ':'
		<< setw(8) << p.maNV
		<< ':'
		<< setw(25) << p.hoTen 
		<< ':' 
		<< setw(5) << p.namSinh
		<< ':'
		<< setw(15) << p.diachi 
		<< ':'
		<< setw(13) << setprecision(2) << setiosflags(ios::fixed) << p.luong 
		<< ':'; 
}

//Xuat cay theo thu tu truoc : NLR 
void PreOrder(BSTree root) 
{  
	if (root != NULL)  
	{  
		Xuat_NV(root->info); 
		PreOrder(root->left);  
		PreOrder(root->right);
	} 
}

//LNR
void InOrder(BSTree root) 
{ 
	if (root != NULL) 
	{
		InOrder(root->left); 
		Xuat_NV(root->info); 
		InOrder(root->right);
	} 
}

//Xuat cay theo thu tu sau : LRN 
void PosOrder(BSTree root) 
{ 
	if (root != NULL)
	{  
		PosOrder(root->left); 
		PosOrder(root->right);  
		Xuat_NV(root->info);
	}
} 





