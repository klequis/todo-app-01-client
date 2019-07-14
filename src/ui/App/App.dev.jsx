import React from 'react'
import {
  Link,
  Switch,
  Route,
  BrowserRouter as Router /*, Link */
} from 'react-router-dom'
import NavBar from 'ui/NavBar'
import PrivateRoute from 'elements/PrivateRoute'
import Todos from 'ui/Todos'
import Status from 'ui/Status'
import Home from 'ui/Home'
import DevTools from 'ui/DevTools'

function App() {
  return (
    <div>
      <Router>
        <h1>Hi</h1>
        <Status />
        <hr />
        <NavBar />
        <hr />
          
        
        <Switch>
          <PrivateRoute exact path="/todos" component={Todos} />
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
      <DevTools />
    </div>
  )
}

export default App
