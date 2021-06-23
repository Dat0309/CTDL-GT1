typedef int KeyType[8];
struct NhanVien
{
	KeyType maNV;
	char HoTen[25];
	int NamSinh;
	double LuongCB;
	double LuongPC;
	double LuongTL;
};

struct BSNode
{
	KeyType key;
	BSNode *left;
	BSNode *right;
};
typedef BSNode *BSTree;

BSNode *CreateNode(KeyType x)
{
	BSNode *p = new BSNode;
	if (p != NULL)
	{
		p->key = x;
		p->left = NULL;
		p->right = NULL;
	}
	return p;
}

void CreateBST(BSTree &root)
{
	root = NULL;
}

//Them x vao cay BST
int InsertNode(BSTree &root, KeyType x)
{
	if (root != NULL)
	{
		if (root->key == x)
			return 0;
		if (root->key > x)
			return InsertNode(root->left, x);
		else
			return InsertNode(root->right, x);
	}
	root = CreateNode(x);
	if (root == NULL)
		return -1;
	return 1;
}
//Tao cay bstree tu file
int File_BST(BSTree &root, char *filename)
{
	ifstream in(filename);
	if (!in)
		return 0;
	int kq;
	CreateBST(root);
	NhanVien x;

	while (!in.eof())
	{
		in >> x.maNV;
		in >> x.HoTen;
		in >> x.NamSinh;
		in >> x.LuongCB;
		in >> x.LuongPC;
		x.LuongTL = x.LuongCB + x.LuongPC;

		kq = InsertNode(root, x);
		if (kq == 0 || kq == -1)
			return 0;
	}
	in.close();
	return 1;

}