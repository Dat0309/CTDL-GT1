
#define MAX 100
#define MAX_MENU 5


struct hocvien
{
	char maSV[8];
	char hoSV[10];
	char tenLot[10];
	char ten[10];
	char lop[6];
	int namSinh;
	double dtb;
	int	tichLuy;
};




int Chuyen_TapTin_MangCT(char *filename, hocvien a[MAX], int &n);
void Xuat_DSSV(hocvien a[MAX], int n);
void Xuat_SV(hocvien p);
void TieuDe();
void HoanVi(hocvien &x, hocvien &y);
void HeapSort(hocvien a[MAX], int n);
void CreateHeap(hocvien a[MAX], int n);
void Shift(hocvien a[MAX], int l, int r);
void ChonTrucTiep(hocvien a[MAX], int n);
void Buble(hocvien a[MAX], int n);

int Chuyen_TapTin_MangCT(char *filename, hocvien a[MAX], int &n)
{
	ifstream in(filename);
	if (!in)
	{
		return 0;
	}

	n = 0;
	while (!in.eof())
	{
		in >> a[n].maSV;
		in >> a[n].hoSV;
		in >> a[n].tenLot;
		in >> a[n].ten;
		in >> a[n].lop;
		in >> a[n].namSinh;
		in >> a[n].dtb;
		in >> a[n].tichLuy;
		n++;
	}

	in.close();
	return 1;
}

void TieuDe()
{
	cout << "\n:=========================================================================:\n";
	cout << setiosflags(ios::left);
	cout << ':'
		<< setw(8) << "MaSV"
		<< ':'
		<< setw(10) << "Ho"
		<< setw(10) << "Tenlot"
		<< setw(10) << "Ten"
		<< ':'
		<< setw(8) << "Lop"
		<< ':'
		<< setw(6) << "NS"
		<< ':'
		<< setw(6) << "DTB"
		<< ':'
		<< setw(10) << "TichLuy"
		<< ':';
	cout << "\n:=========================================================================:";
}


void Xuat_SV(hocvien p)
{

	cout << setiosflags(ios::left)
		<< ':'
		<< setw(8) << p.maSV
		<< ':'
		<< setw(10) << p.hoSV
		<< setw(10) << p.tenLot
		<< setw(10) << p.ten
		<< ':'
		<< setw(8) << p.lop
		<< ':'
		<< setw(6) << p.namSinh
		<< ':'
		<< setw(6) << setprecision(2) << p.dtb << ':'
		<< setw(10) << p.tichLuy
		<< ':';
}



void Xuat_DSSV(hocvien a[MAX], int n)
{
	int i;
	TieuDe();
	for (i = 0; i < n; i++)
	{
		cout << '\n';
		Xuat_SV(a[i]);
	}
	cout << "\n:=========================================================================:\n";
}


void HoanVi(hocvien &x, hocvien &y)
{
	hocvien t;
	t = x;
	x = y;
	y = t;
}

void Shift(hocvien a[MAX], int l, int r) 
{ 
	int i, j;  
	hocvien x;  
	i = l; 
	j = 2 * i + 1;  
	x = a[i];  
	while (j <= r)  
	{ 
		if (j<r)   
			if (a[j].namSinh<a[j + 1].namSinh)
				j = j + 1;   
		if (a[j].namSinh <= x.namSinh)    
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

void CreateHeap(hocvien a[MAX], int n)
{
	int l;
	l = (n - 1) / 2;
	while (l >= 0)
	{
		Shift(a, l, n - 1);
		l = l - 1;
	}
}

void HeapSort(hocvien a[MAX], int n)
{
	int r, i = 0;
	CreateHeap(a, n);
	r = n - 1;
	while (r > 0)
	{
		i++;
		HoanVi(a[0], a[r]);
		r = r - 1;
		Shift(a, 0, r);
	}
}

void ChonTrucTiep(hocvien a[MAX], int n) 
{ 
	int i, j, cs_max;  
	for (i = 0; i < n - 1; i++)  
	{ 
		cs_max = n - 1 - i;   
		for (j = n - 2 - i; j >= 0; j--)   
			if (a[j].dtb > a[cs_max].dtb)    
				cs_max = j;   
		HoanVi(a[n - 1 - i], a[cs_max]); 
	} 
}

void Buble(hocvien a[MAX], int n) 
{ 
	int i, j;  
	for (j = n - 1; j > 0; j--)  
	{ 
		for (i = 0; i < n - 1; i++)   
			if (a[i].tichLuy > a[i + 1].tichLuy)    
				HoanVi(a[i + 1], a[i]);   
		cout << "\nBuoc " << n - j << " : ";   
		Xuat_DSSV(a, n);
		cout << "\n";
	}  
	cout << "\nCo " << n - 1 << " buoc thuc hien thuat giai.\n"; 
}