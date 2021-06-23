[!if RIBBON_TOOLBAR]
// ���� MFC �T���v�� �\�[�X �R�[�h�ł́AMFC Microsoft Office Fluent ���[�U�[ �C���^�[�t�F�C�X 
// ("Fluent UI") �̎g�p���@�������܂��B���̃R�[�h�́AMFC C++ ���C�u���� �\�t�g�E�F�A�� 
// ��������Ă��� Microsoft Foundation Class ���t�@�����X����ъ֘A�d�q�h�L�������g��
// �⊮���邽�߂̎Q�l�����Ƃ��Ē񋟂���܂��B
// Fluent UI �𕡐��A�g�p�A�܂��͔z�z���邽�߂̃��C�Z���X�����͌ʂɗp�ӂ���Ă��܂��B
// Fluent UI ���C�Z���X �v���O�����̏ڍׂɂ��ẮAWeb �T�C�g
// http://go.microsoft.com/fwlink/?LinkId=238214 ���Q�Ƃ��Ă��������B
//
// Copyright (C) Microsoft Corporation
// All rights reserved.
[!endif]

// [!output VIEW_HEADER] : [!output VIEW_CLASS] �N���X�̃C���^�[�t�F�C�X
//

#pragma once
[!if FORM_VIEW]

#include "resource.h"
[!endif]

[!if CONTAINER || CONTAINER_SERVER]
class [!output CONTAINER_ITEM_CLASS];
[!endif]
[!if OLEDB_RECORD_VIEW || ODBC_RECORD_VIEW]
class [!output ROWSET_CLASS];
[!endif]

class [!output VIEW_CLASS] : public [!output VIEW_BASE_CLASS]
{
protected: // �V���A��������̂ݍ쐬���܂��B
	[!output VIEW_CLASS]();
	DECLARE_DYNCREATE([!output VIEW_CLASS])
[!if OLEDB_RECORD_VIEW || FORM_VIEW || ODBC_RECORD_VIEW]

public:
	enum{ IDD = IDD_[!output UPPER_CASE_SAFE_PROJECT_IDENTIFIER_NAME]_FORM };
[!if OLEDB_RECORD_VIEW || ODBC_RECORD_VIEW]
	[!output ROWSET_CLASS]* m_pSet;
[!endif]
[!endif]

// ����
public:
	[!output DOC_CLASS]* GetDocument() const;
[!if CONTAINER || CONTAINER_SERVER]
[!if !RICH_EDIT_VIEW]
	// m_pSelection �́A���݂� [!output CONTAINER_ITEM_CLASS] �ɑ΂���I����ێ����Ă��܂��B
	// �����̃A�v���P�[�V�����ł��̂悤�ȃ����o�[�ϐ��́A�����̑I����
	//  [!output CONTAINER_ITEM_CLASS] �I�u�W�F�N�g�ł͂Ȃ��I�u�W�F�N�g�̑I�����\���ɕ\���ł��܂���B
	//  ���̋@�\�͑I���@�\�����p���悤�Ƃ���v���O���}�̗����������邽
	//  �߂ɑg�ݍ��܂�Ă��܂��B

