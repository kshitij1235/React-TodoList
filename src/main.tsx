import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import DisplayTask from './components/Tasks'
import 'bootstrap/dist/css/bootstrap.css'
import NavigationBar from './components/Navigation'
import TaskView from './components/Tasks'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  
  <React.StrictMode>
    <NavigationBar></NavigationBar>
    <TaskView></TaskView>
  </React.StrictMode>,
)
