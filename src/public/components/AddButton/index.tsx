import React from 'react'
import {EuiFlexGrid,EuiIcon,EuiText,EuiFlexItem}  from '@elastic/eui';


const AddButton = ({handleAddModal, color, renderText,...props}) => {
  return <EuiFlexGrid style={{width:300, padding:"25px ", margin:"auto"}}>
          <EuiFlexItem onClick={handleAddModal}>
            <EuiText><h3>{renderText}</h3></EuiText>
          </EuiFlexItem>
          <EuiFlexItem onClick={handleAddModal} style={{alignItems:"center", justifyContent:"center"}}>
            <EuiIcon  size="xl" color={color} type="plusInCircleFilled" />
          </EuiFlexItem>
        </EuiFlexGrid>
      
      
  
}

export default AddButton