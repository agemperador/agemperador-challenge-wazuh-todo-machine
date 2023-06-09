
import { PluginStart as DataPluginStart, IOpenSearchSearchRequest } from 'src/plugins/data/server';
import { schema } from '@osd/config-schema';
import { IOpenSearchSearchResponse } from 'src/plugins/data/common';
import { IRouter } from '../../../../src/core/server';
import { SERVER_SEARCH_ROUTE_PATH } from '../../common';

export function registerServerSearchRoute(router: IRouter, data: DataPluginStart) {
  router.get(
    {
      path: SERVER_SEARCH_ROUTE_PATH,
      validate: {
        query: schema.object({
          index: schema.maybe(schema.string()),
          field: schema.maybe(schema.string()),
        }),
      },
    },
    async (context, request, response) => {
      const { index, field } = request.query;
      // Run a synchronous search server side, by enforcing a high keepalive and waiting for completion.
      // If you wish to run the search with polling (in basic+), you'd have to poll on the search API.
      // Please reach out to the @app-arch-team if you need this to be implemented.
      const res = await data.search.search(
        context,
        {
          params: {
            index,
            body: {
              aggs: {
                '1': {
                  avg: {
                    field,
                  },
                },
              },
            },
            waitForCompletionTimeout: '5m',
            keepAlive: '5m',
          },
        } as IOpenSearchSearchRequest,
        {}
      );

      return response.ok({
        body: {
          aggs: (res as IOpenSearchSearchResponse).rawResponse.aggregations,
        },
      });
    }
  );
}