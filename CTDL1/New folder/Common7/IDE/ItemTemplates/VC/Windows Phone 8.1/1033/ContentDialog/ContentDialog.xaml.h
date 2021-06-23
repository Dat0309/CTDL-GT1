//
// $safeitemname$.xaml.h
// Declaration of the $safeitemname$ class
//

#pragma once

#include "$wizarditemsubpath$$safeitemname$.g.h"

namespace $rootnamespace$
{
	[Windows::Foundation::Metadata::WebHostHidden]
	public ref class $safeitemname$ sealed
	{
	public:
		$safeitemname$();
	private:
		void ContentDialog_PrimaryButtonClick(Windows::UI::Xaml::Controls::ContentDialog^ sender, Windows::UI::Xaml::Controls::ContentDialogButtonClickEventArgs^ args);
		void ContentDialog_SecondaryButtonClick(Windows::UI::Xaml::Controls::ContentDialog^ sender, Windows::UI::Xaml::Controls::ContentDialogButtonClickEventArgs^ args);
	};
}
