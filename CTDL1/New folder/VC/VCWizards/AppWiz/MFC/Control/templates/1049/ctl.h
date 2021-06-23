#pragma once

// [!output CONTROL_HEADER]: объявление класса элемента управления ActiveX для [!output CONTROL_CLASS].


// [!output CONTROL_CLASS]: про реализацию см. [!output CONTROL_IMPL].

class [!output CONTROL_CLASS] : public COleControl
{
	DECLARE_DYNCREATE([!output CONTROL_CLASS])

// Конструктор
public:
	[!output CONTROL_CLASS]();

// Переопределение
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

// Реализация
protected:
	~[!output CONTROL_CLASS]();

[!if RUNTIME_LICENSE]
	BEGIN_OLEFACTORY([!output CONTROL_CLASS])        // Фабрика класса и guid
		virtual BOOL VerifyUserLicense();
		virtual BOOL GetLicenseKey(DWORD, BSTR *);
	END_OLEFACTORY([!output CONTROL_CLASS])

[!else]
	DECLARE_OLECREATE_EX([!output CONTROL_CLASS])    // Фабрика класса и guid
[!endif]
	DECLARE_OLETYPELIB([!output CONTROL_CLASS])      // GetTypeInfo
	DECLARE_PROPPAGEIDS([!output CONTROL_CLASS])     // ИД страницы свойств
	DECLARE_OLECTLTYPE([!output CONTROL_CLASS])		// Введите имя и промежуточное состояние

[!if SUBCLASS_WINDOW]
	// Поддержка элементов управления в подклассах
	BOOL IsSubclassedControl();
	LRESULT OnOcmCommand(WPARAM wParam, LPARAM lParam);

[!endif]
// Схемы сообщений
	DECLARE_MESSAGE_MAP()

// Схемы подготовки к отправке
	DECLARE_DISPATCH_MAP()
[!if ABOUT_BOX]

	afx_msg void AboutBox();
[!endif]

// Схемы событий
	DECLARE_EVENT_MAP()

// Подготовка к отправке и ИД событий
public:
	enum {
	};
};

