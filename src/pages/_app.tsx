import 'semantic-ui-css/semantic.min.css';
import '@/styles/global.css';
import React, { ReactElement } from 'react';
import { AppProps } from 'next/app';
import { AppInsightsContextProvider } from '../components/context/AppInsightsContextProvider';

// eslint-disable-next-line destructuring/in-params
export default function MyApp({ Component, pageProps }: AppProps): ReactElement {
  return (
    <AppInsightsContextProvider>
      <Component {...pageProps} />
    </AppInsightsContextProvider>
  );
}
