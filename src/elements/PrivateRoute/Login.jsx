/*

going to create a login component that has the log in effect from PrivateRoute in it 
and the in PrivateRoute, wrap the call to this component in an if(path === location.path)


*/

import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'

const Login = (path) => {
  const { isAuthenticated, loginWithRedirect } = useAuth0()

  useEffect(() => {
    const fn = async () => {
      if (!isAuthenticated) {
        await loginWithRedirect({
          appState: { targetUrl: path }
        })
      }
    }
    fn()
  }, [isAuthenticated, loginWithRedirect, path])

  // if (!isAuthenticated) return null
  return null
}
