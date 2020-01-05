import React, { useState } from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'

import { isISO8601 } from 'validator'

// eslint-disable-next-line
import { green } from 'logger'



const ItemContent = ({ updateTodo, todo, handleDeleteTodo }) => {
  // const { _id, completed, title, dueDate } = todo
  const [_title, _setTitle] = useState('the title')
  const [_completed, _setCompleted] = useState(false)

  const handleDataChanged = () => {
    // updateTodo(_id, _completed, _dueDate, _title)
    green('title', _title)
    green('completed', _completed)
  }

  const handleCompleteClick = e => {
    
    const b = e.target.checked
    _setCompleted(b)
    handleDataChanged()
  }

  const handleTitleChange = e => {
    const t = e.target.value
    _setTitle(t)
    handleDataChanged()
  }

  const handleTitleBlur = () => {
    green('handleTitleBlur')
    // handleDataChanged()
  }

  const handleCompleteBlur = () => {
    handleDataChanged()
  }

  const handleCheckboxBlur = () => {
    green('handleCheckboxBlur')
  }



  return (
    <Paper>
      <div>
        <Checkbox
          checked={_completed}
          onBlur={handleCheckboxBlur}
          onChange={handleCompleteClick}
          inputProps={{
            'aria-label': 'primary checkbox'
          }}
          style={{ color: 'white' }}
        />
        <TextField
          multiline={true}
          value={_title}
          // onBlur={handleTitleBlur}
          onChange={handleTitleChange}
        />

      </div>
    </Paper>
  )
}

export default ItemContent
