import React from 'react'
import './styles.scss'

const TodoComponentList = ({children}) => {
  return (
    <div className="container">{children}</div>
  )
}

export default TodoComponentList