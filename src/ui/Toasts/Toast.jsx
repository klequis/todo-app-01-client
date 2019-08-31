import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import withStyles from 'react-jss'
import classNames from 'classnames'
import { clearToast } from 'store/toast/actions'
import { getToast } from 'store/toast/selectors'
import { TOAST_WARN, TOAST_INFO } from 'global-constants'
// eslint-disable-next-line
import { green } from 'logger'


const Toast = ({ classes, toast }) => {


  useEffect(() => {
    const timerId = setTimeout(() => clearToast(), 3000)
    return () => clearTimeout(timerId)
  })

  if (!toast) { return null }
  
  const { level, id, message, error } = toast

  const wrapperStyle = classNames({
    [classes.wrapper]: true,
    [classes.info]: level === TOAST_INFO,
    [classes.warn]: level === TOAST_WARN
  })

  return (
    <div key={id} className={wrapperStyle}>
      <h1>{message}</h1>
      <b>{error.statusText}</b>
    </div>
  )
}

const styles = {
  wrapper: {
    position: 'fixed',
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

const actions = { clearToast }

const mstp = state => {
  return {
    toast: getToast(state)
  }
}

export default compose(
  withStyles(styles),
  connect(mstp, actions)
)(Toast)