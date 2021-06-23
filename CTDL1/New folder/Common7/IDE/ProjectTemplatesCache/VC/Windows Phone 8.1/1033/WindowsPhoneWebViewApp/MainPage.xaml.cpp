//
// MainPage.xaml.cpp
// Implementation of the MainPage class.
//

#include "pch.h"
#include "MainPage.xaml.h"

using namespace $safeprojectname$;

using namespace Platform;
using namespace Windows::Foundation;
using namespace Windows::Foundation::Collections;
using namespace Windows::Graphics::Display;
using namespace Windows::Phone::UI::Input;
using namespace Windows::UI::Xaml;
using namespace Windows::UI::Xaml::Controls;
using namespace Windows::UI::Xaml::Controls::Primitives;
using namespace Windows::UI::Xaml::Data;
using namespace Windows::UI::Xaml::Input;
using namespace Windows::UI::Xaml::Media;
using namespace Windows::UI::Xaml::Navigation;

// The WebView Application template is documented at http://go.microsoft.com/fwlink/?LinkID=391641

MainPage::MainPage()
{
	InitializeComponent();

	this->NavigationCacheMode = Navigation::NavigationCacheMode::Required;
}

void MainPage::OnNavigatedTo(NavigationEventArgs^ e)
{
	(e);	// Unused parameter

	WebViewControl->Navigate(GetHomeUri());

	_backPressedToken = HardwareButtons::BackPressed += ref new EventHandler<BackPressedEventArgs^>(this, &MainPage::MainPage_BackPressed);
}

void MainPage::OnNavigatedFrom(NavigationEventArgs^ e)
{
	(e);	// Unused parameter

	HardwareButtons::BackPressed -= _backPressedToken;
}

void MainPage::Browser_NavigationCompleted(Object^ sender, WebViewNavigationCompletedEventArgs^ e)
{
	(sender);	// Unused parameter
	(e);		// Unused parameter
	
#if _DEBUG
	if (!e->IsSuccess)
	{
		OutputDebugStringW(L"Navigation to this page failed, check your internet connection");
	}
#endif
}

/// <summary>
/// Overrides the back button press to navigate in the WebView's back stack instead of the application's.
/// </summary>
void MainPage::MainPage_BackPressed(Object^ sender, BackPressedEventArgs^ e)
{
	(sender);	// Unused parameter
	(e);		// Unused parameter

	if (WebViewControl->CanGoBack)
	{
		WebViewControl->GoBack();
		e->Handled = true;
	}
}

/// <summary>
/// Navigates forward in the WebView's history.
/// </summary>
void MainPage::ForwardAppBarButton_Click(Object^ sender, RoutedEventArgs^ e)
{
	(sender);	// Unused parameter
	(e);		// Unused parameter

	if (WebViewControl->CanGoBack)
	{
		WebViewControl->GoForward();
	}
}

/// <summary>
/// Navigates to the initial home page.
/// </summary>
void MainPage::HomeAppBarButton_Click(Object^ sender, RoutedEventArgs^ e)
{
	(sender);	// Unused parameter
	(e);		// Unused parameter

	WebViewControl->Navigate(GetHomeUri());
}
