#include "pch.h"
#include "Direct3DInterop.h"
#include "Direct3DContentProvider.h"

using namespace Windows::Foundation;
using namespace Windows::UI::Core;
using namespace Microsoft::WRL;
using namespace Windows::Phone::Graphics::Interop;
using namespace Windows::Phone::Input::Interop;

namespace $safeprojectname$
{

Direct3DInterop::Direct3DInterop() 
{
}

IDrawingSurfaceContentProvider^ Direct3DInterop::CreateContentProvider()
{
	if (m_contentProvider == nullptr)
	{
		m_contentProvider = Make<Direct3DContentProvider>();
		m_contentProvider->UpdateForWindowSizeChange(m_windowBounds.Width, m_windowBounds.Height);
		m_contentProvider->UpdateForRenderResolutionChange(m_renderResolution.Width, m_renderResolution.Height);
	}

	return reinterpret_cast<IDrawingSurfaceContentProvider^>(m_contentProvider.Get());
}

// IDrawingSurfaceManipulationHandler
void Direct3DInterop::SetManipulationHost(DrawingSurfaceManipulationHost^ manipulationHost)
{
	manipulationHost->PointerPressed +=
		ref new TypedEventHandler<DrawingSurfaceManipulationHost^, PointerEventArgs^>(this, &Direct3DInterop::OnPointerPressed);

	manipulationHost->PointerMoved +=
		ref new TypedEventHandler<DrawingSurfaceManipulationHost^, PointerEventArgs^>(this, &Direct3DInterop::OnPointerMoved);

	manipulationHost->PointerReleased +=
		ref new TypedEventHandler<DrawingSurfaceManipulationHost^, PointerEventArgs^>(this, &Direct3DInterop::OnPointerReleased);
}

void Direct3DInterop::WindowBounds::set(Windows::Foundation::Size bounds)
{
	if (bounds.Width != m_windowBounds.Width ||
		bounds.Height != m_windowBounds.Height)
	{
		m_windowBounds = bounds;
		if (m_contentProvider != nullptr)
		{
			m_contentProvider->UpdateForWindowSizeChange(bounds.Width, bounds.Height);
		}
	}
}

void Direct3DInterop::NativeResolution::set(Windows::Foundation::Size nativeResolution)
{
	if (nativeResolution.Width != m_nativeResolution.Width ||
		nativeResolution.Height != m_nativeResolution.Height)
	{
		m_nativeResolution = nativeResolution;
	}
}

void Direct3DInterop::RenderResolution::set(Windows::Foundation::Size renderResolution)
{
	if (renderResolution.Width  != m_renderResolution.Width ||
		renderResolution.Height != m_renderResolution.Height)
	{
		m_renderResolution = renderResolution;
		if (m_contentProvider != nullptr)
		{
			m_contentProvider->UpdateForRenderResolutionChange(renderResolution.Width, renderResolution.Height);
		}
	}
}

// Event Handlers
void Direct3DInterop::OnPointerPressed(DrawingSurfaceManipulationHost^ sender, PointerEventArgs^ args)
{
	// Pass onto the content provider
	m_contentProvider->OnPointerPressed(args->CurrentPoint->Position);
}

void Direct3DInterop::OnPointerMoved(DrawingSurfaceManipulationHost^ sender, PointerEventArgs^ args)
{
	// Pass onto the content provider
	m_contentProvider->OnPointerMoved(args->CurrentPoint->Position);
}

void Direct3DInterop::OnPointerReleased(DrawingSurfaceManipulationHost^ sender, PointerEventArgs^ args)
{
	// Pass onto the content provider
	m_contentProvider->OnPointerReleased(args->CurrentPoint->Position);
}

}
