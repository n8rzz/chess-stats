/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
import 'semantic-ui-css/semantic.min.css';
import '@/styles/global.css';
import React, { ReactElement } from 'react';
import { AppProps } from 'next/app';

export default function MyApp({
  Component,
  pageProps,
}: AppProps): ReactElement {
  return <Component {...pageProps} />;
}
