import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { ReactPlugin, AppInsightsContext } from '@microsoft/applicationinsights-react-js';

export let reactPlugin: ReactPlugin = null as any;
export let appInsights: ApplicationInsights = null as any;

const initialise = (instrumentationKey: string): void => {
  if (!instrumentationKey) {
    throw new Error('Could not initialise App Insights: `instrumentationKey` not provided');
  }

  reactPlugin = new ReactPlugin();
  appInsights = new ApplicationInsights({
    config: {
      instrumentationKey,
      extensions: [reactPlugin as any],
    },
  });

  appInsights.loadAppInsights();
};

const handleRouteChange = (url: string): void => {
  if (!reactPlugin) {
    return;
  }

  reactPlugin.trackPageView({
    uri: url,
  });
};

interface IProps {}

export const AppInsightsContextProvider: React.FC<IProps> = (props) => {
  const router = useRouter();
  const [isInitialised, setInitialised] = useState(false);

  useEffect(() => {
    const instrumentationKey = process.env.NEXT_PUBLIC_APP_INSIGHTS_INSTRUMENTATION_KEY;

    if (!instrumentationKey || !!appInsights) {
      return;
    }

    if (!router.isReady) {
      return;
    }

    initialise(instrumentationKey);
    handleRouteChange(router.asPath);
    setInitialised(true);
  }, [router.asPath, router.isReady]);

  useEffect(() => {
    if (!isInitialised) {
      return;
    }

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [isInitialised, router.events]);

  return <AppInsightsContext.Provider value={reactPlugin}>{props.children}</AppInsightsContext.Provider>;
};
