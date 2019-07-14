import React from 'react'
import withStyles from 'react-jss'
import { compose } from 'recompose'
import App from 'ui/App'

class Wrapper extends React.Component {
  render() {
    return <App />
  }
}

const styles = {
  '@global': {
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
  }
}

export default compose(withStyles(styles))(Wrapper)
