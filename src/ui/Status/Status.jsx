import React from 'react'
import { connect } from 'react-redux'
import { useAuth0 } from 'react-auth0-spa'
import { version } from '../../../package.json'
import { setUser } from 'store/user/actions'
import { getUserId } from 'store/user/selectors.js'

const User = ({user}) => {
  
  if (!user) {
    return null
  }
  const { nickname, updated_at } = user

  return (
    <div>
      nickname: {nickname}
      <br />
      user updated: {updated_at}
      
    </div>
  )
}

const Status = () => {
  const { isAuthenticated, user } = useAuth0()

  return (
    <div>
      <b>status</b>
      <br />
      <br />
      isAuthenticated: {isAuthenticated ? 'yes' : 'no'}
      <br />
      app version: {version}
      <br />
      <User user={user} />
      <br />
    </div>
  )
}

const actions = { setUser }

const mstp = state => {
  return {
    userId: getUserId(state)
  }
}

export default connect(mstp, actions)(Status)
