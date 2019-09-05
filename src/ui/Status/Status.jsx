import React from 'react'
import { connect } from 'react-redux'
import { useAuth0 } from 'react-auth0-spa'
import { version } from '../../../package.json'
import { setUser } from 'store/user/actions'
import { getUserId } from 'store/user/selectors.js'
import styled from 'styled-components'

const StatusWrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: green;
`;


const User = ({user}) => {
  
  if (!user) {
    return null
  }
  const { nickname, updated_at } = user

  return (
    <StatusWrapper>
      nickname: {nickname}
      <br />
      user updated: {updated_at}
      
    </StatusWrapper>
  )
}

const Status = () => {
  const { isAuthenticated, user } = useAuth0()

  return (
    <StatusWrapper>
      <div>
        <h3>status</h3>
        isAuthenticated: {isAuthenticated ? 'yes' : 'no'}
        <br />
        app version: {version}
        <br />
        <User user={user} />
        <br />
      </div>
    </StatusWrapper>
  )
}

const actions = { setUser }

const mstp = state => {
  return {
    userId: getUserId(state)
  }
}

export default connect(mstp, actions)(Status)
