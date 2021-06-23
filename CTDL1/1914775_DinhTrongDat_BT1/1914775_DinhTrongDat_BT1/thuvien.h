#define MAX 100 
struct sinhvien;
int TapTin_MangCT(char *filename, sinhvien a[MAX], int &n);
void TieuDe();
void Xuat_SV(sinhvien p);
void Xuat_DSSV(sinhvien a[MAX], int n);
void Tim_TheoLop(char lop[6], sinhvien a[MAX], int n);
void Tim_TheoTen(char ten[10], sinhvien a[MAX], int n);
void TKNP_Theo_TichLuy(sinhvien a[MAX], int n);
int TKNP_Tang(int x[MAX], int n, int tichLuy);
int TKNP_Giam(int x[MAX], int n, int tichLuy);
void Xuat_TKNP_Theo_TichLuy(int tichLuy, sinhvien a[MAX], int n, int kq);
void Tim_TheoDTB(double dtb, sinhvien a[MAX], int n);
int KiemTraDayTang(int x[MAX], int n);
int KiemTraDayGiam(int x[MAX], int n);

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
		<< setw(6) << "NS"
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

void Tim_TheoLop(char lop[6], sinhvien a[MAX], int n)
{
	int i, kq = -1;
	for (i = 0; i < n; i++)
		if (_stricmp(a[i].lop, lop) == 0)
		{
			kq = 1;
			break;
		}
	if (kq == -1)
		cout << "\nKhong co lop : " << lop;
	else
	{
		cout << "\nCac sinh vien trong danh sach thuoc lop " << lop << " :\n";
		cout << endl;
		TieuDe();
		for (i = 0; i < n; i++)
			if (_stricmp(a[i].lop, lop) == 0)
			{
				cout << endl;
				Xuat_SV(a[i]);
			}
	}
}

void Tim_TheoTen(char ten[10], sinhvien a[MAX], int n)
{
	int i, kq = -1;
	for (i = 0; i < n; i++)
		if (_stricmp(a[i].ten, ten) == 0)
		{
			kq = 1;
			break;
		}
	if (kq == -1)
		cout << "\nDanh sach khong co ten sinh vien : " << ten;
	else
	{
		cout << "\nthong tin sinh vien trong danh sach co ten " << ten;
		cout << endl;
		TieuDe();
		for (i = 0; i < n; i++)
			if (_stricmp(a[i].ten, ten) == 0)
			{
				cout << endl;
				Xuat_SV(a[i]);
			}
	}
}

void TKNP_Theo_TichLuy(sinhvien a[MAX], int n)
{
	int i, kq;
	int x[MAX];
	for (i = 0; i < n; i++)
		x[i] = a[i].tichLuy;

	if (!KiemTraDayGiam(x, n) && !KiemTraDayTang(x, n))
	{
		cout << "\nDay so nguyen tao boi truong tich luy khong don dieu";
		cout << "\nKhong su dung duoc thuat giai tim kiem nhi phan!\n";
		return;
	}
	int tichLuy;
	cout << "\nNhap so tich luy : ";
	cin >> tichLuy;
	if (KiemTraDayTang(x, n))
	{
		kq = TKNP_Tang(x, n, tichLuy);
		Xuat_TKNP_Theo_TichLuy(tichLuy, a, n, kq);
	}
	if (KiemTraDayGiam(x, n))
	{
		kq = TKNP_Giam(x, n, tichLuy);
		Xuat_TKNP_Theo_TichLuy(tichLuy, a, n, kq);
	}
}

int TKNP_Tang(int x[MAX], int n, int tichLuy)
{
	int kq = -1, midle, left = 0, right = n - 1;
	do  {
		midle = (left + right) / 2;
		if (tichLuy == x[midle])
		{
			kq = midle;
			break;
		}
		else
			if (tichLuy < x[midle])
				right = midle - 1;
			else
				left = midle + 1;
	} while
		(left <= right);
	return kq;
}

int TKNP_Giam(int x[MAX], int n, int tichLuy)
{
	int kq = -1, midle, left = 0, right = n - 1;
	do
	{
		midle = (left + right) / 2;
		if (tichLuy == x[midle])
		{
			kq = midle;
			break;
		}
		else
			if (tichLuy > x[midle])
				left = midle + 1;
			else
				right = midle - 1;
	} while (left <= right);
	return kq;
}

void Xuat_TKNP_Theo_TichLuy(int tichLuy, sinhvien a[MAX], int n, int kq)
{
	if (kq == -1)
	{
		cout << "\nKhong co sinh vien trong danh sach co so TC tich luy > " << tichLuy << " :\n";
		return;
	}
	else
	{
		cout << "\nThong tin sinh vien trong danh sach co so TC tich luy > " << tichLuy << " :\n";
		TieuDe();
		cout << endl;
		Xuat_SV(a[kq]);
		cout << endl;
		return;
	}
}

void Tim_TheoDTB(double dtb, sinhvien a[MAX], int n)
{
	int i, kq = -1;
	for (i = 0; i < n; i++)
		if (a[i].dtb >= dtb)
		{
			kq = 1;
			break;
		}
	if (kq == -1)
		cout << "\nKhong co sinh vien nao co diem trung binh >= " << dtb;
	else
	{
		cout << "\nCac sinh vien trong danh sach co diem trung bin >= " << dtb << " :\n";
		cout << endl;
		TieuDe();
		for (i = 0; i < n; i++)
			if (a[i].dtb >= dtb)
			{
				cout << endl;
				Xuat_SV(a[i]);
			}
	}
}

int KiemTraDayTang(int x[MAX], int n)
{
	int i, kq = 1;
	for (i = 0; i < n - 1; i++)
		if (x[i] > x[i + 1])
		{
			kq = 0;
			break;
		}
	return kq;
}

int KiemTraDayGiam(int x[MAX], int n)
{
	int i, kq = 1;
	for (i = 0; i < n - 1; i++)
		if (x[i] < x[i + 1])
		{
			kq = 0;
			break;
		}
	return kq;
}
