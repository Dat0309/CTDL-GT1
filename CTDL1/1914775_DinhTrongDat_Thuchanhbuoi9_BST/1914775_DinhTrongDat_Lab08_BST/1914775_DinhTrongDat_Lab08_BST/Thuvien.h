int DemSoNut(BSTree root); 
int DemNutNhoHon(BSTree root, KeyType x);
BSTree Search(KeyType x, BSTree root);
int IsLeaf_x(BSTree root, KeyType x);
int DemNutLa(BSTree root);
int TinhMax(int a, int b);
int TinhChieuCao(BSTree root);
int TimMuc_x(BSTree root, KeyType x);
int SoSanhMuc(BSTree root, KeyType x, KeyType y);
KeyType DeleteMin(BSTree &root);
int DeleteNode(KeyType  x, BSTree &root);


//Dem so nut 
int DemSoNut(BSTree root) 
{  
	if (root == NULL)   
		return 0;  
	return 1 + DemSoNut(root->left) + DemSoNut(root->right); 
}

//Tinh so nut < x va xuat cac nut ra man hinh 
int DemNutNhoHon(BSTree root, KeyType x) 
{  
	int soNut;  
	if (root == NULL)   
		soNut = 0;  
	else  
		if (root->key < x)  
		{   
			cout << root->key << '\t';   
			soNut = 1 + DemNutNhoHon(root->left, x) + DemNutNhoHon(root->right, x);  
		}  
		else   
			soNut = DemNutNhoHon(root->left, x) + DemNutNhoHon(root->right, x); 

return soNut; 
}

//Tim kien nut co khoa x cho truoc 

BSTree Search(KeyType x, BSTree root) 
{
	if (root != NULL)  
	{
		if (root->key == x) //Tim thay x     
			return root;   
		else   if (root->key < x)    
			return Search(x, root->right); 
		//tim x trong cay con phai   
		else    
			return Search(x, root->left); 
		//tim x trong cay con trai  
	}  
	return NULL; //khong co 
} 

//Kiem tra nut co khoa cho truoc co phai la nut la 
int IsLeaf_x(BSTree root, KeyType x) 
{  
	int kq = 0;//khong la nut la  
	BSTree T = Search(x, root);  
	if (T == NULL)   
		kq = -1;//x khong co trong cay  
	else   kq = (T ->left == NULL) && (T ->right == NULL);  
	return kq; 
} 

//Dem so nut la 
int DemNutLa(BSTree root) 
{  
	int soNutLa;  
	if (root == NULL)   
		soNutLa = 0;  
	else  if (root->left == NULL && root->right == NULL)  
	{   
		cout << root->key << '\t';  
		soNutLa = 1;  
	} 
	else  
		soNutLa = DemNutLa(root->left) + DemNutLa(root->right); 

return soNutLa;
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
	else  if (root->left == NULL && root->right == NULL) 
		h = 0;  
	else   h = 1 + TinhMax(TinhChieuCao(root->left), TinhChieuCao(root->right)); 
	return h;
}

//Tim Muc cua nut co khoa x 
//Muc goc = 0 
int TimMuc_x(BSTree root, KeyType x) 
{  
	int muc; 
	muc = 0; 
	BSTree T = root; 
	while (T != NULL) 
	{ 
		if (T->key == x)
			break; 
		else  
		{ 
			muc++;  
			if (T->key > x)  
				T = T->left;   
			else   
				T = T->right;  
		}  
	}  
	return muc; 
} 

//So sanh muc 2 nut : cung muc hay kho khac 
int SoSanhMuc(BSTree root, KeyType x, KeyType y)
{ 
	int kq1, kq2; 
	kq1 = TimMuc_x(root, x);  
	kq2 = TimMuc_x(root, y); 
	if (kq1 > kq2) 
		return 1;
	else  
		if (kq1 < kq2)  
			return -1; 
		else  
			return 0; 
}

//Huy nut co gia tri nho nhat cua cut trai
KeyType DeleteMin(BSTree &root) 
{
	KeyType k;  
	if (root->left == NULL)  
	{
		k = root->key;   
		root = root->right;
		return k;
	}
	else  
		return DeleteMin(root->left);
}

//Huy nut co khoa cho truoc ra khoi cay
int DeleteNode(KeyType  x, BSTree &root) 
{
	if (root != NULL) 
	{
		if (x < root->key)  
			DeleteNode(x, root->left);  
		else   
			if (x  > root->key)  
				DeleteNode(x, root->right);  
			else 
				//x  == root->key  
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
						else //co ca 2 con trai, phai    
							root->key = DeleteMin(root->right); 
		return 1; //Thanh cong  
	}  return 0;//khong thanh cong
}


