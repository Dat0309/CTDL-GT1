//
// GroupedItemsPage.xaml.h
// Declaration of the GroupedItemsPage class
//

#pragma once

#include "GroupedItemsPage.g.h"

namespace $safeprojectname$
{
	/// <summary>
	/// A page that displays a grouped collection of items.
	/// </summary>
	[Windows::UI::Xaml::Data::Bindable]
	public ref class GroupedItemsPage sealed
	{
	public:
		GroupedItemsPage();
		/// <summary>
		/// This can be changed to a strongly typed view model.
		/// </summary>
		property Windows::Foundation::Collections::IObservableMap<Platform::String^, Platform::Object^>^ DefaultViewModel
		{
			Windows::Foundation::Collections::IObservableMap<Platform::String^, Platform::Object^>^  get();
		}
		/// <summary>
		/// NavigationHelper is used on each page to aid in navigation and 
		/// process lifetime management
		/// </summary>
		property Common::NavigationHelper^ NavigationHelper
		{
			Common::NavigationHelper^ get();
		}

	protected:
		virtual void OnNavigatedTo(Windows::UI::Xaml::Navigation::NavigationEventArgs^ e) override;
		virtual void OnNavigatedFrom(Windows::UI::Xaml::Navigation::NavigationEventArgs^ e) override;

	private:
		void LoadState(Platform::Object^ sender, Common::LoadStateEventArgs^ e);
		void Header_Click(Platform::Object^ sender, Windows::UI::Xaml::RoutedEventArgs^ e);
		void ItemView_ItemClick(Platform::Object^ sender, Windows::UI::Xaml::Controls::ItemClickEventArgs^ e);

		static Windows::UI::Xaml::DependencyProperty^ _defaultViewModelProperty;
		static Windows::UI::Xaml::DependencyProperty^ _navigationHelperProperty;
	};
}
