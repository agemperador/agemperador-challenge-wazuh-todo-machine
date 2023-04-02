import { PluginSetup, PluginStart } from '../../../src/plugins/data/server';

export interface SearchExamplesPluginSetupDeps {
  data: PluginSetup;
}

export interface SearchExamplesPluginStartDeps {
  data: PluginStart;
}


// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CustomPluginPluginSetup {}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CustomPluginPluginStart {}
