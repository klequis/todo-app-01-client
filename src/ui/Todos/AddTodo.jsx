import React, { useState } from 'react'
import { connect } from 'react-redux'
import {
  setValidationErrors,
  clearValidationErrors
} from 'store/validation/actions'

// eslint-disable-next-line
import { green } from 'logger'
import { validationErrorsReducer } from 'store/validation/reducers';

const formStyle = {
  margin: '20px 0 60px 0',
}

const buttonStyle = {
  margin: '0 5px 0 5px',
}

const AddTodo = props => {
  
  const [title, setTitle] = useState('')
  // const [errors, setErrors] = useState([])
  const [validationError, setValidationError] = useState('')
  
  const { handleAddTodo } = props

  const handleInputChange = e => {
    setTitle(e.target.value)
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    handleAddTodo(title)
    setTitle('')
  }

  const handleOnBlur = (e) => {
    // check the input
    // green('e', e.target.value.trim() === '' ? 'yes' : 'no')
    // green('typeof e', typeof e.target.value)
    const val = e.target.value.trim()
    if (val.length < 3) {
      setValidationError('title must be at least 3 characters')
    }


  }

  return (
    <form style={formStyle} onSubmit={handleOnSubmit}>
      <input
        id='title'
        onChange={handleInputChange}
        type='text'
        value={title}
        onBlur={handleOnBlur}
      />
      <label>{validationError}</label>
      <button style={buttonStyle} type='submit'>Add</button>
      <button style={buttonStyle} type='button'>Cancel</button>
    </form>
  )
}

export default AddTodo