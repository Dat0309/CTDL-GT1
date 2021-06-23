#define MAX 100 
struct sinhvien;
int TapTin_MangCT(char *filename, sinhvien a[MAX], int &n);
void TieuDe();
void Xuat_SV(sinhvien p);
void Xuat_DSSV(sinhvien a[MAX], int n);
void Partition(sinhvien a[MAX], int l, int r);
void HoanVi(sinhvien &x, sinhvien &y);
void QuickSort(sinhvien a[MAX], int n);
void Shift(sinhvien a[MAX], int l, int r);
void Create_Heap(sinhvien a[MAX], int n);
void HeapSort(sinhvien a[MAX], int n);
void MergeSort(sinhvien F[MAX], int n);
void  Distribution(sinhvien F[MAX], int n, sinhvien F1[MAX], int &h1, sinhvien F2[MAX], int &h2, int p);
void Merge(sinhvien F1[MAX], int h1, sinhvien F2[MAX], int h2, sinhvien F[MAX], int p);
void Copy(sinhvien b[MAX], sinhvien a[MAX], int n);


struct sinhvien
{
	char  maSV[8];
	char  hoSV[10];
	char  tenLot[10];
	char  ten[10];
	char  lop[6];
	int  namSinh;
	double  dtb;
	int tichLuy;
};

int TapTin_MangCT(char *filename, sinhvien a[MAX], int &n)
{
	ifstream in(filename);
	if (!in)
		return 0;

	char  maSV[8];
	char  hoSV[10];
	char  tenLot[10];
	char  ten[10];
	char  lop[6];
	int  namSinh;
	double  dtb;
	int tichLuy;

	n = 0;
	in >> maSV; strcpy_s(a[n].maSV, maSV);
	in >> hoSV; strcpy_s(a[n].hoSV, hoSV);
	in >> tenLot; strcpy_s(a[n].tenLot, tenLot);
	in >> ten; strcpy_s(a[n].ten, ten);
	in >> lop; strcpy_s(a[n].lop, lop);
	in >> namSinh; a[n].namSinh = namSinh;
	in >> dtb; a[n].dtb = dtb;
	in >> tichLuy; a[n].tichLuy = tichLuy;

	while (!in.eof())
	{
		n++;
		in >> maSV; strcpy_s(a[n].maSV, maSV);
		in >> hoSV; strcpy_s(a[n].hoSV, hoSV);
		in >> tenLot; strcpy_s(a[n].tenLot, tenLot);
		in >> ten; strcpy_s(a[n].ten, ten);
		in >> lop; strcpy_s(a[n].lop, lop);
		in >> namSinh; a[n].namSinh = namSinh;
		in >> dtb; a[n].dtb = dtb;
		in >> tichLuy; a[n].tichLuy = tichLuy;
	}
	n++;
	in.close();
	return 1;
}

void TieuDe()
{
	int i;
	cout << "\n";
	cout << ':';
	for (i = 1; i <= 74; i++)
		cout << '=';
	cout << ':';
	cout << "\n";

	cout << setiosflags(ios::left);
	cout << ':';
	cout << setw(9) << "Ma SV"
		<< ':'
		<< setw(10) << "Ho"
		<< ':'
		<< setw(9) << "Tlot"
		<< ':'
		<< setw(9) << "Ten"
		<< ':'
		<< setw(10) << "Lop"
		<< ':'
		<< setw(6) << "NSinh"
		<< ':'
		<< setw(6) << "DTB"
		<< ':'
		<< setw(8) << "TichLuy"
		<< ':';

	cout << "\n";
	cout << ':';
	for (i = 1; i <= 74; i++)
		cout << '=';
	cout << ':';
	cout << "\n";
}

void Xuat_SV(sinhvien p)
{
	cout << ':';
	cout << setiosflags(ios::left)
		<< setw(9) << p.maSV
		<< ':'
		<< setw(10) << p.hoSV
		<< setw(10) << p.tenLot
		<< setw(10) << p.ten
		<< ':'
		<< setw(10) << p.lop
		<< ':'
		<< setw(6) << p.namSinh
		<< ':'
		<< setw(6) << setiosflags(ios::fixed) << setprecision(2) << p.dtb
		<< ':'
		<< setw(8) << p.tichLuy
		<< ':';
}

void Xuat_DSSV(sinhvien a[MAX], int n)
{
	int i;
	TieuDe();
	for (i = 0; i < n; i++)
	{
		Xuat_SV(a[i]);
		cout << '\n';
	}
	cout << ':';
	for (i = 1; i <= 74; i++)
		cout << '=';
	cout << ':';
	cout << "\n";
}

