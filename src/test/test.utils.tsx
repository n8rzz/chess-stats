import 'semantic-ui-css/semantic.min.css';
import '@/styles/global.css';
import React from 'react';

/**
 * Should be used to wrap components under test
 *
 * Uused to inject stylesheets into test components
 */
export const TestWrapper: React.FC<React.PropsWithChildren<any>> = (props) => {
  return props.children;
};
