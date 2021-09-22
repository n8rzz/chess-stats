import 'semantic-ui-css/semantic.min.css';
import '@/styles/global.css';
import React, { ReactElement } from 'react';
import { AppProps } from 'next/app';
import { AppInsightsContextProvider } from '../components/context/AppInsightsContextProvider';

// eslint-disable-next-line destructuring/in-params
export default function MyApp({ Component, pageProps }: AppProps): ReactElement {
  const shouldShowVersion = React.useMemo(() => process.env.NEXT_PUBLIC_SHOULD_SHOW_VERSION === 'true' ?? false, [
    process.env,
  ]);

  return (
    <AppInsightsContextProvider>
      <Component {...pageProps} />
      {shouldShowVersion && (
        <div style={{ padding: '10px 10px 10px 15px', fontSize: '10px' }}>
          version: <span>{process.env.NEXT_PUBLIC_APP_VERSION}</span>
        </div>
      )}
    </AppInsightsContextProvider>
  );
}
