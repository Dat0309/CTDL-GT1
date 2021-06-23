
struct KetQuaXepHang
{
	char tenDoi[15];
	int st;
	int sTThang;
	int sTHoa;
	int sTThua;
	int sBThang;
	int sBThua;
	int hieuSo;
	int diem;
	int xh;
};
typedef KetQuaXepHang data2;
struct tagNODE2
{
	data2 kqxh;
	tagNODE2 *pNext;
};
typedef tagNODE2 NODE2;
struct LIST_KQXH
{
	NODE2 *pHead;
	NODE2 *pTail;
};

NODE2* GetNODE2(data2 x)
{
	NODE2 *p;
	p = new NODE2;
	if (p != NULL)
	{
		p->kqxh = x;
		p->pNext = NULL;
	}
	return p;
}
{
	h.pHead = h.pTail = NULL;
}
{
	NODE2* new_ele = GetNODE2(x);
	if (new_ele == NULL)
	{
		cout << "\nKhong du bo nho";
		_getch();
		return;
	}
	if (h.pHead == NULL)
	{
		h.pHead = new_ele; h.pTail = h.pHead;
	}
	else
	{
		h.pTail->pNext = new_ele;
		h.pTail = new_ele;
	}
}

void KhoiTao_List_KQXH(LIST_KQXH &h)
{
	ifstream in("Khoitao_KQDB.txt");
	if (!in)
	{
		cout << "\nLoi mo file !\n";
		_getch();
		return;
	}
	CreatList_KQXH(h);
	char tenDoi[15]; //ten doi
	int st; //so tran da dau (-> vong moi nhat)
	int sTThang; //So tran thang
	int sTHoa; //So tran hoa
	int sTThua; //So tran thua
	int sBThang; //So ban thang
	int sBThua; //So ban thua
	int hieuSo; //Hieu so ban thang thua
	int diem; //Diem
	int xh; //Xep hang
	data2 x;
	in >> tenDoi; strcpy_s(x.tenDoi, 15, tenDoi);
	in >> st; x.st = st;
	in >> sTThang; x.sTThang = sTThang;
	in >> sTHoa; x.sTHoa = sTHoa;
	in >> sTThua; x.sTThua = sTThua;
	in >> sBThang; x.sBThang = sBThang;
	in >> sBThua; x.sBThua = sBThua;
	in >> hieuSo; x.hieuSo = hieuSo;
	in >> diem; x.diem = diem;
	in >> xh; x.xh = xh;
	InsertTail2(h, x);
	while (!in.eof())
	{
		in >> tenDoi; strcpy_s(x.tenDoi, 15, tenDoi);
		in >> st; x.st = st;
		in >> sTThang; x.sTThang = sTThang;
		in >> sTHoa; x.sTHoa = sTHoa;
		in >> sTThua; x.sTThua = sTThua;
		in >> sBThang; x.sBThang = sBThang;
		in >> sBThua; x.sBThua = sBThua;
		in >> hieuSo; x.hieuSo = hieuSo;
		in >> diem; x.diem = diem;
		in >> xh; x.xh = xh;
		InsertTail2(h, x);
	}
	in.close();
}

NODE1 *Tro_Sau_Cuoi_Vong(LIST_KQTD l, int vong)
{
	NODE1 *p;
	int sTran = 10 * vong;
	int i = 0;
	for (p = l.pHead; p != NULL; p = p->pNext)
	{
		i++;
		if (i > sTran)
			break;
	}
	return p;
}
{
	NODE1 *p; //duyet tran i
	NODE2 *q; // duyet doi j
	data2 x; //ket qua doi bong
	NODE1 *r = Tro_Sau_Cuoi_Vong(l, vong);
	KhoiTao_List_KQXH(h);
	for (q = h.pHead; q != NULL; q = q->pNext) //Voi moi doi q
	{
		x = q->kqxh; // doi x
		for (p = l.pHead; p != r; p = p->pNext) //duyet den tran cuoi cung vong muon xep hang
		{
			if (_strcmpi(x.tenDoi, p->kqtd.cNha) == 0) //tinh du lieu lien quan khi la chu nha
			{
				x.sBThang += p->kqtd.bTChu;
				x.sBThua += p->kqtd.bTKhach;
				if (p->kqtd.bTChu > p->kqtd.bTKhach)
				{
					x.sTThang++;
					x.diem += 3;
				}
				else
					if (p->kqtd.bTChu < p->kqtd.bTKhach)
						x.sTThua++;
					else
					{
						x.sTHoa++;
						x.diem += 1;
					}
			}
			else
				if (_strcmpi(x.tenDoi, p->kqtd.khach) == 0) //tinh du lieu lien quan khi la chu nha
				{
					x.sBThang += p->kqtd.bTKhach;
					x.sBThua += p->kqtd.bTChu;
					if (p->kqtd.bTChu < p->kqtd.bTKhach)
					{
						x.sTThang++;
						x.diem += 3;
					}
					else
						if (p->kqtd.bTChu > p->kqtd.bTKhach)
							x.sTThua++;
						else
						{
							x.sTHoa++;
							x.diem += 1;
						}
				}
			x.hieuSo = x.sBThang - x.sBThua;
			x.st = x.sTThang + x.sTHoa + x.sTThua;
		}
		q->kqxh = x;
	}
}