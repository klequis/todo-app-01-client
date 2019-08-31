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
import withStyles from 'react-jss'
import { useAuth0 } from 'react-auth0-spa'
import Toasts from 'ui/Toasts'

function App({ classes }) {
  const { loading } = useAuth0()
  if (loading) {
    return <h1>Loading</h1>
  } else {
    return (
      <>
        <Toasts />
        <div className={classes.wrapper}>
        <Router>
          <Status />
          <NavBar />
          <div>
            <Link to="/todos">Todos</Link>
          </div>
          <Switch>
            <PrivateRoute exact path="/todos" component={Todos} />
            <Route exact path="/" component={Home} />
          </Switch>
        </Router>
      <DevTools />
    </div>
    </>
    )
  }
}

const styles = {
  wrapper: {
    minHeight: '100vh',
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
    marginTop: 50
  },
  add: {
    marginBottom: 50
  }
}

export default withStyles(styles)(App)
