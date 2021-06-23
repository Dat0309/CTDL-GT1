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


//=============================================
//Khai bao nguyen mau
int Chuyen_TapTin_MangCT(char *filename, hocvien a[MAX], int &n);
void Xuat_DSSV(hocvien a[MAX], int n);
void Xuat_SV(hocvien p);
void TieuDe();
int Tim_MaSo_DauTien(char maSV[10], hocvien a[MAX], int n);
void Tim_TheoLop(char lop[6], hocvien a[MAX], int n);
void Tim_TheoDTB(double dtb, hocvien a[MAX], int n);

//============================================
//Cai dat cac ham
//=============================================
//Chuyen tap tin cau truc sang mang cau truc
//Thanh cong : tra ve 1; không thanh cong : tra ve 0
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
//Xuat tieu de
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

//Xuat 1 s1nh vien
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


//Xuat danh sach s1nh vien voi thong tin day du
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


int Tim_MaSo_DauTien(char maSV[10], hocvien a[MAX], int n) 
{ 
	int i = 0;  
	while ((i < n) && (_stricmp(a[i].maSV, maSV)))   
		i++;  
	if (i == n)   
		return -1;  
	return i;
	
}

void Tim_TheoLop(char lop[6], hocvien a[MAX], int n) 
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

void Tim_TheoDTB(double dtb, hocvien a[MAX], int n) 
{
	int i, kq = -1;  
	for (i = 0; i < n; i++)  
		if (a[i].dtb == dtb)  
		{ 
			kq = 1;   
			break; 
		}  
	if (kq == -1)   
		cout << "\nKhong co sinh vien nao co diem trung binh = " << dtb;  
	else
	{
		cout << "\nCac sinh vien trong danh sach co diem trung bin = " << dtb << " :\n";   
		cout << endl;     
		TieuDe();
		for (i = 0; i < n; i++)
			if (a[i].dtb == dtb)
			{
				cout << endl;
				Xuat_SV(a[i]);
			}

	}
}

