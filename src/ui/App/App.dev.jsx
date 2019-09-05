import React from 'react'

import Todos from 'ui/Todos'
import Status from 'ui/Status'
import Login from 'ui/Login'
import DevTools from 'ui/DevTools'
import { useAuth0 } from 'react-auth0-spa'
import Toasts from 'ui/Toasts'
import styled from 'styled-components'

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: blue;
`

const Nav = styled.div`
  display: flex;
  justify-content: center;
  background-color: red;
`;

// const Content = styled.div`
//   flex: 1 0 auto;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   align-content: center;
//   margin: 0;
// `;




function App({ classes }) {
  const { loading, isAuthenticated } = useAuth0()
  if (loading) {
    return <h1>Loading</h1>
  }

  return (
    <AppWrapper>
      <Toasts />
      <Nav>
        <Login />
      </Nav>
      {/* <Content> */}
        <Status />
        {isAuthenticated ? <Todos /> : null}
      {/* </Content> */}
      {/* <DevTools /> */}
    </AppWrapper>
  )
}

// const styles = {
//   wrapper: {
//     minHeight: '100vh',
//     display: 'flex',
//     flexFlow: 'column nowrap',
//     alignItems: 'center',
//     marginTop: 50,
//     //
//     backgroundColor: 'red'
//   },
//   add: {
//     marginBottom: 50
//   }
// }

export default App

// const GlobalStyle = createGlobalStyle`
//   html: {
//       boxSizing: border-box;
//       -webkit-font-smoothing: antialiased;
//       -moz-osx-font-smoothing: grayscale;
//       font-size: 12pt;
//     }
//   body: {
//       margin: 0;
//       font-family: '"Lato", sans-serif';
//       font-size: 1rem;
//       font-weight: 300;
//       line-height: 1.65;
//       -webkit-text-size-adjust: none;
//       -ms-overflow-style: scrollbar;
//       background-color: '#232c35';
//       color: 'red',
//       '@media print': {
//         backgroundColor: 'white',
//         minWidth: 320
//       }
//     }
//     h1, h2, h3, h4, h5, h6 {
//       font-family: '"Roboto", sans-serif'
//     }
//     *, *::before, *::after {
//       box-sizing: 'inherit'
//     }
//     p {
//       margin: 0
//     }
// `
