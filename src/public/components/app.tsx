import React, { useState, useEffect } from 'react';
import { i18n } from '@osd/i18n';
import { FormattedMessage, I18nProvider } from '@osd/i18n/react';
import { BrowserRouter as Router } from 'react-router-dom';
import {http} from 

import { CoreStart } from '../../../../src/core/public';
import { NavigationPublicPluginStart } from '../../../../src/plugins/navigation/public';

import { PLUGIN_ID, PLUGIN_NAME } from '../../common';
import TodoComponet from './TodoComponent';
import TodoComponentList from './TodoComponentList';
import { priorities } from '../models/Priority.entity';
import AddButton from './AddButton';
import LoadingComponent from './LoadingComponent';
import AddTodoModal from './AddTodoModal';
import { Todo } from '../models/Todo.entity';

interface CustomPluginAppDeps {
  basename: string;
  notifications: CoreStart['notifications'];
  http: CoreStart['http'];
  navigation: NavigationPublicPluginStart;
}


const todoListMock: Todo[] = [
  {
    id: 1,
    title: 'Learn React',
    completed: false,
    creationDate: new Date(),
    priority: priorities.HIGH
  },
  {
    id: 2,
    title: 'Learn Redux',
    completed: false,
    creationDate: new Date(),
    priority: priorities.MEDIUM
  },
  {
    id: 3,
    title: 'Learn ES6',
    completed: false,
    creationDate: new Date(),
    priority: priorities.LOW
  },
  {
    id: 4,
    title: 'Learn Node',
    completed: false,
    creationDate: new Date(),
    priority: priorities.HIGH
  }
]

export const CustomPluginApp = ({
  basename,
  notifications,
  http,
  navigation,
}: CustomPluginAppDeps) => {
  // Use React hooks to manage state.
  //const [timestamp, setTimestamp] = useState<string | undefined>();
/* 
  const onClickHandler = () => {
    // Use the core http service to make a response to the server API.
    http.get('/api/custom_plugin/example').then((res) => {
      setTimestamp(res.time);
      // Use the core notifications service to display a success message.
      notifications.toasts.addSuccess(
        i18n.translate('customPlugin.dataUpdated', {
          defaultMessage: 'Data updated',
        })
      );
    });
  }; */

  // Render the application DOM.
  // Note that `navigation.ui.TopNavMenu` is a stateful component exported on the `navigation` plugin's start contract.

  const [todoList, setTodoList] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [addModalOpen, setAddModalOpen] = useState(false)


  console.log("HOLLAAAAA");

  console.log("HOLLAAAAAaaaaa");

  useEffect(() => {
    http.get('/get'

    const data = fetch('/api', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => console.log(response))
    
    console.log(data);
    
  })

  useEffect(() => {
        console.log("cargando datos...");
        setLoading(true);
        setTimeout(() => { 

          const todoListStorage = localStorage.getItem("TODO_LIST_V1")
          if (todoListStorage) {
            console.log(todoListStorage);
            setTodoList(JSON.parse(todoListStorage))
            console.log("Cargando de logalStorage");
          } else {
            setTodoList( todoListMock);
            localStorage.setItem("TODO_LIST_V1", JSON.stringify(todoListMock))
            console.log("Cargando de Mock");
            
          }
          console.log("datos cargados");
          setLoading(false);
        },1000)
    }
  , [])
  

  const saveTodos = (todoList:Todo[]) => {
    setTodoList(todoList)
    localStorage.setItem("TODO_LIST_V1", JSON.stringify(todoList))
  }

  const handleDeleteTodo = (id: number, todoList:Todo[] ) => { 
    const newTodoList = todoList.filter((todo) => todo.id!== id)
    saveTodos(newTodoList)
  }
  const handleEditTodo = (id: number, partialTodo : Partial<Todo> | Todo ,todoList:Todo[]) => { 
    const previousTodo = todoList.find(todo => todo.id === id)
    const updatedTodo = {...previousTodo,...partialTodo}
    const newTodoList = todoList.map((todo) => todo.id === id ? updatedTodo : todo)
    saveTodos(newTodoList)
  }
  const handleAddModal = () => { 
    setAddModalOpen(!addModalOpen)
  }

  const getId =(todoList) =>{
    return todoList.reduce((max,todo)=> Math.max(todo.id, max),0) + 1
  }

  const handleAddTodo = (todo: Todo, todoList:Todo[]) => {
    todo.id = getId(todoList)
    console.log(todo.id);
    
    const newTodoList = [...todoList, todo]
    saveTodos(newTodoList)
  }

  return (
    <Router basename={basename}>
      <I18nProvider>
        <>
        <navigation.ui.TopNavMenu
            appName={PLUGIN_ID}
            showSearchBar={true}
            useDefaultBehaviors={true}
          />
            {
              loading?
              <LoadingComponent/>
              :
              <div>
                  {todoList.map(todo=> {
                    return (
                      <TodoComponentList>
                        {<TodoComponet
                          key={todo.id}
                          id={todo.id}
                          title={todo.title}
                          priority={todo.priority}
                          status={todo.status}
                          creationDate={todo.creationDate.toString()}
                          handleDelete={(id)=>handleDeleteTodo(id,todoList)}
                          handleEdit={(id, partialTodo)=>handleEditTodo(id,partialTodo,todoList)}
                        />}
                      </TodoComponentList>
                    )
                  })}
                <div>
                  <AddButton renderText={addModalOpen? "CLOSE": "ADD"} handleAddModal={handleAddModal}/>
                </div>
                {
                  addModalOpen && 
                    <div>
                      <AddTodoModal
                        onSave={(todo)=>handleAddTodo(todo,todoList)}
                        open={addModalOpen}
                        onClose={() => setAddModalOpen(false)}
                      />
                    </div>
                }
              </div>
              
            }
        </>
      </I18nProvider>
    </Router>
  );
};
