import React from 'react'
import { useAuth0 } from 'react-auth0-spa'
import Todos from 'ui/Todos'
import Login from 'ui/Login'
import styled from 'styled-components'
import Container from '@material-ui/core/Container'

// const AppWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   /* justify-items: center; */
//   /* justify-content: center; */
//   align-items: center;
//   /* max-width: 200px; */
//   /* background-color: blue; */
// `

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
    // <AppWrapper id='AppWrapper'>
    <Container maxWidth='md'>
      <Nav>
        <Login />
      </Nav>
      {isAuthenticated ? <Todos /> : null}
    </Container>
    // </AppWrapper>
  )
}

export default App

