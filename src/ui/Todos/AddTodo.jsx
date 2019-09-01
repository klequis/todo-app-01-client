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
  const { getError, setError } = useErrors(state => state.validationErrors)
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

  const handleTitleOnBlur = (e)  => {

    const { id, value } = e.target
    green('id', id)
    green('value', value)
    if (value.length <= 3) {
      setError(id, 'client - Title must be at least 3 charters long')
    }
  }

  return (
    <form style={formStyle} onSubmit={handleOnSubmit}>
      
        <input
          id="title"
          onChange={handleInputChange}
          onBlur={handleTitleOnBlur}
          type="text"
          value={title}
        />
        <div>{getError('title')}</div>
      
      <button style={buttonStyle} type="submit">
        Add
      </button>
      <button style={buttonStyle} onClick={handleCancelClick} type="button">
        Cancel
      </button>
    </form>
  )
}

export default AddTodo
