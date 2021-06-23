//
// $safeitemname$.xaml.h
// Declaration of the $safeitemname$ class
//

#pragma once

#include "Common\LayoutAwarePage.h" // Required by generated header
#include "Common\RichTextColumns.h" // Required by generated header
#include "$wizarditemsubpath$$safeitemname$.g.h"

namespace $rootnamespace$
{
	/// <summary>
	/// A page that displays details for a single item within a group while allowing gestures to
	/// flip through other items belonging to the same group.
	/// </summary>
	public ref class $safeitemname$ sealed
	{
	public:
		$safeitemname$();

	protected:
		virtual void LoadState(Platform::Object^ navigationParameter,
			Windows::Foundation::Collections::IMap<Platform::String^, Platform::Object^>^ pageState) override;
		virtual void SaveState(Windows::Foundation::Collections::IMap<Platform::String^, Platform::Object^>^ pageState) override;
	};
}
