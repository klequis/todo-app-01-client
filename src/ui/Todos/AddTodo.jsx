import React, { useState } from 'react'
import { connect } from 'react-redux'
import { todoCreateRequest } from 'store/todo/actions'
import { getValidationErrors } from 'store/validation/selectors'
import { getUserId } from 'store/user/selectors'
import { useErrors } from './useErrors'

// eslint-disable-next-line
import { green, red } from 'logger'

const formStyle = {
  margin: '20px 0 60px 0'
}

const buttonStyle = {
  margin: '0 5px 0 5px'
}

const AddTodo = props => {
  const [title, setTitle] = useState('')

<<<<<<< HEAD
  const { getError, setError } = useErrors(getValidationErrors)

  const { userId } = props
=======
  const { handleAddTodo } = props
>>>>>>> dev

  const handleInputChange = e => {
    setTitle(e.target.value)
  }

  const handleOnSubmit = e => {
<<<<<<< HEAD
    e.preventDefault()
    // TODO: send all paramaters for the todo, not just 'title'
    try {
      todoCreateRequest(userId, { title })
      setTitle('')
    } catch (e) {
      red('AddTodo.handleOnSubmit ERROR:', e)
    }
  }

  const handleOnBlur = e => {
    const val = e.target.value.trim()
    if (val.length < 3) {
      setError('title', 'CLIENT: Title must be at least 3 characters')
    } else {
      setError('title', '')
    }
  }
  
  return (
    <form style={formStyle} onSubmit={handleOnSubmit}>
      <input
        id="title"
=======
    green('handleOnSubmit')
    e.preventDefault()
    // TODO: send all paramaters for the todo, not just 'title'
    handleAddTodo(title)
    setTitle('')
  }

  const handleCancelClick = () => {
    setTitle('')
  }

  return (
    <form style={formStyle} onSubmit={handleOnSubmit}>
      <input
        id='title'
>>>>>>> dev
        onChange={handleInputChange}
        type="text"
        value={title}
        onBlur={handleOnBlur}
      />
<<<<<<< HEAD
      <br />
      <label>{getError('title')}</label>
      <br />
      <button style={buttonStyle} type="submit">
        Add
      </button>
      <button style={buttonStyle} type="button">
=======
      <button style={buttonStyle} type='submit'>Add</button>
      <button 
        style={buttonStyle} 
        onClick={handleOnSubmit}
        type='button
      '>
>>>>>>> dev
        Cancel
      </button>
    </form>
  )
}

<<<<<<< HEAD
const actions = { todoCreateRequest }

const mstp = state => {
  return {
    userId: getUserId(state)
  }
}
export default connect(mstp, actions)(AddTodo)
=======
export default AddTodo
>>>>>>> dev
