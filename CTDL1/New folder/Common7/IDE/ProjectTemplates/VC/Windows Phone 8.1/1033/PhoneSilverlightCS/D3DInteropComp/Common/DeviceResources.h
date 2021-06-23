#pragma once

namespace DX
{
    // Provides an interface for an application that owns DeviceResources to be notified of the device being lost or created.
	interface IDeviceNotify
	{
		virtual void OnDeviceLost() = 0;
		virtual void OnDeviceRestored() = 0;
	};

	// Controls all the DirectX device resources.
	class DeviceResources
	{
	public:
		DeviceResources();
		void CreateDeviceIndependentResources();
		void CreateDeviceResources();
		void CreateWindowSizeDependentResources();
		void UpdateForRenderResolutionChange(float width, float height);
		void UpdateForWindowSizeChange(float width, float height);
		void ValidateDevice();
		void HandleDeviceLost();
		void RegisterDeviceNotify(IDeviceNotify* deviceNotify);
		void Trim();
		void Present();

		// Device Accessors.
		Windows::Foundation::Size GetOutputSize() const                 { return m_renderTargetSize; }
		Windows::Foundation::Size GetLogicalSize() const                { return m_renderTargetSize; }

		// D3D Accessors.
		ID3D11Device1*			GetD3DDevice() const					{ return m_d3dDevice.Get(); }
		ID3D11DeviceContext1*	GetD3DDeviceContext() const				{ return m_d3dContext.Get(); }
		ID3D11RenderTargetView* GetRenderTargetView() const             { return m_renderTargetView.Get(); }
		ID3D11DepthStencilView* GetDepthStencilView() const				{ return m_depthStencilView.Get(); }
		ID3D11Texture2D*        GetTexture() const                      { return m_renderTarget.Get(); }

		// D2D Accessors.
		ID2D1Factory2*			GetD2DFactory() const					{ return m_d2dFactory.Get(); }
		ID2D1Device1*			GetD2DDevice() const					{ return m_d2dDevice.Get(); }
		ID2D1DeviceContext1*	GetD2DDeviceContext() const				{ return m_d2dContext.Get(); }
		ID2D1Bitmap1*			GetD2DTargetBitmap() const				{ return m_d2dTargetBitmap.Get(); }
		IDWriteFactory2*		GetDWriteFactory() const				{ return m_dwriteFactory.Get();	 }
		IWICImagingFactory2*	GetWicImagingFactory() const			{ return m_wicFactory.Get(); }

	private:
		// Direct3D Objects.
		Microsoft::WRL::ComPtr<ID3D11Device1> m_d3dDevice;
		Microsoft::WRL::ComPtr<ID3D11DeviceContext1> m_d3dContext;
		Microsoft::WRL::ComPtr<ID3D11Texture2D> m_renderTarget;
		Microsoft::WRL::ComPtr<ID3D11RenderTargetView> m_renderTargetView;
		Microsoft::WRL::ComPtr<ID3D11DepthStencilView> m_depthStencilView;

		// Direct2D drawing components.
		Microsoft::WRL::ComPtr<ID2D1Factory2>		m_d2dFactory;
		Microsoft::WRL::ComPtr<ID2D1Device1>		m_d2dDevice;
		Microsoft::WRL::ComPtr<ID2D1DeviceContext1>	m_d2dContext;
		Microsoft::WRL::ComPtr<ID2D1Bitmap1>		m_d2dTargetBitmap;

		// DirectWrite drawing components.
		Microsoft::WRL::ComPtr<IDWriteFactory2>		m_dwriteFactory;
		Microsoft::WRL::ComPtr<IWICImagingFactory2>	m_wicFactory;
		
		// Cached renderer properties.
		D3D_FEATURE_LEVEL							m_featureLevel;
		Windows::Foundation::Size					m_renderTargetSize;
		Windows::Foundation::Rect					m_windowBounds;
		float										m_dpi;

		// The IDeviceNotify can be held directly as it owns the DeviceResources.
		IDeviceNotify* m_deviceNotify;
	};
}