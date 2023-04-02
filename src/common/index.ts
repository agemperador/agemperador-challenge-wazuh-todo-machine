import {
    IOpenSearchSearchResponse,
    IOpenSearchSearchRequest,
  } from '../../../src/plugins/data/common';
  
export const PLUGIN_ID = 'customPlugin';
export const PLUGIN_NAME = 'TO-DO Empe plugin';
  
export interface IMyStrategyRequest extends IOpenSearchSearchRequest {
get_cool: boolean;
}
export interface IMyStrategyResponse extends IOpenSearchSearchResponse {
cool: string;
}
  
export const SERVER_SEARCH_ROUTE_PATH = '/api/examples/search';