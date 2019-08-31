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
import DevTools from 'ui/DevTools'
import withStyles from 'react-jss'
import { useAuth0 } from 'react-auth0-spa'
import Toasts from 'ui/Toasts'
import { green } from 'logger'

function App() {
  const { loading } = useAuth0
  green('App')
  if (loading) {
    green('App loading')
    return null
  } else {
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
            {/* <Todos /> */}
            {/* <Route exact path="/" component={Home} /> */}
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App
