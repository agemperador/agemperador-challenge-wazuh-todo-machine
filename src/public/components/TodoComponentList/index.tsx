import React from 'react'
import './styles.scss'

const TodoComponentList = (props) => {
  return (
    <div className="container">{props.children}</div>
  )
}

export default TodoComponentList