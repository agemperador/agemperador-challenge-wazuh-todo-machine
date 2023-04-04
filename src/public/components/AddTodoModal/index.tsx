import React from 'react'
import Select from 'react-select'
import { priorities } from '../../models/Priority.entity'
import { Todo } from '../../models/Todo.entity'
import { useState } from 'react'
import {
  EuiIcon,EuiCard, EuiFlexItem, EuiFlexGroup,EuiForm,EuiFormRow,EuiFieldText,EuiText,EuiLink,EuiSelect,EuiBadge,EuiPanel,EuiButton
} from '@elastic/eui';


const AddTodoModal = ({onClose, onSave, open}) => {
  const [todo, setTodo] = useState(new Todo())
  

  const handleChangeValue =(e,property)=>{  
    e.preventDefault();    
    setTodo({...todo, [property]:e.target.value})
  }
  
  const handleSubmmit =(e) =>{
    e.preventDefault()
    onSave(todo)
    onClose()
  }

  const options =[
    { value: priorities.PERSONAL.priority, label: 'Personal', entity:"PERSONAL" },
    { value: priorities.HIGH.priority, label: 'High' , entity:"HIGH"},
    { value: priorities.MEDIUM.priority, label: 'Medium' , entity:"MEDIUM"},
    { value: priorities.LOW.priority, label: 'Low', entity:"LOW" },
  ]


  
  const optionObject = {
    "PERSONAL": options[0],
    "MEDIUM": options[1],
    "NORMAL": options[2],
    "HIGH": options[3],
  }


  return <EuiPanel style={{width:500,margin:"auto"}}>
  <EuiForm component="form">
          <EuiText><h2>Add To-Do</h2></EuiText> 
        <EuiFormRow label="Title" helpText="Title of to-do">
          <EuiFieldText onChange={(e)=>handleChangeValue(e, 'title')} value={todo.title} name="first" />
        </EuiFormRow>
        <EuiFormRow
        label="Priority"
        >
        <EuiSelect
          value={optionObject[todo.priority.toUpperCase()]?.value}
          options={options}
          name="priority"
          onChange={(e)=>handleChangeValue(e, 'priority')}
        />
      </EuiFormRow>
      <EuiFormRow label="Description" helpText="Description of the to-do">
        <EuiFieldText onChange={(e)=>handleChangeValue(e, "description")} value={todo.description} name="first" />
      </EuiFormRow>
      <EuiFormRow label="Assignee" helpText="Assignee of the to-do">
        <EuiFieldText onChange={(e)=>handleChangeValue(e, "assignee")} value={todo.assignee} name="first" />
      </EuiFormRow>
      <EuiFlexItem style={{flexDirection:'row', justifyContent:"space-between", margin:15}}>
        <EuiButton type="submit" onClick={handleSubmmit} fill>
          Add Todo
        </EuiButton>
      
        <EuiButton color="danger" onClick={onClose} fill>
          Cancel
        </EuiButton>
      </EuiFlexItem>
    </EuiForm>
</EuiPanel>
/* 
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
  ) */
}

export default AddTodoModal