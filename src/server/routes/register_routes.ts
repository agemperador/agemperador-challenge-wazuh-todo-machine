import { IRouter } from 'opensearch-dashboards/server';
import { PluginStart as DataPluginStart } from 'src/plugins/data/server';
import { registerServerSearchRoute } from './server_search_route';

export function registerRoutes(router: IRouter, data: DataPluginStart) {
  registerServerSearchRoute(router, data);
}