import React, { useState, useEffect } from 'react';
import { i18n } from '@osd/i18n';
import { FormattedMessage, I18nProvider } from '@osd/i18n/react';
import { BrowserRouter as Router } from 'react-router-dom';

import {
  EuiButton,
  EuiHorizontalRule,
  EuiPage,
  EuiPageBody,
  EuiListGroup,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageContentHeader,
  EuiPageHeader,
  EuiTitle,
  EuiText,
} from '@elastic/eui';

import { CoreStart } from '../../../../src/core/public';
import { NavigationPublicPluginStart } from '../../../../src/plugins/navigation/public';

import { PLUGIN_ID, PLUGIN_NAME } from '../../common';
import TodoComponet from './TodoComponent';
import TodoComponentList from './TodoComponentList';

interface CustomPluginAppDeps {
  basename: string;
  notifications: CoreStart['notifications'];
  http: CoreStart['http'];
  navigation: NavigationPublicPluginStart;
}


const todoListMock = [
  {
    id: 1,
    title: 'Learn React',
    completed: false,
    creationDate: new Date()
  },
  {
    id: 2,
    title: 'Learn Redux',
    completed: false,
    creationDate: new Date()
  },
  {
    id: 3,
    title: 'Learn ES6',
    completed: false,
    creationDate: new Date()
  },
  {
    id: 4,
    title: 'Learn Node',
    completed: false,
    creationDate: new Date()
  }
]

export const CustomPluginApp = ({
  basename,
  notifications,
  http,
  navigation,
}: CustomPluginAppDeps) => {
  // Use React hooks to manage state.
  //const [timestamp, setTimestamp] = useState<string | undefined>();
/* 
  const onClickHandler = () => {
    // Use the core http service to make a response to the server API.
    http.get('/api/custom_plugin/example').then((res) => {
      setTimestamp(res.time);
      // Use the core notifications service to display a success message.
      notifications.toasts.addSuccess(
        i18n.translate('customPlugin.dataUpdated', {
          defaultMessage: 'Data updated',
        })
      );
    });
  }; */

  // Render the application DOM.
  // Note that `navigation.ui.TopNavMenu` is a stateful component exported on the `navigation` plugin's start contract.

  const [todoList, setTodoList] = useState([])


  console.log("HOLLAAAAA");

  console.log("HOLLAAAAAaaaaa");


  useEffect(() => {
        console.log("cargando datos");
        setTodoList( todoListMock)
        console.log("datos cargados");
    }
  , [])
  


  const handleDeleteTodo = (id: number ) => { 
    console.log("DELETE " + id);
  }
  const handleEditTodo = (id: number ) => { 
    console.log("EDIT " + id);
  }


  return (
    <Router basename={basename}>
      <I18nProvider>
        <>
        <navigation.ui.TopNavMenu
            appName={PLUGIN_ID}
            showSearchBar={true}
            useDefaultBehaviors={true}
          />
          
          <div>
            {todoList.map(todo=> {
              return (
                <TodoComponentList>
                  <TodoComponet
                    key={todo.id}
                    id={todo.id}
                    title={todo.title}
                    completed={todo.completed}
                    creationDate={todo.creationDate}
                    handleDelete={handleDeleteTodo}
                    handleEdit={handleEditTodo}
                  />
                </TodoComponentList>
              )
            })}
          </div>
{/*           <navigation.ui.TopNavMenu
            appName={PLUGIN_ID}
            showSearchBar={true}
            useDefaultBehaviors={true}
          />
          <EuiPage restrictWidth="1000px">
            <EuiPageBody component="main">
              <EuiPageHeader>
                <EuiTitle size="l">
                  <h1>
                    <FormattedMessage
                      id="customPlugin.helloWorldText"
                      defaultMessage="{name}"
                      values={{ name: PLUGIN_NAME }}
                    />
                  </h1>
                </EuiTitle>
              </EuiPageHeader>
              <EuiPageContent>
                <EuiPageContentHeader>
                  <EuiTitle>
                    <h2>
                      <FormattedMessage
                        id="customPlugin.congratulationsTitle"
                        defaultMessage="Congratulations, you have successfully created a new OpenSearch Dashboards Plugin!"
                      />
                    </h2>
                  </EuiTitle>
                </EuiPageContentHeader>
                <EuiPageContentBody>
                  <EuiText>
                    <p>
                      <FormattedMessage
                        id="customPlugin.content"
                        defaultMessage="Look through the generated code and check out the plugin development documentation."
                      />
                    </p>
                    <EuiHorizontalRule />
                    <p>
                      <FormattedMessage
                        id="customPlugin.timestampText"
                        defaultMessage="Last timestamp: {time}"
                        values={{ time: timestamp ? timestamp : 'Unknown' }}
                      />
                    </p>
                    <EuiButton type="primary" size="s" onClick={onClickHandler}>
                      <FormattedMessage id="customPlugin.buttonText" defaultMessage="Get data" />
                    </EuiButton>
                  </EuiText>
                </EuiPageContentBody>
              </EuiPageContent>
            </EuiPageBody>
          </EuiPage> */}
        </>
      </I18nProvider>
    </Router>
  );
};
