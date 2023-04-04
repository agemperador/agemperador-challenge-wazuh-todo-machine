import React from 'react'
import {EuiFlexGrid,EuiIcon,EuiText,EuiFlexItem}  from '@elastic/eui';


const AddButton = ({handleAddModal,...props}) => {
  return <EuiFlexGrid style={{width:300, padding:"25px ", margin:"auto"}}>
          <EuiFlexItem onClick={handleAddModal}>
            <EuiText><h3>New To-Do</h3></EuiText>
          </EuiFlexItem>
          <EuiFlexItem onClick={handleAddModal} style={{alignItems:"center", justifyContent:"center"}}>
            <EuiIcon  size="xl" color="#006bb8" type="plusInCircleFilled" />
          </EuiFlexItem>
        </EuiFlexGrid>
      
      
  
}

export default AddButton