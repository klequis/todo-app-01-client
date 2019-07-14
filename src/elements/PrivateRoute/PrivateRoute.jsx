import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

import { green } from 'logger'

// import { isAuthenticated, loginWithRedirect, loginWithPopup } from 'react-auth0-spa'
import { useAuth0 } from 'react-auth0-spa'

const PrivateRoute = ({ component: Component, path, location, ...rest }) => {

  const {
    isAuthenticated, loginWithRedirect, loginWithPopup
  } = useAuth0()

  green('PrivateRoute: loginWithPopup', typeof loginWithPopup)
  green('PrivateRoute: loginWithRedirect', typeof loginWithRedirect)

  useEffect(() => {
    const fn = async () => {
      if (!isAuthenticated) {
        // await loginWithRedirect({
        //   appState: { targetUrl: path }
        // })
        await loginWithPopup({
          appState: { targetUrl: path }
        })
      }
    }
    fn()
  }, [isAuthenticated, loginWithRedirect, path, loginWithPopup])

  green('PrivateRoute: isAuthenticated', isAuthenticated)
  if (!isAuthenticated) return null

  const render = props => <Component {...props} />

  return <Route path={path} render={render} {...rest} />
}

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
  path: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]).isRequired
}

export default withRouter(PrivateRoute)
