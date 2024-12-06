import React from 'react';

// Kibana libraries
import { EuiHorizontalRule, EuiPageTemplate, EuiTitle } from '@elastic/eui';
import type { CoreStart } from '@kbn/core/public';
import type { NavigationPublicPluginStart } from '@kbn/navigation-plugin/public';

// External libraries
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// My libraries
import { SearchQueryProvider } from '../context/SearchQueryProvider';
import { WatchlistHitsProvider } from '../context/WatchlistHitsProvider';
import { FocusedWatchlistHitProvider } from '../context/FocusedWatchlistHitProvider';
import { Graph } from './Diagram/Graph';;
import { SearchBar } from './WatchlistHits/SearchBar';
import { SearchResults } from './WatchlistHits/SearchResults';
import { EndpointEventsProvider } from '../context/EndpointEventsProvider';
import { EndpointEventsTable } from './EndpointEvents/EndpointEventsTable';


const EuiPageTemplateCssStyles = {
  'paddingTop': '0',
  'minBlockSize': "max(460px, calc(100vh - var(--euiFixedHeadersOffset, 96px)))"
}

const EuiPageTemplateSidebarCssStyles = {
  'display': 'flex',
  'flexDirection': 'column',
  'justifyContent': 'start',
  'alignItems': 'start',
  'maxBlockSize': "calc(100vh - var(--euiFixedHeadersOffset, 96px))"
}

const MainCssStyle = {
  'display': 'flex',
  'flexDirection': 'column',
  'height': 'calc(100vh - var(--euiFixedHeadersOffset, 96px))'
}

interface Cs598AppDeps {
  basename: string;
  notifications: CoreStart['notifications'];
  http: CoreStart['http'];
  navigation: NavigationPublicPluginStart;
  queryClient: QueryClient;
}

export const Cs598App = ({ basename, notifications, http, navigation, queryClient }: Cs598AppDeps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SearchQueryProvider>
        <WatchlistHitsProvider http={http}>
          <FocusedWatchlistHitProvider>
              <EndpointEventsProvider http={http}>
                <EuiPageTemplate restrictWidth="1000px" style={EuiPageTemplateCssStyles}>
                  <EuiPageTemplate.Sidebar style={EuiPageTemplateSidebarCssStyles}>
                    <EuiTitle size="l">
                      <h5 style={{fontSize: 16}}> Alerts </h5>
                    </EuiTitle>
                    <SearchBar />
                    <SearchResults />
                  </EuiPageTemplate.Sidebar>
                  <div style={MainCssStyle}>
                    <Graph />
                    <EuiHorizontalRule />
                    <EndpointEventsTable />
                  </div>
                </EuiPageTemplate>
            </EndpointEventsProvider>
          </FocusedWatchlistHitProvider>
        </WatchlistHitsProvider>
      </SearchQueryProvider>
    </QueryClientProvider>
  );
};
