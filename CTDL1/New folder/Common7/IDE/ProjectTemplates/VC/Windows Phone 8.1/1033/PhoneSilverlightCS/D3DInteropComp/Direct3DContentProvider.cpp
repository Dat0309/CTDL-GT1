#include "pch.h"
#include "Direct3DContentProvider.h"

using namespace $safeprojectname$;

Direct3DContentProvider::Direct3DContentProvider()
	: m_renderResolution(0, 0), m_windowBounds(0, 0)
{
}


// IDrawingSurfaceContentProviderNative interface
HRESULT Direct3DContentProvider::Connect(_In_ IDrawingSurfaceRuntimeHostNative* host)
{
	m_host = host;

	// We can create the device-dependent resources.
	m_deviceResources = std::make_shared<DX::DeviceResources>();

	// Register to be notified if the Device is lost or recreated
	m_deviceResources->RegisterDeviceNotify(this);

	// TODO: Replace this with your app's content initialization.
	m_sceneRenderer = std::unique_ptr<Sample3DSceneRenderer>(new Sample3DSceneRenderer(m_deviceResources));
	m_fpsRenderer = std::unique_ptr<SampleFpsTextRenderer>(new SampleFpsTextRenderer(m_deviceResources));

	// Create the size dependent pieces now if available.
	if (m_renderResolution.Width != 0 && m_renderResolution.Height != 0)
	{
		m_deviceResources->UpdateForWindowSizeChange(m_windowBounds.Width, m_windowBounds.Height);
		m_deviceResources->UpdateForRenderResolutionChange(m_renderResolution.Width, m_renderResolution.Height);
		m_sceneRenderer->CreateWindowSizeDependentResources();
	}

	return S_OK;
}

void Direct3DContentProvider::Disconnect()
{
	if (m_deviceResources != nullptr)
		m_deviceResources->Trim();
	if (m_sceneRenderer != nullptr)
		m_sceneRenderer->ReleaseDeviceDependentResources();
	if (m_fpsRenderer != nullptr)
		m_fpsRenderer->ReleaseDeviceDependentResources();

	m_host = nullptr;
	m_synchronizedTexture = nullptr;
}

HRESULT Direct3DContentProvider::PrepareResources(_In_ const LARGE_INTEGER* presentTargetTime, _Out_ BOOL* contentDirty)
{
	UNREFERENCED_PARAMETER(presentTargetTime);

	// Content should always be dirty. This indicates we need to rerender
	*contentDirty = TRUE; 
	return S_OK;
}

HRESULT Direct3DContentProvider::GetTexture(_In_ const DrawingSurfaceSizeF* size, _Out_ IDrawingSurfaceSynchronizedTextureNative** synchronizedTexture, _Out_ DrawingSurfaceRectF* textureSubRectangle)
{
	HRESULT hr = S_OK;

	if (!m_synchronizedTexture)
	{
		hr = m_host->CreateSynchronizedTexture(m_deviceResources->GetTexture(), &m_synchronizedTexture);
	}

	// Set output parameters.
	textureSubRectangle->left = 0.0f;
	textureSubRectangle->top = 0.0f;
	textureSubRectangle->right = static_cast<FLOAT>(size->width);
	textureSubRectangle->bottom = static_cast<FLOAT>(size->height);
	*synchronizedTexture = nullptr;

	hr = m_synchronizedTexture.CopyTo(synchronizedTexture);

	// Draw to the texture.
	if (SUCCEEDED(hr))
	{
		hr = m_synchronizedTexture->BeginDraw();
		
		if (SUCCEEDED(hr))
		{
			Update();
			if (Render())
			{
				m_host->RequestAdditionalFrame();
			}
		}

		m_synchronizedTexture->EndDraw();
	}

	return hr;
}

void Direct3DContentProvider::OnPointerPressed(Windows::Foundation::Point point)
{
	UNREFERENCED_PARAMETER(point);

	// When the pointer is pressed begin tracking the pointer movement.
	m_sceneRenderer->StartTracking();
}

