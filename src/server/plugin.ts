import {
  PluginInitializerContext,
  CoreSetup,
  CoreStart,
  Plugin,
  Logger,
} from '../../../src/core/server';
import { priorities } from '../public/models/Priority.entity';
import { Todo } from '../public/models/Todo.entity';
import { schema } from '@osd/config-schema';

import { CustomPluginPluginSetup, CustomPluginPluginStart, } from './types';
import { completeTodo, getAllTodos, saveTodo, softDeleteTodo, updateTodo } from './services/todo_service';
import { addTodoSchema, todoSchema, updateTodoSchema } from './schemas/todo';

// Optional client certificates if you don't want to use HTTP basic authentication.
// var client_cert_path = '/full/path/to/client.pem'
// var client_key_path = '/full/path/to/client-key.pem'



const INDEX_NAME = 'todo'

export class CustomPluginPlugin
  implements Plugin<CustomPluginPluginSetup, CustomPluginPluginStart> {
  private readonly logger: Logger;

  constructor(initializerContext: PluginInitializerContext) {
    this.logger = initializerContext.logger.get();
  }

  public setup(  core: CoreSetup) {

   
    this.logger.debug('custom_plugin: Setup');
    const router = core.http.createRouter();
    
    const client = core.opensearch.legacy.client.client
   
    

    // Register server side APIs
    router.get(
        {
          path:'/api',
          validate: false,
        }
        , async (context, req, res) => {
      console.log('custom_plugin: GET /api')
      return res.ok({
        body:{
          message:"Online plugin",
        }
      })
    });

    router.post(
      {
        path:'/api/indices',
        validate: false,
      },
      async (context, req, res) => {
        var index_name = INDEX_NAME;

        var settings = {
          settings: {
            index: {
              number_of_shards: 4,
              number_of_replicas: 3,
            },
          },
        };
    
        var response = client.indices.create({
          index: index_name,
          body: settings,
        }).then(response => response) 
    
        return res.ok({
          body:{
            response,
          }
        })
      })

      router.get(
        {
          path:'/api/plugin/v1/todos',
          validate: false,
        },
        async (context, req, res) => {
          var index_name = INDEX_NAME;
          
          
          const response = await  getAllTodos(client, index_name)
      
          return res.ok({
            body:{
              response,
            }
          })
        })

        router.post(  
          {
            path:'/api/plugin/v1/todo',
            validate: {
              body:addTodoSchema
            },
          },
          async (context, req, res) => {
            console.log(req);
            
            const todoDto = req.body
           
            
            const response = await saveTodo(todoDto,client, INDEX_NAME)

            return res.ok({
              body:{
                response,
              }
            })

          }
        )
        
        router.post( 
          {
            path:'/api/plugin/v1/todo/delete',
            validate:{
              body: schema.object({
                id: schema.number(),
              })
            } 
          },
          async (context, req, res) => {

            const id = req.body.id
            console.log(id);
            
            
            const response = await softDeleteTodo(id, client, INDEX_NAME)
            return res.ok({
              body:{
                response,
              }
            })
          }
        )

        router.patch( 
          {
            path:'/api/plugin/v1/todo',
            validate:{
              body: updateTodoSchema
            } 
          },
          async (context, req, res) => {

            const todo = req.body
            console.log(req);
            
            console.log(todo);
            
            
            const response = await updateTodo(todo, client, INDEX_NAME)
            return res.ok({
              body:{
                response,
              }
            })
          }
        )

        router.post( 
          {
            path:'/api/plugin/v1/todo/complete',
            validate:{
              body: schema.object({
                id: schema.number(),
              })
            } 
          },
          async (context, req, res) => {

            const id = req.body.id
            console.log(id);
            
            
            const response = await completeTodo(id, client, INDEX_NAME)
            return res.ok({
              body:{
                response,
              }
            })
          }
        )
    return {};
  }

  public start(core: CoreStart) {
    this.logger.debug('custom_plugin: Started');
    

    return {};
  }

  public stop() {
    
  }
}
