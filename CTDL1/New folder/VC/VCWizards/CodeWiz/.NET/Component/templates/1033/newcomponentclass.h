#pragma once

using namespace System;
using namespace System::ComponentModel;
using namespace System::Collections;
using namespace System::Diagnostics;


[!output SAFE_NAMESPACE_BEGIN]
	/// <summary>
	/// Summary for [!output SAFE_ITEM_NAME]
	/// </summary>
	public ref class [!output SAFE_ITEM_NAME] :  public System::ComponentModel::Component
	{
	public:
		[!output SAFE_ITEM_NAME](void)
		{
			InitializeComponent();
			//
			//TODO: Add the constructor code here
			//
		}
		[!output SAFE_ITEM_NAME](System::ComponentModel::IContainer ^container)
		{
			/// <summary>
			/// Required for Windows.Forms Class Composition Designer support
			/// </summary>

			container->Add(this);
			InitializeComponent();
		}

	protected:
		/// <summary>
		/// Clean up any resources being used.
		/// </summary>
		~[!output SAFE_ITEM_NAME]()
		{
			if (components)
			{
				delete components;
			}
		}

	private:
		/// <summary>
		/// Required designer variable.
		/// </summary>
		System::ComponentModel::Container ^components;

#pragma region Windows Form Designer generated code
		/// <summary>
		/// Required method for Designer support - do not modify
		/// the contents of this method with the code editor.
		/// </summary>
		void InitializeComponent(void)
		{
			components = gcnew System::ComponentModel::Container();
		}
#pragma endregion
	};
[!output SAFE_NAMESPACE_END]
