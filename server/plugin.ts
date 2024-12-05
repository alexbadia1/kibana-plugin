import {
  PluginInitializerContext,
  CoreSetup,
  CoreStart,
  Plugin,
  Logger,
} from '../../../src/core/server';

import { Cs598PluginSetup, Cs598PluginStart } from './types';
import { defineRoutes } from './routes';

export class Cs598Plugin implements Plugin<Cs598PluginSetup, Cs598PluginStart> {
  private readonly logger: Logger;

  constructor(initializerContext: PluginInitializerContext) {
    this.logger = initializerContext.logger.get();
  }

  public setup(core: CoreSetup) {
    this.logger.debug('CS598: Setup');
    const router = core.http.createRouter();

    // Register server side APIs
    defineRoutes(router);

    return {};
  }

  public start(core: CoreStart) {
    this.logger.debug('CS598: Started');
    return {};
  }

  public stop() {}
}
