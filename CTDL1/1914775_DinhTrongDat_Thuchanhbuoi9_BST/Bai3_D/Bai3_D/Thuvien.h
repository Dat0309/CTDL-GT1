//Dem so nut 
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
			//Tim thay x    
			return root;  
		else   
			if (strcmp(root->info.maNV, x) < 0)  
				return Search(root->right, x);
		//tim x trong cay con phai   
			else    
				return Search(root->left, x);
		//tim x trong cay con trai  
	} 
	return NULL; 
	//khong co 
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
	int h;  if (root == NULL)  
		h = -1;
	else  
		if (root->left == NULL && root->right == NULL)  
			h = 0; 
		else   
			h = 1 + TinhMax(TinhChieuCao(root->left), TinhChieuCao(root->right));  
	return h; 
}

//Huy nut co gia tri nho nhat cua cay con phai cua root
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

//Huy mot nut co khoa cho truoc ra khoi cay : nut the mang la phan tu nho nhat củ cay cay con phai 
int DeleteNode(nhanvien  x, BSTree &root) 
{
	if (root != NULL) 
	{
		if (strcmp(x.maNV, root->info.maNV) < 0)  
			return DeleteNode(x, root->left); 
		else 
			if (strcmp(x.maNV, root->info.maNV) > 0) 
				return DeleteNode(x, root->right);  
			else //x  == root->key    
				if ((root->left == NULL) && (root->right == NULL))
					//khong co con trai, khong co con phai  
					root = NULL;   
				else   
					if (root->left == NULL) 
						//co 1 con : con phai, khong co con trai    
						root = root->right;   
					else   
						if (root->right == NULL) 
							//co 1 con : con trai, khong co con phai    
							root = root->left;   
						else 
							//co ca 2 con trai, phai 
							return 1; //Thanh cong  
	}  return 0;
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
			if (strcmp(T->info.maNV, x) >0)  
				T = T->left; 
			else  
				T = T->right;
		} 
	} 
	return -1;
	//T rong, hoac khong co nut chua x 
}

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

