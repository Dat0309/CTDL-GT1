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
	/// A page that displays an overview of a single group, including a preview of the items
	/// within the group.
	/// </summary>
	public ref class $safeitemname$ sealed
	{
	public:
		$safeitemname$();

	protected:
		virtual void LoadState(Platform::Object^ navigationParameter,
			Windows::Foundation::Collections::IMap<Platform::String^, Platform::Object^>^ pageState) override;
	};
}
