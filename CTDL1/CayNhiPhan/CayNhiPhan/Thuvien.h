int DemSoNut(BSTree root);
BSTree Search(BSTree root, KeyType x);
int TinhMax(int a, int b);
int TinhChieuCao(BSTree root);
nhanvien DeleteMin(BSTree &root);
int DeleteNode(nhanvien x, BSTree &root);
int TimMuc_x(BSTree root, KeyType x);
BSTree NLR(BSTree root, double x);


//Dem so Node
int DemSoNut(BSTree root)
{
	if (root == NULL)
		return 0;
	return 1 + DemSoNut(root->left) + DemSoNut(root->right);
}

//Tim nhan vien khi biet ma nhan vien
BSTree Search(BSTree root, KeyType x)
{
	if (root != NULL)
	{
		if (strcmp(root->info.maNV, x) == 0)
			return root;
		else
			if (strcmp(root->info.maNV, x) < 0)
				return Search(root->right, x);
			else
				return Search(root->left, x);
	}
	return NULL;
}
int TinhMax(int a, int b)
{
	if (a >= b)
		return a;
	return b;
}

//Chieu cao cua cay
int TinhChieuCao(BSTree root)
{
	int h;
	if (root == NULL)
		h = -1;
	else
		if (root->left == NULL && root->right == NULL)
			h = 0;
		else
			h = 1 + TinhMax(TinhChieuCao(root->left), TinhChieuCao(root->right));
	return h;
}

//Huy node co gia tri nho nhat cua cay con phai cua root
nhanvien DeleteMin(BSTree &root)
{
	nhanvien k;
	if (root->left == NULL)
	{
		k = root->info;
		root = root->right;
		return k;
	}
	else
		return DeleteMin(root->left);
}

//Huy node co khoa cho truoc ra khoi cay
int DeleteNode(nhanvien x, BSTree &root)
{
	if (root != NULL)
	{
		if (strcmp(x.maNV, root->info.maNV) < 0)
			return DeleteNode(x, root->left);
		else
			if (strcmp(x.maNV, root->info.maNV) > 0)
				return DeleteNode(x, root->right);
			else
				if ((root->left == NULL) && (root->right == NULL))
					root == NULL;
				else
					if (root->left == NULL)
						root = root->right;
					else
						if (root->right == NULL)
							root = root->left;
						else
							return 1;
	}
	return 0;
}
int TimMuc_x(BSTree root, KeyType x)
{
	int muc;
	muc = 0;
	BSTree T = root;
	while (T != NULL)
	{
		if (strcmp(T->info.maNV, x) == 0)
			return muc;
		else
		{
			muc++;
			if (strcmp(T->info.maNV, x) > 0)
				T = T->left;
			else
				T = T->right;
		}
	}
	return -1;
}
//Tim nhan vien biet luong theo thu tu dau
BSTree NLR(BSTree root, double x)
{
	if (root != NULL)
	{
		if (root->info.luong == x)
			return root;
		return NLR(root->left, x);
		return NLR(root->right, x);
	}
}