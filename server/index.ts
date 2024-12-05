import { PluginInitializerContext } from '../../../src/core/server';

//  This exports static code and TypeScript types,
//  as well as, Kibana Platform `plugin()` initializer.

export async function plugin(initializerContext: PluginInitializerContext) {
  const { Cs598Plugin } = await import('./plugin');
  return new Cs598Plugin(initializerContext);
}

export type { Cs598PluginSetup, Cs598PluginStart } from './types';
