import React from 'react'
import Select from 'react-select'
import { priorities } from '../../models/Priority.entity'
import { Todo } from '../../models/Todo.entity'
import { useState } from 'react'



const AddTodoModal = ({onClose, onSave, open}) => {
  const [todo, setTodo] = useState(new Todo())
  
  const handleSaveTodo = () =>{
    onSave(todo)
    onClose()
  }

  const handleChangeTitle = (e) =>{
    setTodo({...todo, title: e.target.value.trim()})
  }
  const handleChangePriority = (option) =>{
    setTodo({...todo, priority: option })
  };


  const options =[
    { value: priorities.PERSONAL.priority, label: 'Personal', entity:priorities.PERSONAL },
    { value: priorities.HIGH.priority, label: 'High' , entity:priorities.HIGH},
    { value: priorities.MEDIUM.priority, label: 'Medium' , entity:priorities.MEDIUM},
    { value: priorities.LOW.priority, label: 'Low', entity:priorities.LOW },
  ]

  return (
    <div >
      <h1>Add Todo</h1>
      <input onChange={handleChangeTitle} type="text" />
      <select >
        {options.map((option) => (
          <option
            key={option.value} 
            value={option.value}
            onClick={()=>handleChangePriority(option.entity)}
            >
              {option.label}
          </option>
        ))}
      </select>

      <button onClick={handleSaveTodo}>Add Todo</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  )
}

export default AddTodoModal