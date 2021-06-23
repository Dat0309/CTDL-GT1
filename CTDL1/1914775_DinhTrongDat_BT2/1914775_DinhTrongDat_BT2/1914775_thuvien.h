﻿
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
void Insertion_L(hocvien a[MAX], int n);
void QuickSort(hocvien a[MAX], int n);
void Partition(hocvien a[MAX], int l, int r);
void Interchange_L(hocvien a[MAX], int n);

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

void Partition(hocvien a[MAX], int l, int r)
{
	int i, j;
	hocvien x;
	x = a[(l + r) / 2];
	i = l; j = r;
	do
	{
		while (strcmp(a[i].maSV,a[i-1].maSV) <0)
			i++;
		while (strcmp(a[i].maSV, a[i - 1].maSV) >0)
			j--;   
if (i <= j)
		{
			HoanVi(a[i], a[j]);
			i++;
			j--;
		}
	} while (i <= j);

	if (l < j)
		Partition(a, l, j);
	if (i < r)
		Partition(a, i, r);
}

void QuickSort(hocvien a[MAX], int n) 
{ 
	Partition(a, 0, n - 1);
}

//Hàm sắp xếp chèn trực tiếp
void Insertion_L(hocvien a[MAX], int n)
{
	int i, j;
	for (i = 0; i < n- 1; i++) 
	{
		for (j = n - 1; j > i; j--) {
			if (strcmp(a[j].maSV, a[j - 1].maSV) < 0) 
			{
				hocvien sv = a[j];
				a[j] = a[j - 1];
				a[j - 1] = sv;
			}
		}
	}
}

//Hàm sắp xếp đổi chỗ trực tiếp

void Interchange_L(hocvien a[MAX], int n)
{
	int i, j;
	for (i = 0; i < n - 1; i++)
	{
		for (j = n - 1; j > i; j--) {
			if (strcmp(a[j].maSV, a[j - 1].maSV) < 0)
			{
				hocvien sv = a[j];
				a[j] = a[j - 1];
				a[j - 1] = sv;
			}
		}
	}
}