void HoanVi(sinhvien &x, sinhvien &y) 
{ 
	sinhvien t;  
	t = x;  
	x = y;  
	y = t; 
}

//Thuat giai phan hach theo dtb
void Partition(sinhvien a[MAX], int l, int r)
{
	int i, j;
	sinhvien x;  
	x = a[(l + r) / 2];  
	i = l; j = r;  
	do  
	{ 
		while (a[i].dtb <x.dtb)    
			i++;   
		while (a[j].dtb>x.dtb)    
			j--;   if (i <= j)   
		{ 
			HoanVi(a[i], a[j]);    
			i++; 
			j--; 
		} 
	} 
	while (i <= j);

	if (l < j)  
		Partition(a, l, j);  
	if (i < r)   
		Partition(a, i, r);
}

//Quicksort
void QuickSort(sinhvien a[MAX], int n) 
{ 
	Partition(a, 0, n - 1); 
}

//Heapsort
void Shift(sinhvien a[MAX], int l, int r) 
{ 
	int i, j;  
	sinhvien x;  
	i = l; 
	j = 2 * i + 1;  
	x = a[i];  
	while (j <= r)  
	{ 
		if (j<r)   
			if (a[j].dtb<a[j + 1].dtb)    
				j = j + 1;   
		if (a[j].dtb <= x.dtb)    
			return;   
		else   
		{ 
			a[i] = a[j];    
			i = j;    
			j = 2 * i + 1;    
			a[i] = x; 
		} 
	} 
}

void Create_Heap(sinhvien a[MAX], int n)
{
	int l;
	l = (n - 1) / 2;
	while (l >= 0)
	{
		Shift(a, l, n - 1);
		l = l - 1;
	}
}

void HeapSort(sinhvien a[MAX], int n) 
{ 
	int r, i = 0;  
	Create_Heap(a, n);  
	r = n - 1;  
	while (r>0)  
	{ 
		i++;   
		HoanVi(a[0], a[r]);   
		r = r - 1;   
		Shift(a, 0, r); 
	} 
}

//Mergesort
void MergeSort(sinhvien F[MAX], int n) 
{
	int  p = 1, h1, h2;  
	sinhvien F1[MAX], F2[MAX];  
	int i = 1;  
	while (p < n)  
	{
		Distribution(F, n, F1, h1, F2, h2, p);   
		Merge(F1, h1, F2, h2, F, p);

		i++;   
		p = p * 2;
	}
}

void  Distribution(sinhvien F[MAX], int n, sinhvien F1[MAX], int &h1, sinhvien F2[MAX], int &h2, int p) 
{
	int i, k = 1, l = 0;  
	h1 = 0; h2 = 0;  
	do  
	{ 
		i = 1;   
		while (i <= p && l < n)   
		{ 
			if (k == 1)    
			{ 
				F1[h1++] = F[l]; 
			} else    
			{ 
				F2[h2++] = F[l]; 
			}    
			i++;    
			l++; 
		}   
		k = 3 - k; 
	} while (l < n);

}

void Merge(sinhvien F1[MAX], int h1, sinhvien F2[MAX], int h2, sinhvien F[MAX], int p)
{
	int i1 = 0, i2 = 0, r1, r2;  int h = 0;  while (i1 < h1 && i2 < h2)  
	{
		r1 = r2 = 1;   
		while ((r1 <= p) && (r2 <= p) && i1 < h1 && i2 < h2)   
		{
			if (F1[i1].dtb <= F2[i2].dtb)    
			{

				F[h++] = F1[i1];     
				r1++;     
				i1++;
			}
			else    
			{

				F[h++] = F2[i2];     
				r2++;     
				i2++;
			}
		}

		while (i1 < h1 && r1 <= p)   
		{

			F[h++] = F1[i1];    
			i1++; 
			r1++;
		}   while (i2 < h2 && r2 <= p)   
		{

			F[h++] = F2[i2];    
			i2++; 
			r2++;
		}
	}  while (i1 < h1)  
	{

		F[h++] = F1[i1];   
		i1++;
	}  while (i2 < h2)  
	{

		F[h++] = F2[i2];   
		i2++;
	}

}

void Copy(sinhvien b[MAX], sinhvien a[MAX], int n) 
{ 
	for (int i = 0; i < n; i++)   
		b[i] = a[i]; 
}