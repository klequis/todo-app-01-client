import React, { useEffect } from 'react'
import withStyles from 'react-jss'
import classNames from 'classnames'
import { TOAST_WARN, TOAST_INFO } from 'global-constants'

const Toast = ({ classes, clearToast, error, id, level, message }) => {
  useEffect(() => {
    const timerId = setTimeout(() => clearToast(), 3000)
    return () => clearTimeout(timerId)
  })

  const wrapperStyle = classNames({
    [classes.wrapper]: true,
    [classes.info]: level === TOAST_INFO,
    [classes.warn]: level === TOAST_WARN
  })

  return (
    <div key={id} className={wrapperStyle}>
      <h1>{message}</h1>
      <b>{error}</b>
    </div>
  )
}

const styles = {
  wrapper: {
    position: 'fixed',
    // right: '0.75rem',
    left: '2rem',
    top: '4.75rem',
    boxShadow: '0 .2rem .4rem rgba(0,0,0,.1)',
    borderRadius: '.2rem',
    padding: '1rem',
    animationName: 'slideIn',
    animationDuration: '.2s'
  },
  info: {
    backgroundColor: 'black',
    color: 'white'
  },
  warn: {
    backgroundColor: '#b93f55',
    color: 'white'
  }
}

export default withStyles(styles)(Toast)
