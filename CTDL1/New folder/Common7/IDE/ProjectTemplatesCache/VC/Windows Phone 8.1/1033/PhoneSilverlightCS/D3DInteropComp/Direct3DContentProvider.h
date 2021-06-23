#pragma once

#include "pch.h"
#include <wrl/module.h>
#include <Windows.Phone.Graphics.Interop.h>
#include <DrawingSurfaceNative.h>
#include "Common\DeviceResources.h"
#include "Content\Sample3DSceneRenderer.h"
#include "Content\SampleFpsTextRenderer.h"

class Direct3DContentProvider : public Microsoft::WRL::RuntimeClass<
		Microsoft::WRL::RuntimeClassFlags<Microsoft::WRL::WinRtClassicComMix>,
		ABI::Windows::Phone::Graphics::Interop::IDrawingSurfaceContentProvider,
		IDrawingSurfaceContentProviderNative>, 
		public DX::IDeviceNotify
{
public:
	Direct3DContentProvider();

	void ReleaseD3DResources();

	// IDrawingSurfaceContentProviderNative
	HRESULT STDMETHODCALLTYPE Connect(_In_ IDrawingSurfaceRuntimeHostNative* host);
	void STDMETHODCALLTYPE Disconnect();

	HRESULT STDMETHODCALLTYPE PrepareResources(_In_ const LARGE_INTEGER* presentTargetTime, _Out_ BOOL* contentDirty);
	HRESULT STDMETHODCALLTYPE GetTexture(_In_ const DrawingSurfaceSizeF* size, _Out_ IDrawingSurfaceSynchronizedTextureNative** synchronizedTexture, _Out_ DrawingSurfaceRectF* textureSubRectangle);

	void OnPointerPressed(Windows::Foundation::Point point);
	void OnPointerMoved(Windows::Foundation::Point point);
	void OnPointerReleased(Windows::Foundation::Point point);


	void UpdateForRenderResolutionChange(float width, float height);
	void UpdateForWindowSizeChange(float width, float height);

	// IDeviceNotify
	virtual void OnDeviceLost();
	virtual void OnDeviceRestored();

private:
	HRESULT InitializeTexture(_In_ const DrawingSurfaceSizeF* size);


private:
	void ProcessInput();
	void Update();
	bool Render();

	// Cached pointer to device resources.
	std::shared_ptr<DX::DeviceResources> m_deviceResources;

	// TODO: Replace with your own content renderers.
	std::unique_ptr<$safeprojectname$::Sample3DSceneRenderer> m_sceneRenderer;
	std::unique_ptr<$safeprojectname$::SampleFpsTextRenderer> m_fpsRenderer;

	// Rendering loop timer.
	DX::StepTimer m_timer;

	// Track current input pointer position.
	float m_pointerLocationX;

	Microsoft::WRL::ComPtr<IDrawingSurfaceRuntimeHostNative> m_host;
	Microsoft::WRL::ComPtr<IDrawingSurfaceSynchronizedTextureNative> m_synchronizedTexture;

	Windows::Foundation::Size m_renderResolution;
	Windows::Foundation::Size m_windowBounds;

};