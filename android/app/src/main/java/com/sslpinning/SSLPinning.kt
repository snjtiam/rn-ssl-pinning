package com.sslpinning

import android.util.Log
import com.facebook.react.modules.network.OkHttpClientFactory
import com.facebook.react.modules.network.OkHttpClientProvider
import java.util.concurrent.TimeUnit
import okhttp3.CertificatePinner
import okhttp3.OkHttpClient

class SSLPinningClient : OkHttpClientFactory {
    override fun createNewNetworkModuleClient(): OkHttpClient {

        val clientBuilder = OkHttpClientProvider.createClientBuilder()

        clientBuilder.addNetworkInterceptor { chain ->
            val req = chain.request()

            Log.d("SSLPinning", "Pinned client used. host=${req.url.host} url=${req.url}")
            chain.proceed(req)
        }

        val pinner = CertificatePinner.Builder()
            .add("api.example.com", "sha256/k+swi1D7Mu27FDJ9DAfns27/YipZz5s7BezuYsaXM/s=")
            .build()

        return clientBuilder
            .connectTimeout(10, TimeUnit.SECONDS)
            .readTimeout(15, TimeUnit.SECONDS)
            .writeTimeout(15, TimeUnit.SECONDS)
            .callTimeout(20, TimeUnit.SECONDS)
            .certificatePinner(pinner)
            .build()
    }
}