	// TODO: ���̑I����@���A�v���P�[�V�����ɓK�������@�ɒu�������Ă��������B
	[!output CONTAINER_ITEM_CLASS]* m_pSelection;
[!endif]
[!endif]

// ����
public:

// �I�[�o�[���C�h
public:
[!if OLEDB_RECORD_VIEW]
	virtual CRowset<>* OnGetRowset();
[!endif]
[!if ODBC_RECORD_VIEW]
	virtual CRecordset* OnGetRecordset();
[!endif]
[!if !TREE_VIEW && !LIST_VIEW && !HTML_VIEW && !HTML_EDITVIEW && !RICH_EDIT_VIEW && !EDIT_VIEW && !FORM_VIEW && !OLEDB_RECORD_VIEW && !ODBC_RECORD_VIEW]
	virtual void OnDraw(CDC* pDC);  // ���̃r���[��`�悷�邽�߂ɃI�[�o�[���C�h����܂��B
[!endif] 
[!if PRINTING]
[!if TREE_VIEW || LIST_VIEW]
	virtual void OnDraw(CDC* pDC);  // ���̃r���[��`�悷�邽�߂ɃI�[�o�[���C�h����܂��B
[!endif]
[!endif]
	virtual BOOL PreCreateWindow(CREATESTRUCT& cs);
protected:
[!if FORM_VIEW || OLEDB_RECORD_VIEW || ODBC_RECORD_VIEW]
	virtual void DoDataExchange(CDataExchange* pDX);    // DDX/DDV �T�|�[�g
[!endif] 
[!if SCROLL_VIEW || CONTAINER || CONTAINER_SERVER || OLEDB_RECORD_VIEW || TREE_VIEW || LIST_VIEW || FORM_VIEW || HTML_VIEW || ODBC_RECORD_VIEW]
	virtual void OnInitialUpdate(); // �\�z��ɏ��߂ČĂяo����܂��B
[!endif]
[!if PRINTING]
[!if !HTML_VIEW && !HTML_EDITVIEW]
	virtual BOOL OnPreparePrinting(CPrintInfo* pInfo);
[!endif]
[!if !RICH_EDIT_VIEW && !HTML_VIEW && !HTML_EDITVIEW]
	virtual void OnBeginPrinting(CDC* pDC, CPrintInfo* pInfo);
	virtual void OnEndPrinting(CDC* pDC, CPrintInfo* pInfo);
[!endif]
[!if FORM_VIEW || ACTIVE_DOC_CONTAINER]
	virtual void OnPrint(CDC* pDC, CPrintInfo* pInfo);
[!endif]
[!endif]
[!if CONTAINER || CONTAINER_SERVER]
[!if !RICH_EDIT_VIEW]
	virtual BOOL IsSelected(const CObject* pDocItem) const;// �R���e�i�[ �T�|�[�g
[!endif]
[!endif]

// ����
public:
	virtual ~[!output VIEW_CLASS]();
#ifdef _DEBUG
	virtual void AssertValid() const;
	virtual void Dump(CDumpContext& dc) const;
#endif

protected:

// �������ꂽ�A���b�Z�[�W���蓖�Ċ֐�
protected:
[!if CONTAINER || CONTAINER_SERVER]
	afx_msg void OnDestroy();
[!if !RICH_EDIT_VIEW]
	afx_msg void OnSetFocus(CWnd* pOldWnd);
	afx_msg void OnSize(UINT nType, int cx, int cy);
	afx_msg void OnInsertObject();
	afx_msg void OnCancelEditCntr();
	afx_msg void OnFilePrint();
[!endif]
[!endif]
[!if MINI_SERVER || FULL_SERVER || CONTAINER_SERVER]
	afx_msg void OnCancelEditSrvr();
[!endif]
[!if PROJECT_STYLE_EXPLORER]
[!if LIST_VIEW]
	afx_msg void OnStyleChanged(int nStyleType, LPSTYLESTRUCT lpStyleStruct);
[!endif]
[!endif]
[!if ACTIVE_DOC_CONTAINER || MENUBAR_TOOLBAR || RIBBON_TOOLBAR]
	afx_msg void OnFilePrintPreview();
[!if ACTIVE_DOC_CONTAINER && !RICH_EDIT_VIEW]
	afx_msg void OnFilePrintPreviewUIUpdate(CCmdUI* pCmdUI);
[!endif]
[!endif]
[!if MENUBAR_TOOLBAR || RIBBON_TOOLBAR]
	afx_msg void OnRButtonUp(UINT nFlags, CPoint point);
	afx_msg void OnContextMenu(CWnd* pWnd, CPoint point);
[!endif]
[!if HTML_EDITVIEW]
	DECLARE_DHTMLEDITING_CMDMAP([!output VIEW_CLASS])
[!endif]
	DECLARE_MESSAGE_MAP()
};

#ifndef _DEBUG  // [!output VIEW_IMPL] �̃f�o�b�O �o�[�W����
inline [!output DOC_CLASS]* [!output VIEW_CLASS]::GetDocument() const
   { return reinterpret_cast<[!output DOC_CLASS]*>(m_pDocument); }
#endif
