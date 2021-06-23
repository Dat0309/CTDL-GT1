


//Dem so nut
int DemSoNut(BSTree root) 
{
	if (root == NULL)   
		return 0;  
	return 1 + DemSoNut(root->left) + DemSoNut(root->right);

}

//Tim so nut < x va xuat ra man hinh
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

//Tim kiem node co khoa x cho truoc
BSTree Search(KeyType x, BSTree root) 
{
	if (root != NULL)  {
		if (root->key == x) //Tim thay x     
			return root;   
		else   
			if (root->key < x)    
				return Search(x, root->right); //tim x trong cay con phai   
			else    
				return Search(x, root->left); //tim x trong cay con trai  
	}  
	return NULL; //khong co 
} 
//Kiem tra niuut co phai nut la khon
int IsLeaf_x(BSTree root, KeyType x) 
{
	int kq = 0;//khong la nut la  
	BSTree T = Search(x, root);  
	if (T == NULL)   
		kq = -1;//x khong co trong cay  
	else   
		kq = (T ->left == NULL) && (T ->right == NULL);  
	return kq; 
} 

int DemNutLa(BSTree root) 
{
	int soNutLa;  
	if (root == NULL)   
		soNutLa = 0;  
	else  
		if (root->left == NULL && root->right == NULL)  
		{ 
			cout << root->key << '\t';   soNutLa = 1;
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

//Chieu cao cua node
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

//Tim muc cua node co khoa x
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
//Huy nut
KeyType DeleteMin(BSTree &root) 
{
	KeyType k;  
	if (root->left == NULL)  
	{
		k = root->key;   root = root->right;
		return k;
	}
	else   return DeleteMin(root->left);
}
//Huy nut co khao cho truoc
int DeleteNode(KeyType  x, BSTree &root) 
{
	if (root != NULL)  
	{
		if (x < root->key)    
			DeleteNode(x, root->left);   
		else    
			if (x  > root->key)     
				DeleteNode(x, root->right);    
			else //x  == root->key     
				if ((root->left == NULL) && (root->right == NULL))      //khong co con trai, khong co con phai      
					root = NULL;     
				else      if (root->left == NULL)       //co 1 con : con phai, khong co con trai       
					root = root->right;      
				else       
					if (root->right == NULL)        //co 1 con : con trai, khong co con phai        
						root = root->left;       
					else //co ca 2 con trai, phai        
						root->key = DeleteMin(root->right);   
				return 1; //Thanh cong  
	}  
	return 0;//khong thanh cong 
}