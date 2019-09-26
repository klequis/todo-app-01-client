import React, { useState } from 'react'
import { useErrors } from './useErrors'
import Add from '@material-ui/icons/Add'
import Clear from '@material-ui/icons/Clear'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/styles'
import { Paper } from '@material-ui/core'
import DueDate from './DueDate'
import IconButton from '@material-ui/core/IconButton'

// eslint-disable-next-line
import { green } from 'logger'

const useStyles = makeStyles(theme => ({
  paper: {
    // margin: '8px 16px',
    // paddingLeft: 16,
    // paddingRight: 16,
    padding: '8px 16px',
    width: '100%',
    marginTop: '20px',
    marginBottom: '8px',
    // backgroundColor: 'red'
  },
  form: {
    display: 'flex',
    padding: '8px 16px',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'green'
  },
  title: {
    width: '100%',
    // backgroundColor: 'blue',
  },
  left: {
    // display: 'flex',
    flexBasis: '80%',
    // backgroundColor: 'lightblue'
  },
  right: {
    flexBasis: '20%',
    display: 'flex',
    flexWrap: 'nowrap',
    justifyContent: 'flex-end',
    // backgroundColor: 'lightgreen'
  },
  dueDate: {
    maxWidth: 125,
  },
  button: {
    // paddingLeft: 0,
    // paddingRight: 0,
    // margin: theme.spacing(0),
    // border: '1px solid red',
    // minWidth: 40
  }

}))

const AddTodo = props => {
  const [title, setTitle] = useState('')
  const [dueDate, setDueDate] = useState(null)

  const { getError, setError } = useErrors(state => state.validationErrors)
  
  const classes = useStyles()


  const { createTodo } = props

  const handleInputChange = e => {
    setTitle(e.target.value)
  }

  const handleOnSubmit = e => {
    e.preventDefault()
    createTodo({ title, dueDate })
    setTitle('')
    setDueDate(null)
  }

  const handleCancelClick = () => {
    setTitle('')
  }

  const handleTitleOnBlur = e => {
    const { id, value } = e.target
    if (value.length <= 2) {
      setError(id, 'client - Title must be at least 3 charters long')
    }
  }

  const handleDueDateChange = newDate => {
    
    setDueDate(newDate)

  }

  return (
    <Paper className={classes.paper}>
      <form className={classes.form} onSubmit={handleOnSubmit}>
        <div className={classes.left}>
          <TextField
            className={classes.title}
            id="title"
            multiline
            onChange={handleInputChange}
            onBlur={handleTitleOnBlur}
            placeholder='New todo title'
            type="text"
            value={title}
            fullWidth
          />
          <div>{getError('title')}</div>
        </div>
        <div className={classes.right}>
          <DueDate
            _id=""
            handleDueDateChange={handleDueDateChange}
            className={classes.dueDate}
            dueDate={dueDate}
          />

          {/* <Button type="submit" className={classes.button}>
            <Add />
          </Button> */}
          <IconButton type="submit" className={classes.button} size="small">
            <Add />
          </IconButton>
          <IconButton onClick={handleCancelClick} type="button" size="small">
            <Clear />
          </IconButton>
        </div>
      </form>
    </Paper>
  )
}

export default AddTodo
