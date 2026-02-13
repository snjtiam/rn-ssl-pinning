import axios from 'axios';
import { Alert } from 'react-native';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 15000,
});

api.interceptors.response.use(
  response => response,
  error => {
    // SSL pinning failures usually come here as a network error

    console.log('ERRR', error);

    if (!error.response) {
      handleNetworkFailure(error);
    }

    return Promise.reject(error);
  },
);

function handleNetworkFailure(error: any) {
  const message = String(error?.message || '');

  const isSSLPinningFailure =
    message.includes('SSL') ||
    message.includes('certificate') ||
    message.includes('CLEARTEXT') ||
    message.includes('Handshake');

  if (isSSLPinningFailure) {
    Alert.alert(
      'Secure Connection Failed',
      "We couldn't verify the server's identity. Please check your network or try again later.",
    );
    return;
  }

  Alert.alert(
    'Network Error',
    'Unable to connect to the server. Please check your internet connection.',
  );
}

export default api;
