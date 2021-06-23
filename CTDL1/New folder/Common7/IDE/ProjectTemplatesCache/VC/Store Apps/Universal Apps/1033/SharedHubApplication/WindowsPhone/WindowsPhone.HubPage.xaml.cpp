//
// HubPage.xaml.cpp
// Implementation of the HubPage class
//

#include "pch.h"
#include "HubPage.xaml.h"
#include "ItemPage.xaml.h"
#include "SectionPage.xaml.h"

using namespace $ext_safeprojectname$;
using namespace $ext_safeprojectname$::Common;
using namespace $ext_safeprojectname$::Data;

using namespace concurrency;
using namespace Platform;
using namespace Platform::Collections;
using namespace Windows::ApplicationModel::Resources;
using namespace Windows::Foundation;
using namespace Windows::Foundation::Collections;
using namespace Windows::Graphics::Display;
using namespace Windows::UI::Core;
using namespace Windows::UI::ViewManagement;
using namespace Windows::UI::Xaml;
using namespace Windows::UI::Xaml::Controls;
using namespace Windows::UI::Xaml::Controls::Primitives;
using namespace Windows::UI::Xaml::Data;
using namespace Windows::UI::Xaml::Input;
using namespace Windows::UI::Xaml::Interop;
using namespace Windows::UI::Xaml::Media;
using namespace Windows::UI::Xaml::Media::Imaging;
using namespace Windows::UI::Xaml::Navigation;

// The Universal Hub Application project template is documented at http://go.microsoft.com/fwlink/?LinkID=391958

HubPage::HubPage()
{
	InitializeComponent();

	DisplayInformation::AutoRotationPreferences = DisplayOrientations::Portrait;
	NavigationCacheMode = Windows::UI::Xaml::Navigation::NavigationCacheMode::Required;

	_resourceLoader = ResourceLoader::GetForCurrentView(L"Resources");

	SetValue(_defaultViewModelProperty, ref new Platform::Collections::Map<String^,Object^>(std::less<String^>()));
	auto navigationHelper = ref new Common::NavigationHelper(this);
	SetValue(_navigationHelperProperty, navigationHelper);
	navigationHelper->LoadState += ref new LoadStateEventHandler(this, &HubPage::LoadState);
}

DependencyProperty^ HubPage::_defaultViewModelProperty = DependencyProperty::Register(
	"DefaultViewModel",
	TypeName(IObservableMap<String^,Object^>::typeid),
	TypeName(HubPage::typeid),
	nullptr);

/// <summary>
/// Gets the view model for this <see cref="Page"/>.
/// This can be changed to a strongly typed view model.
/// </summary>
IObservableMap<String^, Object^>^ HubPage::DefaultViewModel::get()
{
	return safe_cast<IObservableMap<String^, Object^>^>(GetValue(_defaultViewModelProperty));
}

DependencyProperty^ HubPage::_navigationHelperProperty = DependencyProperty::Register(
	"NavigationHelper",
	TypeName(NavigationHelper::typeid),
	TypeName(HubPage::typeid),
	nullptr);

/// <summary>
/// Gets an implementation of <see cref="NavigationHelper"/> designed to be
/// used as a trivial view model.
/// </summary>
NavigationHelper^ HubPage::NavigationHelper::get()
{
	return safe_cast<Common::NavigationHelper^>(GetValue(_navigationHelperProperty));
}

/// The methods provided in this section are simply used to allow
/// NavigationHelper to respond to the page's navigation methods.
/// 
/// Page specific logic should be placed in event handlers for the  
/// <see cref="NavigationHelper::LoadState"/>
/// and <see cref="NavigationHelper::SaveState"/>.
/// The navigation parameter is available in the LoadState method 
/// in addition to page state preserved during an earlier session.

void HubPage::OnNavigatedTo(NavigationEventArgs^ e)
{
	NavigationHelper->OnNavigatedTo(e);
}

void HubPage::OnNavigatedFrom(NavigationEventArgs^ e)
{
	NavigationHelper->OnNavigatedFrom(e);
}

/// <summary>
/// Populates the page with content passed during navigation.  Any saved state is also
/// provided when recreating a page from a prior session.
/// </summary>
/// <param name="sender">
/// The source of the event; typically <see cref="NavigationHelper"/>
/// </param>
/// <see cref="Frame::Navigate(Type, Object)"/> when this page was initially requested and
/// a dictionary of state preserved by this page during an earlier
/// session.  The state will be null the first time a page is visited.</param>
void HubPage::LoadState(Object^ sender, LoadStateEventArgs^ e)
{
	(void) sender;	// Unused parameter
	(void) e;	// Unused parameter

	// TODO: Create an appropriate data model for your problem domain to replace the sample data
	Data::SampleDataSource::GetGroups()
		.then([this](IIterable<Data::SampleDataGroup^>^ groups)
	{
		DefaultViewModel->Insert("Groups", groups);
	}, task_continuation_context::use_current());
}

/// <summary>
/// Invoked when an item within a section is clicked.
/// </summary>
/// <param name="sender">The GridView or ListView
/// displaying the item clicked.</param>
/// <param name="e">Event data that describes the item clicked.</param>
void HubPage::ItemView_ItemClick(Object^ sender, ItemClickEventArgs^ e)
{
	(void) sender;	// Unused parameter

	auto itemId = safe_cast<SampleDataItem^>(e->ClickedItem)->UniqueId;
	if (!Frame->Navigate(ItemPage::typeid, itemId))
	{
		throw ref new FailureException(_resourceLoader->GetString(L"NavigationFailedExceptionMessage"));
	}
}

/// <summary>
/// Invoked when an item within a section is clicked.
/// </summary>
void HubPage::GroupSection_ItemClick(Object^ sender, ItemClickEventArgs^ e)
{
	(void) sender;	// Unused parameter

	auto groupId = safe_cast<SampleDataGroup^>(e->ClickedItem)->UniqueId;
	if (!Frame->Navigate(SectionPage::typeid, groupId))
	{
		throw ref new FailureException(_resourceLoader->GetString(L"NavigationFailedExceptionMessage"));
	}
}