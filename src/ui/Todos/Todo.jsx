import React, { useState } from 'react'
import withStyles from 'react-jss'
import { mergeRight } from 'ramda'
import { format } from 'date-fns'

// eslint-disable-next-line
import { green } from 'logger'

const Todo = props => {
  // green('props', props)
  const { classes } = props
  const {
    completed,
    _id,
    title,
    // createdAt,
    dueDate,
    // lastUpdatedAt,
    // userId
  } = props.todo
  const { handleCompletedChange, handleDeleteTodo } = props
  const [_completed, _setCompleted] = useState(completed)

  const [disabled, setDisabled] = useState(false)
  // green('completed', completed)

  const handleDeleteClick = () => {
    // are you sure?
    // if yes, do it
    setDisabled(true)
    handleDeleteTodo(_id)
  }

  const handleCompletedClick = e => {
    // green('e', e.target)
    const checked = e.target.checked
    _setCompleted(checked)
    const { todo } = props
    const newTodo = mergeRight(todo, { completed: checked })
    handleCompletedChange(newTodo)
  }

  const fields = [
    {
      label: 'Title',
      field: title
    },
    {
      label: 'Completed',
      field: completed ? 'yes' : 'no'
    },
    {
      label: 'Due Date',
      field: format(new Date(dueDate), 'MMM d, yyyy')
    },
  ]

  return (
    <div className={classes.todo}>
      <input
        type="checkbox"
        checked={_completed}
        onChange={handleCompletedClick}
      />
      <div className={classes.field}>
        {fields.map(f => (
          <div className={classes.row} key={f.label}>
            <b className={classes.label}>{f.label}:</b>
            <div className={classes.data}> {f.field}</div>
          </div>
        ))}
      </div>
      <button
        className={classes.button}
        onClick={handleDeleteClick}
        disabled={disabled}
      >
        Del
      </button>
    </div>
  )
}

const styles = {
  field: {

  },
  todo: {
    marginBottom: '1em',
    display: 'flex',
    // flexFlow: 'column nowrap',
    backgroundColor: 'blue'
  },
  row: {
    display: 'flex',
    // flexFlow: 'column nowrap',
    flexFlow: 'row nowrap',
    backgroundColor: 'green'
    // justifyContent: 'flex-start',
    // alignItems: 'flex-start'
  },
  label: {
    flexBasis: '15%',
    textAlign: 'right'
  },
  data: {
    flexBasis: '70%',
    paddingLeft: '10px'
  },
  button: {
    backgroundColor: 'green',
    '&disabled': {
      backgroundColor: 'red'
    }
  }
}

export default withStyles(styles)(Todo)

// const fields = [
//   {
//     label: '_id',
//     field: _id
//   },
//   {
//     label: 'Title',
//     field: title
//   },
//   {
//     label: 'Completed',
//     field: completed ? 'yes' : 'no'
//   },
//   {
//     label: 'Created',
//     field: format(new Date(createdAt), 'MMM d, yyyy')
//   },
//   {
//     label: 'Due Date',
//     field: format(new Date(dueDate), 'MMM d, yyyy')
//   },
//   {
//     label: 'Last Updated',
//     field: format(new Date(lastUpdatedAt), 'MMM d, yyyy')
//   },
//   {
//     label: 'User ID',
//     field: userId
//   }
// ]