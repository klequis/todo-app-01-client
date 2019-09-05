import React from 'react'
// import {
  // Link,
  // Switch,
  // Route,
  // BrowserRouter as Router /*, Link */
// } from 'react-router-dom'
// import NavBar from 'ui/NavBar'
// import PrivateRoute from 'elements/PrivateRoute'
import { createGlobalStyle } from 'styled-components'
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
      <div id='App' className={classes.wrapper}>
        <GlobalStyle />
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
    marginTop: 50,
    //
    backgroundColor: 'red'
  },
  add: {
    marginBottom: 50
  }
}

export default withStyles(styles)(App)



const GlobalStyle = createGlobalStyle`
  html: {
      boxSizing: 'border-box',
      WebkitFontSmoothing: 'antialiased', // Antialiasing.
      MozOsxFontSmoothing: 'grayscale', // Antialiasing.
      fontSize: '12pt'
    },
  body: {
      margin: 0,
      fontFamily: '"Lato", sans-serif',
      fontSize: '1rem',
      fontWeight: 300,
      lineHeight: 1.65,
      webkitTextSizeAdjust: 'none',
      msOverflowStyle: 'scrollbar',
      backgroundColor: '#232c35',
      color: 'white',
      '@media print': {
        backgroundColor: 'white',
        minWidth: 320
      }
    },
    'h1, h2, h3, h4, h5, h6': {
      fontFamily: '"Roboto", sans-serif'
    },
    '*, *::before, *::after': {
      boxSizing: 'inherit'
    },
    p: {
      margin: 0
    }
`