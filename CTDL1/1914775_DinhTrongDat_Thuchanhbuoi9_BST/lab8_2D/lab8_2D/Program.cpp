#include <iostream>
#include<fstream>
#include<conio.h>

using namespace std;

#include "BSTree.h"
#include "List.h"


void ChayChuongTrinh();

int main()
{
	ChayChuongTrinh();
	return 1;
}

void ChayChuongTrinh() 
{ 
	char *filename; 
	filename = new char[50]; 
	BSTree root; 
	int kq;
	do 
	{ 
		cout << "\nFilename : ";
		_flushall();
		cin >> filename; 
		kq = File_BST(root, filename); 
		if (kq)
			cout << "\nDa chuyen du lieu file " << filename << " vao cay BST";
		else
			cout << "\nDa chuyen du lieu file " << filename << " vao cay BST";
		break;
	}
	while (!kq);  
	cout << "\n\nXuat BST theo thu tu truoc:\n";
	PreOrder(root);
	cout << "\n\nXuat BST theo thu tu giua:\n"; 
	InOrder(root);
	cout << "\n\nXuat BST theo thu tu sau:\n"; 
	PosOrder(root); 
	cout << "\n\nXuat BST theo chieu sau :\n"; 
	DFS(root); 
	system("PAUSE");
	cout << "\n\nXuat BST theo chieu rong :\n";
	BFS(root); 
	system("PAUSE"); 
	BFS_TheoMuc(root); 
	system("PAUSE");
}