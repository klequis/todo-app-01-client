import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import { Auth0Provider } from './react-auth0-spa'
import './index.css'
import App from 'ui/App'
import config from 'config'

const store = configureStore()

const onRedirectCallback = appState => {
  window.history.replaceState(
    {},
    document.title,
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  )
}

const renderApp = () => {
  render(
    <Auth0Provider
      domain={config.auth0.domain}
      client_id={config.auth0.clientId}
      audience={config.auth0.audience}
      redirect_uri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </Auth0Provider>,
    document.getElementById('root')
  )
}

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('ui/App', renderApp)
}

renderApp()
