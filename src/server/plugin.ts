import {
  PluginInitializerContext,
  CoreSetup,
  CoreStart,
  Plugin,
  Logger,
} from '../../../src/core/server';

import { CustomPluginPluginSetup, CustomPluginPluginStart, } from './types';

// Optional client certificates if you don't want to use HTTP basic authentication.
// var client_cert_path = '/full/path/to/client.pem'
// var client_key_path = '/full/path/to/client-key.pem'

export class CustomPluginPlugin
  implements Plugin<CustomPluginPluginSetup, CustomPluginPluginStart> {
  private readonly logger: Logger;

  constructor(initializerContext: PluginInitializerContext) {
    this.logger = initializerContext.logger.get();
  }

  public setup(  core: CoreSetup) {

    this.logger.debug('custom_plugin: Setup');
    const router = core.http.createRouter();
    
    // Register server side APIs
    router.get(
        {
          path:'/api',
          validate: false,
        }
        , () => {
      console.log('custom_plugin: GET /api')
    });

    return "HOLA MUNDO";
  }

  public start(core: CoreStart) {
    this.logger.debug('custom_plugin: Started');
    

    return {};
  }

  public stop() {
    
  }
}
