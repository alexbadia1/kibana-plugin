import React, { useLayoutEffect, useState } from 'react';

// Default External Plugin Dependencies
import { i18n } from '@kbn/i18n';
import { FormattedMessage, I18nProvider } from '@kbn/i18n-react';
import { BrowserRouter as Router } from '@kbn/shared-ux-router';
import { EuiButton, EuiHorizontalRule, EuiPageTemplate, EuiTitle, EuiText, EuiFlexGroup, EuiIcon } from '@elastic/eui';
import type { CoreStart } from '@kbn/core/public';
import type { NavigationPublicPluginStart } from '@kbn/navigation-plugin/public';

// Kibana Dependencies
import { KibanaPageTemplate, KibanaPageTemplateProps } from '@kbn/shared-ux-page-kibana-template';
import { EuiLoadingLogo, EuiLoadingSpinner } from '@elastic/eui';
import { PLUGIN_ID, PLUGIN_NAME } from '../../common';

// My Plugin
import { Graph } from './Diagram/Graph';

interface Cs598AppDeps {
  basename: string;
  notifications: CoreStart['notifications'];
  http: CoreStart['http'];
  navigation: NavigationPublicPluginStart;
}

export const Cs598App = ({ basename, notifications, http, navigation }: Cs598AppDeps) => {
  // Render the application DOM.
  // Note that `navigation.ui.TopNavMenu` is a stateful component exported on the `navigation` plugin's start contract.
  return (
    <EuiPageTemplate restrictWidth="1000px" style={{paddingTop: 0}}>
      <EuiPageTemplate.Sidebar>
        <EuiTitle size="l">
          <h1>
            <FormattedMessage
              id="cs598.helloWorldText"
              defaultMessage="{name}"
              values={{ name: "Alerts" }}
            />
          </h1>
        </EuiTitle>
      </EuiPageTemplate.Sidebar>
      <Graph />
      <EuiHorizontalRule />
      <EuiTitle>
        <h2>
          <FormattedMessage
            id="cs598.congratulationsTitle"
            defaultMessage="Alert #xxx"
          />
        </h2>
      </EuiTitle>
    </EuiPageTemplate>
  );
};
