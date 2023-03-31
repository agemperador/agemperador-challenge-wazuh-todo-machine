import React from 'react'
import './styles.scss'

const TodoComponet = ({title,id, handleEdit,handleDelete}) => {
  return (
    <div className="container">
      <h3>{title}</h3>
      <span onClick={()=>handleEdit(id)}>edit </span>
      <span onClick={()=>handleDelete(id)}> delete</span>
    </div>
  )
}

export default TodoComponet