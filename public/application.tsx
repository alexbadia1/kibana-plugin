import React from 'react';
import ReactDOM from 'react-dom';
import { AppMountParameters, CoreStart } from '../../../src/core/public';
import { AppPluginStartDependencies } from './types';
import { Cs598App } from './components/app';
import { IntlProvider } from 'react-intl';
import { QueryClient } from '@tanstack/react-query';

export const renderApp = (
  { notifications, http }: CoreStart,
  { navigation }: AppPluginStartDependencies,
  { appBasePath, element }: AppMountParameters
) => {

  const queryClient = new QueryClient();

  ReactDOM.render(
    // Rip translations
    <IntlProvider locale="en">
      <Cs598App
        basename={appBasePath}
        notifications={notifications}
        http={http}
        navigation={navigation}
        queryClient={queryClient}
      />
    </IntlProvider>,
    element
  );

  return () => ReactDOM.unmountComponentAtNode(element);
};
