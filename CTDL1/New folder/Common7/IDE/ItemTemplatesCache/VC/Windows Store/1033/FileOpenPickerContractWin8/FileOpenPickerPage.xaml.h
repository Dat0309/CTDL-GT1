//
// $safeitemname$.xaml.h
// Declaration of the $safeitemname$ class
//

#pragma once

#include "Common\LayoutAwarePage.h" // Required by generated header
#include "$wizarditemsubpath$$safeitemname$.g.h"

namespace $rootnamespace$
{
	/// <summary>
	/// This page displays files owned by the application so that the user can grant another application
	/// access to them.
	/// </summary>
	public ref class $safeitemname$ sealed
	{
	public:
		$safeitemname$();
		void Activate(Windows::ApplicationModel::Activation::FileOpenPickerActivatedEventArgs^ args);

	private:
		Windows::Storage::Pickers::Provider::FileOpenPickerUI^ _fileOpenPickerUI;
		void FileGridView_SelectionChanged(Platform::Object^ sender, Windows::UI::Xaml::Controls::SelectionChangedEventArgs^ e);
		void GoUpButton_Click(Platform::Object^ sender, Windows::UI::Xaml::RoutedEventArgs^ args);
		void FilePickerUI_FileRemoved(Windows::Storage::Pickers::Provider::FileOpenPickerUI^, Windows::Storage::Pickers::Provider::FileRemovedEventArgs^);
	};
}
