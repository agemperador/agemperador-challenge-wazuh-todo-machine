import { priorities } from "../../public/models/Priority.entity";
import { Todo } from "../../public/models/Todo.entity";


export const getLastIndex = async  (client, index) =>{

    return await client.search({
        index: index,
        body: {
            query: {
                match_all: {},
            },
            size: 0,
            aggs: {
                max_id: {
                max: {
                    field: 'id',
                },
                },
            },
        },
    }).then((response) =>{
        const lastId = response.aggregations.max_id.value;
        return lastId +1
    } )
    .catch((err) =>{
        console.log(err);
        throw new Error(err);
    })
}


export const getAllTodos = async (client, index) =>{
    const todos = await client.search({
        index: index,
        body: {
            query: {
                bool: {
                    should: [
                        {
                        term: {
                            deleted: false,
                        },
                        },
                        {
                        bool: {
                            must_not: {
                            exists: {
                                field: 'deleted',
                            },
                            },
                            must:{
                                exists:{
                                    field: 'priority',
                                }
                            }
                        },
                        },
                    ],
                }
            },
            size:25
        }
    }).then((response) =>{
        console.log(response.hits.hits);
        
        return response.hits.hits.map(todos => todos._source);
    })
    console.log(todos);
    return todos
}

export const getTodoById = async (client, index, id) =>{
    return await client.get({
        index: index,
        id: id,
    }).then((response) =>{
        console.log(response);
        return response._source;
    })
}

export const createTodo = async  (todoDto,id) =>{
    const newTodo = {...todoDto, id:id, priority: priorities[todoDto.priority.toUpperCase()]}
    console.log(newTodo);
    return new Todo(newTodo);
}

export const saveTodo = async (todoDto, client, index)=>{
    
    const id = await getLastIndex(client, index)

    const todo = await createTodo(todoDto, id)
    console.log("GUARDADO",todo);

    var response = await client.index({
        id: todo.id,
        index:index,
        body:todo,
        refresh: true,
    });
    console.log(response);
    

    return response;
}

export const completeTodo = async (id,client,index) =>{
    const todo = await getTodoById(client,index,id)
    const completedTodo = {
        ...todo,
        completed:!todo.completed,    
        priority: todo.priority.priority? todo.priority :  priorities[todo.priority.toUpperCase()],
    }
    
    
    var response = await client.index({
        id, 
        index,
        body:completedTodo,
        refresh: true,
    });   
    
    return response;
    
}

export const updateTodo = async (todo, client, index)=>{
    const id = todo.id;

    console.log(id);
    
    const updatedTodo = {...todo, priority:priorities[todo.priority.toUpperCase()]}
    console.log(updatedTodo);
    
    var response = await client.index({
        id, 
        index,
        body:updatedTodo,
        refresh: true,
    });

    return response;
}

export const hardDeleteTodo = async (id, client, index)=>{
    var response = await client.delete({
        id,
        index,
        refresh: true,
    });
    return response;
}

export const softDeleteTodo = async (id, client, index)=>{

    let todo;
    try{
        todo = await getTodoById(client,index, id);
    } catch(err) {
        return {
            error:err.status,
            message:err.message
        }
    }

    console.log(todo);

    const deletedTodo = {
        ...todo,
        priority: todo.priority.priority? todo.priority :  priorities[todo.priority.toUpperCase()],
        deleted:true
    }
    console.log(deletedTodo);
    
    var response = await client.index({
        id, 
        index,
        body:deletedTodo,
        refresh: true,
    });    
    console.log(response);
    
    return response;
}
