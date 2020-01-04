import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import Login from 'ui/Login'
import { useAuth0 } from 'react-auth0-spa'

// eslint-disable-next-line
import { green } from 'logger'

const useStyles = makeStyles({
  nav: {
    paddingBottom: 24
  },
  loggedin: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  userNickname: {
    fontSize: 32
  }
})

const formatNickname = nickname => {
  const len = nickname.length
  const lastLetter = nickname[len - 1]
  return lastLetter.toLowerCase() === 's' ? `${nickname}'` : `${nickname}'s`
}

const Nav = () => {
  const { isAuthenticated, user } = useAuth0()
  const classes = useStyles()
  // green('user', user)

  return (
    <div className={classes.nav}>
      {isAuthenticated ? (
        <div className={classes.loggedin}>
          <Typography variant="h2" className={classes.userNickname}>
            {formatNickname(user.nickname)} Todos
          </Typography>
          <Login />{' '}
        </div>
      ) : (
        <Login />
      )}
    </div>
  )
}

export default Nav
