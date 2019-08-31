import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import { useAuth0 } from 'react-auth0-spa'
import { withRouter } from 'react-router-dom'

// import { green } from 'logger'

const PrivateRoute = ({ component: Component, path, location, ...rest }) => {
  const { isAuthenticated, loginWithRedirect } = useAuth0()

  // green('PrivateRoute: isAuthenticated', isAuthenticated)
  // green('path', path)
  // green('rest', rest)
  
  // Seems pathsMatch logic was not needed. Problem was in App.dev where I
  //   spelled 'switch' lowercase instead of 'Switch' uppercase.
  // const pathsMatch = path === location.pathname
  // green(`${path} === ${location.pathname} is ${pathsMatch}`)

  useEffect(() => {
    const fn = async () => {
      // if (pathsMatch && !isAuthenticated) {
      if (!isAuthenticated) {
        await loginWithRedirect({
          // appState: { targetUrl: path }
        })
      }
    }
    fn()
  }, [isAuthenticated, loginWithRedirect, path])

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
