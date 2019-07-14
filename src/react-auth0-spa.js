/* eslint-disable */

import React, { useEffect, useState, useContext } from 'react'
import createAuth0Client from '@auth0/auth0-spa-js'

import { pink, blue, yellow } from 'logger'

const DEFAULT_REDIRECT_CALLBACK = () =>
  window.history.replaceState({}, document.title, window.location.pathname)

export const Auth0Context = React.createContext()
export const useAuth0 = () => useContext(Auth0Context)

let _initOptions
const setInitOptions = options => {
  _initOptions = options
}
const getInitOptions = () => {
  return _initOptions
}

const getAuth0Client = async () => {
  let client
  if (!client) {
    try {
      client = await createAuth0Client(getInitOptions())
    } catch (e) {
      throw new Error('auth0Client ERROR: could not create client', e)
    }
  }

  if (window.location.search.includes('code=')) {
    const { appState } = await client.handleRedirectCallback()
    getOnRedirectCallback()(appState)
  }

  return client
}

export const getTokenSilently = async (...p) => {
  const client = await getAuth0Client()
  return await client.getTokenSilently(...p)
}


// ************
// Entry point
// ************

export const Auth0Provider = ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  ...initOptions
}) => {
  // yellow('Auth0Provider')

  setInitOptions(initOptions)

  const [isAuthenticated, setIsAuthenticated] = useState()
  const [user, setUser] = useState()
  const [auth0Client, setAuth0] = useState()
  const [loading, setLoading] = useState(true)
  const [popupOpen, setPopupOpen] = useState(false)

  useEffect(() => {
    const init = async () => {
      const client = await getAuth0Client('Auth0Provider')
      setAuth0(client)
      if (window.location.search.includes('code=')) {
        const { appState } = await client.handleRedirectCallback()
        onRedirectCallback(appState)
      }

      const isAuthenticated = await client.isAuthenticated()
      setIsAuthenticated(isAuthenticated)

      if (isAuthenticated) {
        const user = await client.getUser()
        setUser(user)
      }

      setLoading(false)
    }
    init()
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
        // getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
        getTokenWithPopup: (...p) => auth0Client.getTokenWithPopup(...p),
        logout: (...p) => auth0Client.logout(...p)
      }}
    >
      {children}
    </Auth0Context.Provider>
  )
}
