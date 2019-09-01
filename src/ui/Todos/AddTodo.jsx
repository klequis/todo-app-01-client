import React, { useState } from 'react'
import { useErrors } from './useErrors'
// eslint-disable-next-line
import { green } from 'logger'



const formStyle = {
  margin: '20px 0 60px 0'
}

const buttonStyle = {
  margin: '0 5px 0 5px'
}

const AddTodo = props => {
  const [title, setTitle] = useState('')
  const { setError } = useErrors()
  const { handleAddTodo } = props

  const handleInputChange = e => {
    setTitle(e.target.value)
  }

  const handleOnSubmit = e => {
    e.preventDefault()
    // TODO: send all paramaters for the todo, not just 'title'
    handleAddTodo(title)
    setTitle('')
  }

  const handleCancelClick = ()  => {
    setTitle('')
  }

  return (
    <form style={formStyle} onSubmit={handleOnSubmit}>
      <input
        id='title'
        onChange={handleInputChange}
        onBlur={}
        type='text'
        value={title}
      />
      <button style={buttonStyle} type='submit'>Add</button>
      <button style={buttonStyle} onClick={handleCancelClick} type='button'>Cancel</button>
    </form>
  )
}

export default AddTodo
