import { ISearchStrategy, PluginStart } from '../../../src/plugins/data/server';
import { IMyStrategyResponse, IMyStrategyRequest } from '../common';

export const mySearchStrategyProvider = (
  data: PluginStart
): ISearchStrategy<IMyStrategyRequest, IMyStrategyResponse> => {
  const opensearch = data.search.getSearchStrategy('opensearch');
  return {
    search: async (context, request, options): Promise<IMyStrategyResponse> => {
      const opensearchSearchRes = await opensearch.search(context, request, options);
      return {
        ...opensearchSearchRes,
        cool: request.get_cool ? 'YES' : 'NOPE',
      };
    },
    cancel: async (context, id) => {
      if (opensearch.cancel) {
        opensearch.cancel(context, id);
      }
    },
  };
};