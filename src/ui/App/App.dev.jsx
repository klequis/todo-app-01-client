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
import Home from 'ui/Home'

function App() {
  return (
    <div>
      <Router>
        <h1>Hi</h1>
        <NavBar />
        <div>
          <Link to="/todos">Todos</Link>
        </div>
        <Switch>
          <PrivateRoute exact path="/todos" component={Todos} />
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
