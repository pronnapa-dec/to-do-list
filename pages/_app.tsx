// pages/_app.tsx
import React from 'react';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '../redux/store'; // Import your Redux store

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
