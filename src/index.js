import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import { Auth0Provider } from './react-auth0-spa'
import './index.css'
import App from './ui/App'
import config from 'config'

// eslint-disable-next-line
// import { green } from 'logger'

const store = configureStore()

const onRedirectCallback = appState => {
  // temporary work-around per [faq](https://github.com/auth0/auth0-spa-js/blob/master/FAQ.md#why-do-i-get-error-invalid-state-in-firefox-when-refreshing-the-page-immediately-after-a-login)
  window.location.hash = window.location.hash // eslint-disable-line no-self-assign
  window.history.replaceState(
    {},
    document.title,
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  )
}

const renderApp = () =>
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

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('Wrapper', renderApp)
}

renderApp()
