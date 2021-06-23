#define MAX 1000

int File_Array(char *filename, int a[MAX], int &n);
void Output(int a[MAX], int n);
void HoanVi(int &a, int &b);
void Copy(int b[MAX], int a[MAX], int n);
void Selection_R(int a[MAX], int n);
void Selection_R_L(int a[MAX], int n);
void Insertion_R(int a[MAX], int n);
void Interchange_R(int a[MAX], int n);
void Buble_R(int a[MAX], int n);
void Shaker(int a[MAX], int n);


int File_Array(char *filename, int a[MAX], int &n)
{
	ifstream in(filename);
	if (!in)
		return 0;
	in >> n;

	for (int i = 0; i < n; i++)
		in >> a[i];
	in.close();
	return 1;
}

void Output(int a[MAX], int n)
{
	int i;
	for (i = 0; i<n; i++)
		cout << a[i] << "\t";
}

void HoanVi(int &a, int &b)
{
	int tam = a;
	a = b;
	b = tam;
}

void Copy(int b[MAX], int a[MAX], int n)
{
	for (int i = 0; i < n; i++)
		b[i] = a[i];
}

//Sắp xếp chọn trực tiếp
void Selection_R(int a[MAX], int n) 
{ 
	int i, j, cs_max;  
	for (i = 0; i < n - 1; i++)  
	{ 
		cs_max = n - 1 - i;   
		for (j = n - 2 - i; j >= 0; j--)   
			if (a[j] > a[cs_max])    
				cs_max = j;   
		HoanVi(a[n - 1 - i], a[cs_max]); 
	} 
}

//Sắp xếp chọn 2 đầu
void Selection_R_L(int a[MAX], int n) 
{
	int i, j, cs_min, cs_max;  
	for (i = 0; i < n / 2; i++)  
	{
		cs_min = i;   
		cs_max = n - 1 - i;   
		for (j = i; j <= n - 1 - i; j++)   
		{ 
			if (a[j] < a[cs_min])     
				cs_min = j;    
			if (a[j] > a[cs_max])     
				cs_max = j; 
		}   
		if (cs_min == n - i - 1)    
		{
			HoanVi(a[i], a[cs_min]);    
			if (cs_max != i)      
				HoanVi(a[cs_max], a[n - i - 1]);   
		}   
		else   
		{    
			HoanVi(a[cs_max], a[n - i - 1]);    
			HoanVi(a[i], a[cs_min]);   
		}  
	} 
} 

//Sắp xếp chèn trực tiếp
void Insertion_R(int a[MAX], int n)
{
	int i, x, pos;
	for (i = n - 2; i >= 0; i--)
	{
		x = a[i];
		for (pos = i + 1; (pos < n) && (a[pos] < x); pos++)
			a[pos - 1] = a[pos];
		a[pos - 1] = x;
	}
}

//Sắp xếp đổi chỗ trực tiếp
void Interchange_R(int a[MAX], int n) 
{ 
	int i, j;  
	for (j = n - 1; j > 0; j--)  
	{ 
		for (i = 0; i < j; i++)   
			if (a[i] > a[j])    
				HoanVi(a[i], a[j]); 
	} 
}

//Sắp xếp nổi bọt
void Buble_R(int a[MAX], int n) 
{ 
	int i, j;  
	for (j = n - 1; j > 0; j--)  
	{ 
		for (i = 0; i < n - 1; i++)   
			if (a[i] > a[i + 1])    
				HoanVi(a[i + 1], a[i]);   
		cout << "\nBuoc " << n - j << " : ";   
		Output(a, n);   
		cout << "\n"; 
	}  
	cout << "\nCo " << n - 1 << " buoc thuc hien thuat giai.\n"; 
}

//Sắp xếp shaker
void Shaker(int a[MAX], int n)
{
	int l = 0, r = n - 1;
	int k = n - 1;
	int j;
	cout << "\nBat dau sap xep:\n";
	while (l < r)
	{
	
		j = r;
	  while (j>l)   
	  {    
		  
		  if (a[j]<a[j - 1])    
		  {     
			  HoanVi(a[j], a[j - 1]);     
			  k = j;  
			  
			  cout << "\nk = " << k;    
		  }    
		  j = j - 1;   
	  }   
	  l = k;  
	  j = l;    
	  while (j<r)   
	  {    
		  if (a[j]>a[j + 1]) 
		  {
			  HoanVi(a[j], a[j + 1]);     k = j;
		  }    j = j + 1;
	  }   r = k;
	}
}