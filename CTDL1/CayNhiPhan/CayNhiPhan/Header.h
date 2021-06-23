#pragma once
#define MAXCOT 70
typedef char KeyType[8];

struct nhanvien
{
	KeyType maNV;
	char hoTen[25];
	int namSinh;
	char diaChi[15];
	double luong;
};

struct BSNode
{
	nhanvien info;
	BSNode *left;
	BSNode *right;
};
typedef BSNode *BSTree;

BSNode *CreateNode(nhanvien x);
void CreateBST(BSTree &root);
int InsertNode(BSTree &root, nhanvien x);
int FileBST(BSTree &root, char *filename);
void TieuDe();
void Xuat_NV(nhanvien p);
void PreOrder(BSTree root);
void InOrder(BSTree root);
void PosOrder(BSTree root);

//Tao nut voi x cho truoc
BSNode *CreateNode(nhanvien x)
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

//Khoi tao cay BSTree rong
void CreateBST(BSTree &root)
{
	root = NULL;
}
//Them x vao cay BSTree
int InsertNode(BSTree &root, nhanvien x)
{
	if (root != NULL)
	{
		if (strcmp(root->info.maNV, x.maNV) == 0)

			return 0;
		if (strcmp(root->info.maNV, x.maNV) > 0)
			return InsertNode(root->left, x);
		else
			return InsertNode(root->right, x);
	}
	root = CreateNode(x);
	if (root == NULL)
		return -1;
	return 1;
}
//Tao file
int FileBST(BSTree &root, char *filename)
{
	ifstream in(filename);
	if (!in)
		return 0;
	KeyType maNV;
	char hoTen[25];
	int namSinh;
	char diaChi[15];
	double luong;

	int kq;
	CreateBST(root);
	nhanvien x;
	in >> maNV; strcpy_s(x.maNV, maNV);
	in >> hoTen; strcpy_s(x.hoTen, hoTen);
	in >> namSinh; x.namSinh = namSinh;
	in >> diaChi; strcpy_s(x.diaChi, diaChi);
	in >> luong; x.luong = luong;
	kq = InsertNode(root, x);
	if (kq == 0 || kq == -1)
		return 0;
	while (!in.eof())
	{
		in >> maNV; strcpy_s(x.maNV, maNV);
		in >> hoTen; strcpy_s(x.hoTen, hoTen);
		in >> namSinh; x.namSinh = namSinh;
		in >> diaChi; strcpy_s(x.diaChi, diaChi);
		in >> luong; x.luong = luong;
		kq = InsertNode(root, x);
		if (kq == 0 || kq == -1)
			return 0;
	}
	in.close();
	return 1;
}
//Xuat tieu de
void TieuDe()
{
	int i;
	cout << "\n";
	for (i = 1; i <= MAXCOT; i++)
		cout << "=";
	cout << endl;
	cout << setiosflags(ios::left);
	cout << ":"
		<< setw(8) << "MaNV"
		<< ":"
		<< setw(25) << "HO TEN"
		<< ":"
		<< setw(5) << "NS"
		<< ":"
		<< setw(15) << "DiaChi"
		<< ":"
		<< setw(13) << "Luong"
		<< ":";
	cout << "\n";
	for (i = 1; i < MAXCOT; i++)
		cout << "=";
	cout << ":";
}
//Xuat 1 nhan vien
void Xuat_NV(nhanvien p)
{
	cout << endl;
	cout << setiosflags(ios::left)
		<< ":"
		<< setw(8) << p.maNV
		<< ":"
		<< setw(25) << p.hoTen
		<< ":"
		<< setw(5) << p.namSinh
		<< ":"
		<< setw(15) << p.diaChi
		<< ":"
		<< setw(13) << setiosflags(2) << setiosflags(ios::fixed) << p.luong
		<< ":";
}
//NLR
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
//LRN
void PosOrder(BSTree root)
{
	if (root != NULL)
	{
		PosOrder(root->left);
		PosOrder(root->right);
		Xuat_NV(root->info);
	}
}
