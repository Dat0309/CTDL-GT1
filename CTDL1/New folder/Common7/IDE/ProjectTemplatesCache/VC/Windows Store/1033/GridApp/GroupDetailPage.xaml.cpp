//
// GroupDetailPage.xaml.cpp
// Implementation of the GroupDetailPage class
//

#include "pch.h"
#include "GroupDetailPage.xaml.h"
#include "ItemDetailPage.xaml.h"

using namespace $safeprojectname$;

using namespace Platform;
using namespace Platform::Collections;
using namespace concurrency;
using namespace Windows::Foundation;
using namespace Windows::Foundation::Collections;
using namespace Windows::UI::Xaml;
using namespace Windows::UI::Xaml::Controls;
using namespace Windows::UI::Xaml::Controls::Primitives;
using namespace Windows::UI::Xaml::Data;
using namespace Windows::UI::Xaml::Input;
using namespace Windows::UI::Xaml::Interop;
using namespace Windows::UI::Xaml::Media;
using namespace Windows::UI::Xaml::Navigation;

// The Group Detail Page item template is documented at http://go.microsoft.com/fwlink/?LinkId=234229

GroupDetailPage::GroupDetailPage()
{
	InitializeComponent();
	SetValue(_defaultViewModelProperty, ref new Map<String^,Object^>(std::less<String^>()));
	auto navigationHelper = ref new Common::NavigationHelper(this);
	SetValue(_navigationHelperProperty, navigationHelper);
	navigationHelper->LoadState += ref new Common::LoadStateEventHandler(this, &GroupDetailPage::LoadState);
}

DependencyProperty^ GroupDetailPage::_defaultViewModelProperty =
	DependencyProperty::Register("DefaultViewModel",
		TypeName(IObservableMap<String^,Object^>::typeid), TypeName(GroupDetailPage::typeid), nullptr);

/// <summary>
/// used as a trivial view model.
/// </summary>
IObservableMap<String^, Object^>^ GroupDetailPage::DefaultViewModel::get()
{
	return safe_cast<IObservableMap<String^, Object^>^>(GetValue(_defaultViewModelProperty));
}

DependencyProperty^ GroupDetailPage::_navigationHelperProperty =
	DependencyProperty::Register("NavigationHelper",
		TypeName(Common::NavigationHelper::typeid), TypeName(GroupDetailPage::typeid), nullptr);

/// <summary>
/// Gets an implementation of <see cref="NavigationHelper"/> designed to be
/// used as a trivial view model.
/// </summary>
Common::NavigationHelper^ GroupDetailPage::NavigationHelper::get()
{
	return safe_cast<Common::NavigationHelper^>(GetValue(_navigationHelperProperty));
}


/// <summary>
/// Populates the page with content passed during navigation.  Any saved state is also
/// provided when recreating a page from a prior session.
/// </summary>
/// <param name="sender">
/// The source of the event; typically <see cref="NavigationHelper"/>
/// </param>
/// <param name="e">Event data that provides both the navigation parameter passed to
/// <see cref="Frame::Navigate(Type, Object)"/> when this page was initially requested and
/// a dictionary of state preserved by this page during an earlier
/// session.  The state will be null the first time a page is visited.</param>
void GroupDetailPage::LoadState(Object^ sender, Common::LoadStateEventArgs^ e)
{
	(void) sender;	// Unused parameter

	// TODO: Create an appropriate data model for your problem domain to replace the sample data
	Data::SampleDataSource::GetGroup(safe_cast<String^>(e->NavigationParameter))
	.then([this](Data::SampleDataGroup^ group)
	{
		DefaultViewModel->Insert("Group", group);
		DefaultViewModel->Insert("Items", group->Items);
	}, task_continuation_context::use_current());
}

/// <summary>
/// Invoked when an item is clicked.
/// </summary>
/// <param name="sender">The GridView displaying the item clicked.</param>
/// displaying the item clicked.</param>
/// <param name="e">Event data that describes the item clicked.</param>
void GroupDetailPage::ItemView_ItemClick(Object^ sender, ItemClickEventArgs^ e)
{
	(void) sender;	// Unused parameter

	// Navigate to the appropriate destination page, configuring the new page
	// by passing required information as a navigation parameter
	auto itemId = safe_cast<Data::SampleDataItem^>(e->ClickedItem)->UniqueId;
	Frame->Navigate(TypeName(ItemDetailPage::typeid), itemId);
}

#pragma region NavigationHelper registration

/// The methods provided in this section are simply used to allow
/// NavigationHelper to respond to the page's navigation methods.
/// 
/// Page specific logic should be placed in event handlers for the  
/// <see cref="NavigationHelper::LoadState"/>
/// and <see cref="NavigationHelper::SaveState"/>.
/// The navigation parameter is available in the LoadState method 
/// in addition to page state preserved during an earlier session.

void GroupDetailPage::OnNavigatedTo(NavigationEventArgs^ e)
{
	NavigationHelper->OnNavigatedTo(e);
}

void GroupDetailPage::OnNavigatedFrom(NavigationEventArgs^ e)
{
	NavigationHelper->OnNavigatedFrom(e);
}
#pragma endregion