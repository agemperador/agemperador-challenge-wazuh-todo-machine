import React, { useState } from 'react'
import { Container } from './TodoComponent.styles'
import './styles.scss'
import {
  EuiIcon,EuiCard, EuiFlexItem, EuiFlexGroup,EuiForm,EuiFormRow,EuiFieldText,EuiText,EuiLink,EuiSelect,EuiBadge,EuiPanel,EuiButton
} from '@elastic/eui';
import { Todo } from '../../models/Todo.entity';
import { priorities } from '../../models/Priority.entity';




const TodoComponent  = ({title,id,
   completed,priority, creationDate,
    description, handleEdit,handleDelete, 
    handleComplete,key, edit,handleOnClickEdit,
    handleEditingTodo}) => {
  

  const [todoEdited, setTodoEdited] = useState(new Todo({title,id,completed,priority,creationDate,description}))

  const options =  [
    { value: 'PERSONAL', text: 'Personal' },
    { value: 'LOW', text: 'Low' },
    { value: 'MEDIUM', text: 'Medium' },
    { value: 'HIGH', text: 'High' },
  ]
  
  const optionObject = {
    "PERSONAL": options[0],
    "MEDIUM": options[1],
    "NORMAL": options[2],
    "HIGH": options[3],
  }

  const cardFooterContent = (
    <div className='footer-container'>
    <div className='buttons-container'>
      <span onClick={()=>handleComplete(id)}>
        {completed? <EuiIcon color="#00AA00" type="checkInCircleFilled" /> :<EuiIcon type="check" /> } 
      </span>
      <span onClick={()=>handleOnClickEdit(id)}>
        {<EuiIcon type="pencil" />}
      </span>
      <span onClick={()=>handleDelete(id)}>
        {<EuiIcon type="trash" />}
      </span>
    </div>
    <div className='date-container'>
      <span>{creationDate}</span>
    </div>  
  </div>
  );

    
  const handleChangeValue =(e,property)=>{  
    e.preventDefault();    
    setTodoEdited({...todoEdited, [property]:e.target.value})
  }

  const handleSubmmit =(e) =>{
    e.preventDefault()
    handleEditingTodo(-1)
    handleEdit(todoEdited.id,todoEdited)
  }
  if (edit){
    return <EuiPanel>
            <EuiForm component="form">
                  <EuiFormRow label="Title" helpText="Title of to-do">
                    <EuiFieldText onChange={(e)=>handleChangeValue(e, "title")} value={todoEdited.title} name="first" />
                  </EuiFormRow>
                  <EuiFormRow
                  label="Priority"
                  >
                  <EuiSelect
                    value={optionObject[priority.toUpperCase()]?.value}
                    options={options}
                    name="priority"
                    onChange={(e)=>handleChangeValue(e, "priority")}
                  />
                </EuiFormRow>
                <EuiFormRow label="Description" helpText="Description of the to-do">
                  <EuiFieldText onChange={(e)=>handleChangeValue(e, "description")} value={todoEdited.description} name="first" />
                </EuiFormRow>
                <EuiFormRow label="Assignee" helpText="Assignee of the to-do">
                  <EuiFieldText onChange={(e)=>handleChangeValue(e, "assignee")} value={todoEdited.assignee} name="first" />
                </EuiFormRow>
                <EuiFlexItem style={{flexDirection:'row', justifyContent:"space-between", margin:15}}>
                  <EuiButton type="submit" onClick={handleSubmmit} fill>
                    Save Todo
                  </EuiButton>
                
                  <EuiButton color="danger" onClick={()=>handleEditingTodo(-1)} fill>
                    Cancel
                  </EuiButton>
                </EuiFlexItem>
              </EuiForm>
          </EuiPanel>
  }else{
  return (
    <EuiFlexGroup gutterSize="l" key={key}>
      <EuiFlexItem   style={{ maxWidth: 400, minWidth:400, margin:20, height:200}}>
              <EuiCard
                size='l'
                textAlign="left"
                title={
                  <EuiFlexItem style={{width:"100%",flexDirection:"row", justifyContent:"space-between"}}>
                    <EuiText  size="s">
                      {title}
                    </EuiText>
                    <EuiBadge color={priorities[priority.toUpperCase()]?.color}>{priority}</EuiBadge>
          
                  </EuiFlexItem>
                }
                description={
                  <EuiText style={{marginTop:15}}  size="s">
                      {description}
                    </EuiText>
                }
                footer={cardFooterContent}
              />
      </EuiFlexItem>
    </EuiFlexGroup>
  )}
    {/* <Container bg={completed? "#77AA33" : priority.color} key={key}>

      <div className='main-content'>
        <h3>{title}</h3>
      </div>

      <div className='footer-container'>
        <div className='buttons-container'>
          <span onClick={()=>handleComplete(id)}>
            {completed? <EuiIcon type="checkInCircleFilled" /> :<EuiIcon type="check" /> } 
          </span>
          <span onClick={()=>handleEdit(id)}>
            {<EuiIcon type="pencil" />}
          </span>
          <span onClick={()=>handleDelete(id)}>
            {<EuiIcon type="trash" />}
          </span>
        </div>
        <div className='date-container'>
          <span>{creationDate}</span>
        </div>  
      </div>
    </Container> */}
  
}

export default TodoComponent