import React from 'react'
import { useAuth0 } from 'react-auth0-spa'
import Todos from 'ui/Todos'

import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/styles'
import DevTools from 'ui/DevTools'
import Nav from 'ui/Nav'
import Typography from '@material-ui/core/Typography'

// import { green } from 'logger'

// 8, 16, 24, 32, 40, 48

const useStyles = makeStyles({
  appTitle: {
    fontSize: 48,
    paddingTop: 32,
    paddingBottom: 32
  }
})

const App = () => {
  const { loading, isAuthenticated } = useAuth0()
  const classes = useStyles()

  if (loading) {
    return null
  }

  return (
    <>
      <Container maxWidth="md" className={classes.nav}>
        <Typography
          variant="h1"
          className={classes.appTitle}
          align="center"
        >
          Full-stack MERN Todos
        </Typography>
        <Nav />
        {isAuthenticated ? <Todos /> : null}
      </Container>
      {/* <DevTools /> */}
    </>
  )
}

export default App
