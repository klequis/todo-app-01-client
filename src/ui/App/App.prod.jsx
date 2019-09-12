import React from 'react'
import { useAuth0 } from 'react-auth0-spa'
import Todos from 'ui/Todos'
import Login from 'ui/Login'
import styled from 'styled-components'
import Container from '@material-ui/core/Container'

const Nav = styled.div`
  display: flex;
  justify-content: center;
`

const App = ({ classes }) => {
  const { loading, isAuthenticated } = useAuth0()
  if (loading) {
    return null
  }
  return (
    <Container maxWidth="md">
      <Nav>
        <Login />
      </Nav>
      {isAuthenticated ? <Todos /> : null}
    </Container>
  )
}

export default App
