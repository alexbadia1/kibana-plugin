import './index.scss';

import { Cs598Plugin } from './plugin';

// This exports static code and TypeScript types,
// as well as, Kibana Platform `plugin()` initializer.
export function plugin() {
  return new Cs598Plugin();
}
export type { Cs598PluginSetup, Cs598PluginStart } from './types';
