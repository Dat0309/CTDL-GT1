//
// MainPage.xaml.h
// Declaration of the MainPage class.
//

#pragma once

#include "MainPage.g.h"

namespace $safeprojectname$
{
	public ref class MainPage sealed
	{
		Windows::Foundation::Uri^ GetHomeUri() const
		{
			// TODO: Replace with your URL here.
			return ref new Windows::Foundation::Uri(L"ms-appx-web:///Html/index.html");
		}

	public:
		MainPage();

	protected:
		virtual void OnNavigatedTo(Windows::UI::Xaml::Navigation::NavigationEventArgs^ e) override;
		virtual void OnNavigatedFrom(Windows::UI::Xaml::Navigation::NavigationEventArgs^ e) override;

	private:
		Windows::Foundation::EventRegistrationToken _backPressedToken;

		void Browser_NavigationCompleted(Platform::Object^ sender, Windows::UI::Xaml::Controls::WebViewNavigationCompletedEventArgs^ e);
		void MainPage_BackPressed(Platform::Object^ sender, Windows::Phone::UI::Input::BackPressedEventArgs^ e);
		void ForwardAppBarButton_Click(Platform::Object^ sender, Windows::UI::Xaml::RoutedEventArgs^ e);
		void HomeAppBarButton_Click(Platform::Object^ sender, Windows::UI::Xaml::RoutedEventArgs^ e);
	};
}
