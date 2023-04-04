import React, { useState } from 'react';
import { I18nProvider } from '@osd/i18n/react';
import { BrowserRouter as Router } from 'react-router-dom';

import { CoreStart } from '../../../../src/core/public';
import { NavigationPublicPluginStart } from '../../../../src/plugins/navigation/public';

import { PLUGIN_ID, PLUGIN_NAME } from '../../common';
import TodoComponent from './TodoComponent';
import TodoComponentList from './TodoComponentList';
import AddButton from './AddButton';
import LoadingComponent from './LoadingComponent';
import AddTodoModal from './AddTodoModal';

import {EuiFlexGrid}  from '@elastic/eui';
import { useTodos } from '../hooks/useTodo';

interface CustomPluginAppDeps {
  basename: string;
  notifications: CoreStart['notifications'];
  http: CoreStart['http'];
  navigation: NavigationPublicPluginStart;
}



export const CustomPluginApp = ({
  basename,
  notifications,
  http,
  navigation,
}: CustomPluginAppDeps) => {

  
  const [addModalOpen, setAddModalOpen] = useState(false)

  const {todoList, loading, error, deleteTodo, updateTodo, addTodo, completeTodo} = useTodos(http)

  const [editingTodo, setEditingTodo] = useState(-1)

  const handleAddModal = () => { 
    setAddModalOpen(!addModalOpen)
  }

 const handleDeleteTodo = (id,todoList) => {
  deleteTodo(id)
 }

 const handleUpdateTodo = (id, todo, todoList) => {
  updateTodo(id, todo, todoList)
 }

 const handleAddTodo = (todo, todoList) => {
  addTodo(todo, todoList)
 }


console.log(todoList);

  return (
    <Router basename={basename}>
      <I18nProvider>
        <>
        <navigation.ui.TopNavMenu
            appName={PLUGIN_ID}
            showSearchBar={true}
            useDefaultBehaviors={true}
          />
              <div>
                  {addModalOpen || <AddButton renderText={"New To-Do"} color="#006bb8" handleAddModal={handleAddModal}/>}
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
            {
              loading ?
              <LoadingComponent/>
              :
              todoList.length ?
              <>
              <EuiFlexGrid style={{marginLeft:100, marginTop:50}} columns={2} direction="row">
                <TodoComponentList title="Todo">
                  {todoList.filter(todo=>!todo.completed).map(todo=> {
                    
                    return <TodoComponent
                        edit={editingTodo===todo.id}
                        handleEditingTodo={setEditingTodo}
                        key={todo.id}
                        id={todo.id}
                        title={todo.title}
                        priority={ todo.priority?.priority? todo.priority.priority : todo.priority }
                        completed={todo.completed}
                        description={todo.description}
                        creationDate={todo.creationDate?.toString().slice(0, 10)}
                        handleDelete={(id)=>handleDeleteTodo(id,todoList)}
                        handleOnClickEdit={(id)=>setEditingTodo(id)}
                        handleEdit={(id, partialTodo)=>updateTodo(id,partialTodo,todoList)}
                        handleComplete={(id)=> completeTodo(id)}
                        />        }
                        )}
                </TodoComponentList>  
                <TodoComponentList title='Completed'>
                  {todoList.filter(todo=>todo.completed).map(todo=> 
                        <TodoComponent
                        edit={editingTodo===todo.id}
                        handleEditingTodo={setEditingTodo}
                          key={todo.id}
                          id={todo.id}
                          title={todo.title}
                          priority={ todo.priority?.priority? todo.priority.priority : todo.priority }
                          completed={todo.completed}
                          description={todo.description}
                          creationDate={todo.creationDate?.toString().slice(0, 10)}
                          handleOnClickEdit={(id)=>setEditingTodo(id)}
                          handleDelete={(id)=>handleDeleteTodo(id,todoList)}
                          handleEdit={(id, partialTodo)=>updateTodo(id,partialTodo,todoList)}
                          handleComplete={(id)=> completeTodo(id)}
                        />  
                      )}
                      </TodoComponentList>
                </EuiFlexGrid>
            
                </>
                : <h3>Load your first To-Do</h3>
            }
              
        </>
      </I18nProvider>
    </Router>
  );
};