void Direct3DContentProvider::OnPointerMoved(Windows::Foundation::Point point)
{
	// Update the pointer tracking code.
	if (m_sceneRenderer->IsTracking())
	{
		m_sceneRenderer->TrackingUpdate(point.X);
	}
}

void Direct3DContentProvider::OnPointerReleased(Windows::Foundation::Point point)
{
	UNREFERENCED_PARAMETER(point);

	// Stop tracking pointer movement when the pointer is released.
	m_sceneRenderer->StopTracking();
}


// Updates the application state once per frame.
void Direct3DContentProvider::Update()
{
	ProcessInput();

	// Update scene objects.
	m_timer.Tick([&]()
	{
		// TODO: Replace this with your app's content update functions.
		m_sceneRenderer->Update(m_timer);
		m_fpsRenderer->Update(m_timer);
	});
}

// Process all input from the user before updating game state
void Direct3DContentProvider::ProcessInput()
{
	// TODO: Add per frame input handling here.
}

// Renders the current frame according to the current application state.
// Returns true if the frame was rendered and is ready to be displayed.
bool Direct3DContentProvider::Render()
{
	// Don't try to render anything before the first Update.
	if (m_timer.GetFrameCount() == 0)
	{
		return false;
	}

	auto context = m_deviceResources->GetD3DDeviceContext();

	// Reset render targets to the screen.
	ID3D11RenderTargetView *const targets[1] = { m_deviceResources->GetRenderTargetView() };
	context->OMSetRenderTargets(1, targets, m_deviceResources->GetDepthStencilView());

	// Clear the back buffer and depth stencil view.
	context->ClearRenderTargetView(m_deviceResources->GetRenderTargetView(), DirectX::Colors::CornflowerBlue);
	context->ClearDepthStencilView(m_deviceResources->GetDepthStencilView(), D3D11_CLEAR_DEPTH | D3D11_CLEAR_STENCIL, 1.0f, 0);

	// Render the scene objects.
	// TODO: Replace this with your app's content rendering functions.
	m_sceneRenderer->Render();
	m_fpsRenderer->Render();

	return true;
}
// Notifies renderers that device resources need to be released.
void Direct3DContentProvider::OnDeviceLost()
{
	m_sceneRenderer->ReleaseDeviceDependentResources();
	m_fpsRenderer->ReleaseDeviceDependentResources();
}

// Notifies renderers that device resources may now be recreated.
void Direct3DContentProvider::OnDeviceRestored()
{
	m_sceneRenderer->CreateDeviceDependentResources();
	m_fpsRenderer->CreateDeviceDependentResources();
	m_deviceResources->CreateWindowSizeDependentResources();
	m_sceneRenderer->CreateWindowSizeDependentResources();
}

void Direct3DContentProvider::UpdateForRenderResolutionChange(float width, float height)
{
	if (width != m_renderResolution.Width ||
		height != m_renderResolution.Height)
	{
		m_renderResolution.Width = width;
		m_renderResolution.Height = height;

		if (m_deviceResources != nullptr)
		{
			m_deviceResources->UpdateForRenderResolutionChange(width, height);
			m_sceneRenderer->CreateWindowSizeDependentResources();
		}

		// When the size changes, we have to resychronize our output
		if (m_host != nullptr)
		{
			m_host->CreateSynchronizedTexture(m_deviceResources->GetTexture(), &m_synchronizedTexture);
		}
	}

}

void Direct3DContentProvider::UpdateForWindowSizeChange(float width, float height)
{
	if (width != m_windowBounds.Width ||
		height != m_windowBounds.Height)
	{
		m_windowBounds.Width = width;
		m_windowBounds.Height = height;

		if (m_deviceResources != nullptr)
		{
			m_deviceResources->UpdateForWindowSizeChange(width, height);
		}
	}
}

