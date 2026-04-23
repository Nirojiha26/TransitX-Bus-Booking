package com.frontend

import android.app.Application
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeApplicationEntryPoint.loadReactNative
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost

// --- CORRECT PLUTO IMPORTS ---
import com.pluto.Pluto
import com.pluto.plugins.network.PlutoNetworkPlugin
import com.pluto.plugins.network.okhttp.PlutoOkhttpInterceptor 
import com.facebook.react.modules.network.OkHttpClientProvider
import com.facebook.react.modules.network.OkHttpClientFactory
import okhttp3.OkHttpClient

class MainApplication : Application(), ReactApplication {

  override val reactHost: ReactHost by lazy {
    getDefaultReactHost(
      context = applicationContext,
      packageList =
        PackageList(this).packages.apply {
          // Packages that cannot be autolinked yet can be added manually here
        },
    )
  }

  override fun onCreate() {
    super.onCreate()
    
    // --- 1. INITIALIZE PLUTO (2.2.0 Syntax) ---
    Pluto.Installer(this)
        .addPlugin(PlutoNetworkPlugin())
        .install()
    Pluto.showNotch(true)

    // --- 2. SETUP NETWORK INTERCEPTOR ---
    OkHttpClientProvider.setOkHttpClientFactory(object : OkHttpClientFactory {
        override fun createNewNetworkModuleClient(): OkHttpClient {
            android.util.Log.d("PlutoInit", "Creating new OkHttpClient with PlutoInterceptor")
            return OkHttpClientProvider.createClientBuilder()
                .addInterceptor(PlutoOkhttpInterceptor)
                .build()
        }
    })

    loadReactNative(this)
  }
}