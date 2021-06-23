#define MAX 100 
struct nhanvien;
int TapTin_MangCT(char *filename, nhanvien a[MAX], int &n);
void TieuDe();
void Xuat_NV(nhanvien p);
void Xuat_DSNV(nhanvien a[MAX], int n);
void HoanVi(nhanvien &x, nhanvien &y);
void Copy(nhanvien b[MAX], nhanvien a[MAX], int n);


struct nhanvien
{
	char  maSV[8];
	char  hoSV[10];
	char  tenLot[10];
	char  ten[10];
	char  diachi[15];
	int  namSinh;
	double  luong;
};

int TapTin_MangCT(char *filename, nhanvien a[MAX], int &n)
{
	ifstream in(filename);
	if (!in)
		return 0;

	char  maSV[8];
	char  hoSV[10];
	char  tenLot[10];
	char  ten[10];
	char  diachi[15];
	int  namSinh;
	double  luong;

	n = 0;
	in >> maSV; strcpy_s(a[n].maSV, maSV);
	in >> hoSV; strcpy_s(a[n].hoSV, hoSV);
	in >> tenLot; strcpy_s(a[n].tenLot, tenLot);
	in >> ten; strcpy_s(a[n].ten, ten);
	in >> diachi; strcpy_s(a[n].diachi, diachi);
	in >> namSinh; a[n].namSinh = namSinh;
	in >> luong; a[n].luong = luong;

	while (!in.eof())
	{
		n++;
		in >> maSV; strcpy_s(a[n].maSV, maSV);
		in >> hoSV; strcpy_s(a[n].hoSV, hoSV);
		in >> tenLot; strcpy_s(a[n].tenLot, tenLot);
		in >> ten; strcpy_s(a[n].ten, ten);
		in >> diachi; strcpy_s(a[n].diachi, diachi);
		in >> namSinh; a[n].namSinh = namSinh;
		in >> luong; a[n].luong = luong;
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
	cout << setw(8) << "Ma SV"
		<< ':'
		<< setw(10) << "Ho"
		<< ':'
		<< setw(10) << "Tlot"
		<< ':'
		<< setw(10) << "Ten"
		<< ':'
		<< setw(15) << "Diachi"
		<< ':'
		<< setw(6) << "NSinh"
		<< ':'
		<< setw(8) << "luong"
		<< ':';

	cout << "\n";
	cout << ':';
	for (i = 1; i <= 74; i++)
		cout << '=';
	cout << ':';
	cout << "\n";
}

void Xuat_NV(nhanvien p)
{
	cout << ':';
	cout << setiosflags(ios::left)
		<< setw(8) << p.maSV
		<< ':'
		<< setw(10) << p.hoSV
		<< setw(10) << p.tenLot
		<< setw(10) << p.ten
		<< ':'
		<< setw(15) << p.diachi
		<< ':'
		<< setw(6) << p.namSinh
		<< ':'
		<< setw(8) << setiosflags(ios::fixed) << setprecision(2) << p.luong
		<< ':';
}

void Xuat_DSNV(nhanvien a[MAX], int n)
{
	int i;
	TieuDe();
	for (i = 0; i < n; i++)
	{
		Xuat_NV(a[i]);
		cout << '\n';
	}
	cout << ':';
	for (i = 1; i <= 74; i++)
		cout << '=';
	cout << ':';
	cout << "\n";
}

void HoanVi(nhanvien &x, nhanvien &y)
{
	nhanvien t;
	t = x;
	x = y;
	y = t;
}

void Copy(nhanvien b[MAX], nhanvien a[MAX], int n)
{
	for (int i = 0; i < n; i++)
		b[i] = a[i];
}