import React, { ReactElement } from 'react';
import { SplashPage } from '../components/pages/SplashPage';

export default function StatsPageRoute(): ReactElement {
  return <SplashPage appVersion={process.env.NEXT_PUBLIC_APP_VERSION as string} />;
}
