typedef int KeyType;
struct BSNode
{
	KeyType key;
	BSNode *left;
	BSNode *right;
};
typedef BSNode *BSTree;

BSNode *Createnode(KeyType x)
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

void CreateBST(BSTree &root);
int InsertNode(BSTree &root, KeyType x);
int File_Bst(BSTree &root, char *filename);
void PreOrder(BSTree root);
void InOrder(BSTree root);
void PosOrder(BSTree root);

void CreateBST(BSTree &root)
{
	root = NULL;
}
//them x vao cay
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
	root = Createnode(x);
	if (root == NULL)
		return -1;
	return 1;
}
//Tao cay bst tu file
int File_Bst(BSTree &root, char *filename)
{
	ifstream in(filename);
	if (!in)
		return 0;
	KeyType x;
	int kq;
	CreateBST(root);
	in >> x;
	kq = InsertNode(root, x);
	if (kq == 0 || kq == -1)
		return 0;
	while (!in.eof())
	{
		in >> x;
		kq = InsertNode(root, x);
		if (kq == 0 || kq == -1)
			return 0;
	}
	in.close();
	return 1;
}

//Xuat cay them thu tu NLR
void PreOrder(BSTree root)
{
	if (root != NULL)
	{
		cout << root->key << 't';
		PreOrder(root->left);
		PreOrder(root->right);
	}
}

//Xuat theo LNR
void InOrder(BSTree root)
{
	if (root != NULL)
	{
		InOrder(root->left);
		cout << root->key << 't';
		InOrder(root->right);
	}
}
//Xuat theo LRN
void PosOrder(BSTree root)
{
	if (root != NULL)
	{
		PosOrder(root->left);
		PosOrder(root->right);
		cout << root->key << '\t';
	}
}