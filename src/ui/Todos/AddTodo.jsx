import React, { useState } from 'react'
// eslint-disable-next-line
import { green } from 'logger'

const formStyle = {
  margin: '20px 0 60px 0',
}

const buttonStyle = {
  margin: '0 5px 0 5px',
}

const AddTodo = props => {
  
  const [title, setTitle] = useState('')
  
  const { handleAddTodo } = props

  const handleInputChange = e => {
    setTitle(e.target.value)
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    handleAddTodo(title)
    setTitle('')
  }

  return (
    <form style={formStyle} onSubmit={handleOnSubmit}>
      <input
        onChange={handleInputChange}
        type='text'
        value={title}
      />
      <button style={buttonStyle} type='submit'>Add</button>
      <button style={buttonStyle} type='button'>Cancel</button>
    </form>
  )
}

export default AddTodo