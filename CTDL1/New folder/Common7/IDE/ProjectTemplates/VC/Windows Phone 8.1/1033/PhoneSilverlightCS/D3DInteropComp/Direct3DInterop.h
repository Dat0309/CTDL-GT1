#pragma once

#include "pch.h"
#include <DrawingSurfaceNative.h>
#include "Direct3DContentProvider.h"


namespace $safeprojectname$
{

[Windows::Foundation::Metadata::WebHostHidden]
public ref class Direct3DInterop sealed : public Windows::Phone::Input::Interop::IDrawingSurfaceManipulationHandler
{
public:
	Direct3DInterop();

	// IDrawingSurfaceManipulationHandler
	virtual void SetManipulationHost(Windows::Phone::Input::Interop::DrawingSurfaceManipulationHost^ manipulationHost);

	property Windows::Foundation::Size WindowBounds
	{
		Windows::Foundation::Size get(){ return m_windowBounds; }
		void set(Windows::Foundation::Size bounds);
	}
	property Windows::Foundation::Size NativeResolution
	{
		Windows::Foundation::Size get(){ return m_nativeResolution; }
		void set(Windows::Foundation::Size nativeResolution);
	}
	property Windows::Foundation::Size RenderResolution
	{
		Windows::Foundation::Size get(){ return m_renderResolution; }
		void set(Windows::Foundation::Size renderResolution);
	}

	Windows::Phone::Graphics::Interop::IDrawingSurfaceContentProvider^ Direct3DInterop::CreateContentProvider();

protected:
	// Event Handlers
	void OnPointerPressed(Windows::Phone::Input::Interop::DrawingSurfaceManipulationHost^ sender, Windows::UI::Core::PointerEventArgs^ args);
	void OnPointerMoved(Windows::Phone::Input::Interop::DrawingSurfaceManipulationHost^ sender, Windows::UI::Core::PointerEventArgs^ args);
	void OnPointerReleased(Windows::Phone::Input::Interop::DrawingSurfaceManipulationHost^ sender, Windows::UI::Core::PointerEventArgs^ args);


private:
	Microsoft::WRL::ComPtr<Direct3DContentProvider> m_contentProvider;

	Windows::Foundation::Size m_renderResolution;
	Windows::Foundation::Size m_nativeResolution;
	Windows::Foundation::Size m_windowBounds;
};

}
