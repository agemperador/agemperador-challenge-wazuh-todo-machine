import React from 'react'
import { Container } from './TodoComponent.styles'


const TodoComponet  = ({title,id, status,priority, creationDate, handleEdit,handleDelete,key}) => {
  console.log(id);
  
  return (
    <Container bg={status? "#77AA33" : priority.color} key={key}>
      <h3>{title} -  <span>{creationDate}</span></h3>
      <span onClick={()=>handleEdit(id, {status:!status})}><b>{status? "UNDO" : "COMPLETE"}</b> </span>
      <span onClick={()=>handleEdit(id)}><b>edit</b> </span>
      <span onClick={()=>handleDelete(id)}><b> delete</b></span>
    </Container>
  )
}

export default TodoComponet