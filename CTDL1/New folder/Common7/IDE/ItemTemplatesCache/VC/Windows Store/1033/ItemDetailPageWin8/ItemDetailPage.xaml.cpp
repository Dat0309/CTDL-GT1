//
// $safeitemname$.xaml.cpp
// Implementation of the $safeitemname$ class
//

#include "pch.h"
#include "$safeitemname$.xaml.h"

using namespace $rootnamespace$;

using namespace Platform;
using namespace Platform::Collections;
using namespace Windows::Foundation;
using namespace Windows::Foundation::Collections;
using namespace Windows::UI::Xaml;
using namespace Windows::UI::Xaml::Controls;
using namespace Windows::UI::Xaml::Controls::Primitives;
using namespace Windows::UI::Xaml::Data;
using namespace Windows::UI::Xaml::Input;
using namespace Windows::UI::Xaml::Media;
using namespace Windows::UI::Xaml::Navigation;

// The Item Detail Page item template is documented at http://go.microsoft.com/fwlink/?LinkId=234232

$safeitemname$::$safeitemname$()
{
	InitializeComponent();
}

/// <summary>
/// Populates the page with content passed during navigation.  Any saved state is also
/// provided when recreating a page from a prior session.
/// </summary>
/// <param name="navigationParameter">The parameter value passed to
/// <see cref="Frame::Navigate(Type, Object)"/> when this page was initially requested.
/// </param>
/// <param name="pageState">A map of state preserved by this page during an earlier
/// session.  This will be null the first time a page is visited.</param>
void $safeitemname$::LoadState(Object^ navigationParameter, IMap<String^, Object^>^ pageState)
{
	(void) navigationParameter;	// Unused parameter
	(void) pageState;	// Unused parameter

	// Allow saved page state to override the initial item to display
	if (pageState != nullptr && pageState->HasKey("SelectedItem"))
	{
		navigationParameter = pageState->Lookup("SelectedItem");
	}

	// TODO: Set a bindable group using DefaultViewModel->Insert("Group", <value>)
	// TODO: Set a collection of bindable items using DefaultViewModel->Insert("Items", <value>)
	// TODO: Assign the selected item to flipView->SelectedItem
}

/// <summary>
/// Preserves state associated with this page in case the application is suspended or the
/// page is discarded from the navigation cache.  Values must conform to the serialization
/// requirements of <see cref="SuspensionManager::SessionState"/>.
/// </summary>
/// <param name="pageState">An empty map to be populated with serializable state.</param>
void $safeitemname$::SaveState(IMap<String^, Object^>^ pageState)
{
	auto selectedItem = flipView->SelectedItem;
	// TODO: Derive a serializable navigation parameter and set it using
	//       pageState->Insert("SelectedItem", <value>)
}
