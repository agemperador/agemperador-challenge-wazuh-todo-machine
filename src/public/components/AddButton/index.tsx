import React from 'react'

const AddButton = ({handleAddModal, renderText,...props}) => {
  return (
    <div onClick={handleAddModal}>
      {renderText}
    </div>
  )
}

export default AddButton