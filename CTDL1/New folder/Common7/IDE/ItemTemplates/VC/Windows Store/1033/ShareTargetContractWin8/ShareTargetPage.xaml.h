//
// $safeitemname$.xaml.h
// Declaration of the $safeitemname$ class.
//

#pragma once

#include "Common\LayoutAwarePage.h" // Required by generated header
#include "Common\BooleanToVisibilityConverter.h" // Required by generated header
#include "Common\BooleanNegationConverter.h" // Required by generated header
#include "$wizarditemsubpath$$safeitemname$.g.h"

#include <agile.h>

namespace $rootnamespace$
{
	/// <summary>
	/// This page allows other applications to share content through this application.
	/// </summary>
	public ref class $safeitemname$ sealed
	{
	public:
		$safeitemname$();
		void Activate(Windows::ApplicationModel::Activation::ShareTargetActivatedEventArgs^ args);

	private:
		Platform::Agile<Windows::ApplicationModel::DataTransfer::ShareTarget::ShareOperation> _shareOperation;
		void ShareButton_Click(Object^ sender, Windows::UI::Xaml::RoutedEventArgs^ e);
	};
}
