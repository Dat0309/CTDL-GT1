#define MAX 1000

int File_Array(char *filename, int a[MAX], int &n);
void Output(int a[MAX], int n);
void HoanVi(int &a, int &b);
void Selection_L(int a[MAX], int n);
void Copy(int b[MAX], int a[MAX], int n);
void Insertion_L(int a[MAX], int n);
void Interchange_L(int a[MAX], int n);
void Buble_L(int a[MAX], int n);
void Binary_Insertion(int a[MAX], int n);

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

//Hàm sắp xếp Chọn trực tiếp
void Selection_L(int a[MAX], int n) 
{ 
	int i, j, cs_min;  
	for (i = 0; i<n - 1; i++)  
	{ 
		cs_min = i;   
		for (j = i + 1; j<n; j++)   
			if (a[j]<a[cs_min])    
				cs_min = j;   
		HoanVi(a[i], a[cs_min]); 
	} 
}

void Copy(int b[MAX], int a[MAX], int n)
{
	for (int i = 0; i < n; i++)
		b[i] = a[i];
}

//Hàm sắp xếp chèn trực tiếp
void Insertion_L(int a[MAX], int n)
{
	int i, x, pos;
	for (i = 1; i < n; i++)
	{
		x = a[i];
		for (pos = i - 1; (pos >= 0) && (a[pos] > x); pos--)
			a[pos + 1] = a[pos];
		a[pos + 1] = x;
	}
}

//Hàm sắp xếp đổi chỗ trực tiếp
void Interchange_L(int a[MAX], int n)
{
	int i, j;
	for (i = 0; i < n; i++)
	{
		for (j = i + 1; j < n; j++)
			if (a[j] < a[i])
				HoanVi(a[i], a[j]);
	}
}

void Buble_L(int a[MAX], int n)
{
	int i, j;
	for (i = 0; i < n - 1; i++)
	{
		for (j = n - 1; j > i; j--)
			if (a[j] < a[j - 1])
				HoanVi(a[j - 1], a[j]);
	}
}



void Binary_Insertion(int a[MAX], int n)
{
	int l, r, m;  
	int i, j;  
	int x;  
	for (i = 1; i < n; i++)
	{
		x = a[i];
		l = 0;
		r = i - 1;
		while (l <= r)
		{
			m = (l + r) / 2;
			if (x < a[m])
				r = m - 1;
			else
				l = m + 1;
		}
		for (j = i - 1; j >= l; j--)
			a[j + 1] = a[j];
		a[l] = x;
	}
}


	
	
			