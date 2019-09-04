import React from 'react'
// import {
  // Link,
  // Switch,
  // Route,
  // BrowserRouter as Router /*, Link */
// } from 'react-router-dom'
// import NavBar from 'ui/NavBar'
// import PrivateRoute from 'elements/PrivateRoute'
import Todos from 'ui/Todos'
import Status from 'ui/Status'
import Login from 'ui/Login'
import DevTools from 'ui/DevTools'
import withStyles from 'react-jss'
import { useAuth0 } from 'react-auth0-spa'
import Toasts from 'ui/Toasts'

function App({ classes }) {
  const { loading, isAuthenticated } = useAuth0()
  if (loading) {
    return <h1>Loading</h1>
  }

  return (
    // <Router>
      <div className={classes.wrapper}>
        <Toasts />
        <Login />
        <Status />
        {/* <Switch> */}
          {/* <Route
            path="/"
            render={() =>
              isAuthenticated 
                ? <Todos />
                : null
            }
          /> */}
          {
            isAuthenticated
              ? <Todos />
              : null
          }
        {/* </Switch> */}
        <DevTools />
      </div>
    // </Router>
  )
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
