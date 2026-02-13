# SSLPinning (React Native)

This project demonstrates SSL pinning in a React Native Android app using a custom OkHttp client.

## What Is SSL Pinning

SSL pinning is a TLS hardening technique where the app trusts only a specific certificate/public key hash for a target host. If the server certificate changes unexpectedly (for example, MITM or wrong backend cert), the TLS connection is rejected even if the cert chain is otherwise valid.

## Implementation Added In Last Commit

Based on commit `f94d4ff` (`feat:ssl pinning`), the app now includes:

1. Native Android pinning with OkHttp

   - File: `android/app/src/main/java/com/sslpinning/SSLPinning.kt`
   - Added `SSLPinningClient : OkHttpClientFactory`.
   - Configured `CertificatePinner` with:
     - Host: `jsonplaceholder.typicode.com`
     - Pin: `sha256/k+swi1D7Mu27FDJ9DAfns27/YipZz5s7BezuYsaXM/s=`
   - Added a network interceptor log (`SSLPinning` tag) to confirm pinned client usage.
   - Applied explicit network timeouts (connect/read/write/call).

2. React Native networking stack integration

   - File: `android/app/src/main/java/com/sslpinning/MainApplication.kt`
   - Registered the custom client in app startup:
     - `OkHttpClientProvider.setOkHttpClientFactory(SSLPinningClient())`
   - This makes React Native Android network calls use the pinned OkHttp client.

3. JS-level failure handling for TLS/network errors

   - File: `src/api.ts`
   - Added Axios response interceptor to detect likely SSL/certificate/handshake failures.
   - Shows user-friendly alerts for secure connection failures and generic network errors.

4. Supporting files
   - `cert.pem` added as certificate material in the project.
   - `App.tsx` includes a simple API-call button demo.
   - `index.js` enables `ReactotronConfig` in development mode.

## Current Behavior Notes

- Pinning is host-specific. The current native pin is set for `api.example.com`.
- The sample call in `App.tsx` currently requests `https://jsonplaceholder.typicode.com/todos/1`.
- For production, update both:
  - The pinned host/hash in `SSLPinning.kt`
  - Your API base URL/requests in JS (`src/api.ts` or app screens)

## Run The Project

```sh
# install dependencies
npm install

# start metro
npm start

# run Android
npm run android
```

## Optional: iOS

Current SSL pinning implementation in this commit is Android-side (OkHttp factory override). If you need iOS certificate pinning too, add platform-specific pinning in iOS networking stack.
