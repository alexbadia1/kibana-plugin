import { NavigationPublicPluginStart } from '../../../src/plugins/navigation/public';

export interface Cs598PluginSetup {
  getGreeting: () => string;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Cs598PluginStart {}

export interface AppPluginStartDependencies {
  navigation: NavigationPublicPluginStart;
}

export interface AlertsSearchQuery {
  page: number;
  pageSize: number;
  searchQuery: string;
}