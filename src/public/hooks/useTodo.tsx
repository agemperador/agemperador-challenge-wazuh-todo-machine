import React, { useState, useEffect } from 'react';
import { Todo } from '../models/Todo.entity';
import { deleteHttp, patchHttp, postHttp } from '../api';


export const useTodos = (http) =>{
    const [todoList, setTodoList] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [localLoad, setLocalLoad] = useState(false);
    const TODO_LOCAL_STORAGE =  "TODO_LIST_V1"
    useEffect(() => {
      console.log("cargando datos...");
      setLoading(true);
      
      fetchData()
  
      console.log("datos cargados");
      setLoading(false);        
    }, [])
  
      const fetchData = async () =>{
        let todoListStorage:Todo[]
  
        try{
          todoListStorage = (await  http.get('/api/plugin/v1/todos')).response
          console.log(todoListStorage);
          saveTodos(todoListStorage)
        }catch(err){
          console.log(err);
          
          alert("It's not possible to load the list of TODOs. Please try again later or use the local saved TODOs in your browser")
          setError(true)
        }
        return todoListStorage
  
      }
  
      const getLocalTodos = ():Todo[] =>{
        return  JSON.parse(localStorage.getItem(TODO_LOCAL_STORAGE))
      }
  
      const saveTodos = (todoList:Todo[]) => {
        setTodoList(todoList)
        localStorage.setItem(TODO_LOCAL_STORAGE, JSON.stringify(todoList))
      }
  
      const deleteTodo = async (id: number ) => { 
        const deleteTodoDb = await deleteHttp(http, '/api/plugin/v1/todo/delete',{id})
        await fetchData()
        /* const newTodoList = todoList.filter((todo) => todo.id!== id)      
        saveTodos(newTodoList) */
      }
  
      const completeTodo =  async (id:number) => {
        try{
          const updateTodoDb = await postHttp(http, '/api/plugin/v1/todo/complete',{id})
          await fetchData()
  /*         const previousTodo :Todo = todoList.find(todo => todo.id === id)
          const updatedTodo = {...previousTodo,completed: !previousTodo.completed}
          const newTodoList = todoList.map((todo) => todo.id === id ? updatedTodo : todo)
          saveTodos(newTodoList) */
        }catch(err){
          setError(true)
          alert("Hubo un error al actualizar el todo, error: "+err.message)
        }
      }
     
  
      const updateTodo = async (id: number, partialTodo : Partial<Todo> | Todo ,todoList:Todo[]) => {
        try{
          console.log("PARTIAL TODO",partialTodo);
          const {title, description,priority,id} = partialTodo
          const updateTodoDb = await patchHttp(http, '/api/plugin/v1/todo',{title, description, priority, id})
          await fetchData()
          /* const previousTodo = todoList.find(todo => todo.id === id)
          const updatedTodo = {...previousTodo,...partialTodo}
          const newTodoList = todoList.map((todo) => todo.id === id ? updatedTodo : todo)
          saveTodos(newTodoList) */
        }catch(err){
          setError(true)
          alert("Hubo un error al actualizar el todo, error: "+err.message)
        }
      }
  
  
    const addTodo = async (todo: Todo, todoList:Todo[]) => {
      
      const {title, priority,description,assignee, deadLineDate} = todo
      console.log({title, priority,description,assignee, deadLineDate});
      
      try{
        const newTodoDb = await postHttp(http, '/api/plugin/v1/todo',{title, priority,description,assignee})
        await fetchData()
        /* const newTodoList = [...todoList, todo]
        saveTodos(newTodoList) */
      }catch (err){
        setError(true)
        alert("Hubo un error al guardar el todo, error: "+err.message)
      }
    }
  
  
     return {
      todoList,
      loading,
      error,
      localLoad,
      addTodo,
      deleteTodo,
      updateTodo,
      completeTodo
     }
  }
  