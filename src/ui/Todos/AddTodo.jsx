import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { todoCreateRequest } from 'store/todo/actions'
// eslint-disable-next-line
import { green, red } from 'logger'

const formStyle = {
  margin: '20px 0 60px 0'
}

const buttonStyle = {
  margin: '0 5px 0 5px'
}

const AddTodo = () => {
  const [title, setTitle] = useState('')
  const [validationError, setValidationError] = useState('')
  const dispatch = useDispatch()

  const handleInputChange = e => {
    setTitle(e.target.value)
  }

  const handleOnSubmit = e => {
    e.preventDefault()
    try {
      dispatch(todoCreateRequest({ title }))
      setTitle('')
    } catch (e) {
      red('AddTodo.handleOnSubmit ERROR:', e)
    }
  }

  const handleOnBlur = e => {
    // off for now
    // const val = e.target.value.trim()
    // if (val.length < 3) {
    //   setValidationError('title must be at least 3 characters')
    // }
  }
  green('AddTodo rendering')
  return (
    <form style={formStyle} onSubmit={handleOnSubmit}>
      <input
        id="title"
        onChange={handleInputChange}
        type="text"
        value={title}
        onBlur={handleOnBlur}
      />
      <label>{validationError}</label>
      <button style={buttonStyle} type="submit">
        Add
      </button>
      <button style={buttonStyle} type="button">
        Cancel
      </button>
    </form>
  )
}

export default AddTodo
