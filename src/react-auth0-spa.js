import React, { useState, useEffect, useContext } from 'react'
import createAuth0Client from '@auth0/auth0-spa-js'
import { log } from 'util';

const DEFAULT_REDIRECT_CALLBACK = () =>
  window.history.replaceState({}, document.title, window.location.pathname)

export const Auth0Context = React.createContext()
export const useAuth0 = () => useContext(Auth0Context)



// THIS NEEDS TO BE A PROMISE !!
const auth0Client = async (initOptions) => {
  let client
  if (!client) {
    try {
      client = await createAuth0Client(initOptions)
      console.log('client', client)
    } catch (e) {
      throw new Error('Unable to connect to Auth0')
    }
  }
  
  
  return client
}

export const getTokenSilently = (...p) => auth0Client.getTokenSilently(...p)
export const Auth0Provider = ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  ...initOptions
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState()
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)
  const [popupOpen, setPopupOpen] = useState(false)

  useEffect(() => {
    const initAuth0 = async () => {

      await auth0Client(initOptions)

      if (window.location.search.includes('code=')) {
        // const { appState } = await auth0FromHook.handleRedirectCallback()
        const {
          appState
        } = await auth0Client.handleRedirectCallback()
        onRedirectCallback(appState)
      }

      const isAuthenticated = await auth0Client.isAuthenticated()

      setIsAuthenticated(isAuthenticated)

      if (isAuthenticated) {
        const user = await auth0Client.getUser()
        setUser(user)
      }

      setLoading(false)
    }
    initAuth0()
    // eslint-disable-next-line
  }, [])

  const loginWithPopup = async (params = {}) => {
    setPopupOpen(true)
    try {
      await auth0Client.loginWithPopup(params)
    } catch (error) {
      console.error(error)
    } finally {
      setPopupOpen(false)
    }
    const user = await auth0Client.getUser()
    setUser(user)
    setIsAuthenticated(true)
  }

  const handleRedirectCallback = async () => {
    setLoading(true)
    await auth0Client.handleRedirectCallback()
    const user = await auth0Client.getUser()
    setLoading(false)
    setIsAuthenticated(true)
    setUser(user)
  }
  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        popupOpen,
        loginWithPopup,
        handleRedirectCallback,
        getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
        loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
        getTokenWithPopup: (...p) => auth0Client.getTokenWithPopup(...p),
        logout: (...p) => auth0Client.logout(...p)
      }}
    >
      {children}
    </Auth0Context.Provider>
  )
}
