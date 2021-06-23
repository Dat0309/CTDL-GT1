#pragma once

// [!output CONTROL_HEADER] : [!output CONTROL_CLASS] ActiveX コントロール クラスの宣言です。


// [!output CONTROL_CLASS] : 実装に関しては [!output CONTROL_IMPL] を参照してください。

class [!output CONTROL_CLASS] : public COleControl
{
	DECLARE_DYNCREATE([!output CONTROL_CLASS])

// コンストラクター
public:
	[!output CONTROL_CLASS]();

// オーバーライド
public:
	virtual void OnDraw(CDC* pdc, const CRect& rcBounds, const CRect& rcInvalid);
[!if SUBCLASS_WINDOW]
	virtual BOOL PreCreateWindow(CREATESTRUCT& cs);
[!endif]
	virtual void DoPropExchange(CPropExchange* pPX);
	virtual void OnResetState();
[!if WINDOWLESS || UNCLIPPED_DEVICE_CONTEXT || FLICKER_FREE || MOUSE_NOTIFICATIONS || OPTIMIZED_DRAW]
	virtual DWORD GetControlFlags();
[!endif]

// 実装
protected:
	~[!output CONTROL_CLASS]();

[!if RUNTIME_LICENSE]
	BEGIN_OLEFACTORY([!output CONTROL_CLASS])        // クラス ファクトリ と guid
		virtual BOOL VerifyUserLicense();
		virtual BOOL GetLicenseKey(DWORD, BSTR *);
	END_OLEFACTORY([!output CONTROL_CLASS])

[!else]
	DECLARE_OLECREATE_EX([!output CONTROL_CLASS])    // クラス ファクトリ と guid
[!endif]
	DECLARE_OLETYPELIB([!output CONTROL_CLASS])      // GetTypeInfo
	DECLARE_PROPPAGEIDS([!output CONTROL_CLASS])     // プロパティ ページ ID
	DECLARE_OLECTLTYPE([!output CONTROL_CLASS])		// タイプ名とその他のステータス

[!if SUBCLASS_WINDOW]
	// サブクラス化されたコントロールのサポート
	BOOL IsSubclassedControl();
	LRESULT OnOcmCommand(WPARAM wParam, LPARAM lParam);

[!endif]
// メッセージ マップ
	DECLARE_MESSAGE_MAP()

// ディスパッチ マップ
	DECLARE_DISPATCH_MAP()
[!if ABOUT_BOX]

	afx_msg void AboutBox();
[!endif]

// イベント マップ
	DECLARE_EVENT_MAP()

// ディスパッチ と イベント ID
public:
	enum {
	};
};

