#define MAX 100
void XuatMang(int a[MAX], int n);
int TapTinMang_1c(char *filename, int a[MAX], int &n);

int TapTinMang_1c(char *filename, int a[MAX], int &n)
{
	int i;
	ifstream in(filename);
	if (!in)
		return 0;
	in >> n;
	for (i = 0; i < n; i++)
		in >> a[i];
	in.close();
	return 1;
}

void XuatMang(int a[MAX], int n)
{
	for (int i = 0; i < n; i++)
		cout << a[i] << '\t';
}

