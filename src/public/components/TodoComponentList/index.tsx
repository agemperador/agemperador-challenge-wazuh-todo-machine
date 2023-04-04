import React from 'react'
import './styles.scss'
import {EuiFlexGrid,EuiPanel, EuiTitle} from '@elastic/eui';

const TodoComponentList = (props) => {
  return (
     <EuiFlexGrid columns={1} style={{marginLeft:100}} direction="column">
        <EuiTitle size="m">
          <h2>{props.title}</h2>
        </EuiTitle>
        <EuiPanel paddingSize="s">
          {props.children}
        </EuiPanel>
      </EuiFlexGrid>
  )
}

export default TodoComponentList