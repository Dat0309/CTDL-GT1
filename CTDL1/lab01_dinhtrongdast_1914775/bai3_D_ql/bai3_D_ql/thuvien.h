#define MAX 20

int n, k;
int a[MAX], b[MAX]; 
int dem;

void LietKe_DayNP(int i);
void LietKe_TH(int i);
void LietKe_HV(int i);
void KhoiTao_danhdau();

void LietKe_DayNP(int i)
{
	int j;
	for (j = 0; j <= 1; j++)
	{
		a[i] = j;
		if (i < n)
			LietKe_DayNP(i + 1);
		else
		{
			dem++;
			
		}
	}
}

void LietKe_TH(int i)
{
	int j;
	for (j = a[i - 1] + 1; j <= n - k + i; j++)
	{
		a[i] = j;
		if (i == k)
		{
			dem++;
		
		}
		else
			LietKe_TH(i + 1);
	}
}

void KhoiTao_danhdau()
{
	int i;
	for (i = 1; i <= n; i++)
		b[i] = 1;
}

void LietKe_HV(int i)
{
	int j;
	for (j = 1; j <= n; j++)
	if (b[j])
	{
		a[i] = j;
		b[j] = 0;
		if (i == n)
		{
			dem++;
			
		}
		else
			LietKe_HV(i + 1);
		b[j] = 1;
	}
}