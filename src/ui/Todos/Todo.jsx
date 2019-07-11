import React, { useState } from 'react'

// eslint-disable-next-line
import { green } from 'logger'

const todoStyle = {
  marginBottom: '1em',
  display: 'flex'
}

const row = {
  display: 'flex'
}

const label = {
  flexBasis: '15%',
  textAlign: 'right'
}

const data = {
  flexBasis: '70%',
  paddingLeft: '10px'
}

const Todo = props => {
  const { completed, _id, title } = props.todo
  const { handleCompletedChange, handleDeleteTodo } = props
  const [_completed, _setCompleted] = useState(completed)

  // green('completed', completed)

  const handleDeleteClick = () => {
    // are you sure?
    // if yes, do it
    handleDeleteTodo(_id)
  }

  const handleCompletedClick = (e) => {
    // green('e', e.target)
    const checked = e.target.checked
    _setCompleted(checked)
    handleCompletedChange({
      _id,
      title,
      completed: checked,
    })

  }

  return (
    <div style={todoStyle}>
      <input
        type='checkbox'
        checked={_completed}
        onChange={handleCompletedClick}
      />
      <div>
        <div style={row}>
          <b style={label}>_id:</b>
          <div style={data}> {_id}</div>
        </div>

        <div style={row}>
          <b style={label}>Title:</b>
          <div style={data}> {title}</div>
        </div>

        <div style={row}>
          <b style={label}>Completed:</b>
          <div style={data}> {completed ? 'yes' : 'no'}</div>
        </div>
      </div>
      <button onClick={handleDeleteClick}>Del</button>
    </div>
  )
}

export default Todo
