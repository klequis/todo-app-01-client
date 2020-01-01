import React, { useState } from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import DeleteForever from '@material-ui/icons/DeleteForever'
import Paper from '@material-ui/core/Paper'
import DueDate from './DueDate'
import TitleField from './TitleField'
import { makeStyles, createStyles } from '@material-ui/styles'

import { green } from 'logger'

const ITEM_HEIGHT = 48

const useStyles = makeStyles(theme =>
  createStyles({
    contentWrapper: {
      width: '100%',
      display: 'flex',
      flexWrap: 'nowrap',
      justifyContent: 'space-between',
      alignItems: 'center'
      /* background-color: lightblue; */
    },
    left: {
      display: 'flex',
      alignItems: 'center',
      flexBasis: '100%'
      /* background-color: red; */
    },
    completed: {
      flexBasis: '5%',
      '&&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.2)'
      }
    },
    titleView: {
      flexBasis: '80%'
    },
    titleEdit: {
      flexBasis: '100%'
    },
    underline: {
      '&&&:before': {
        borderBottom: 'none'
      },
      // '&&:after': {
      //   borderBottom: 'none'
      // },
      '&:hover': {
        borderBottom: `2px solid ${theme.palette.text.primary}`
      }
    },
    dueDateWrapper: {
      flexBasis: '20%',
      display: 'flex',
      justifyContent: 'center'
    }
  })
)

const ItemContent = ({ handleDateChange, todo, handleDeleteTodo }) => {
  // green('todo', todo)

  const { _id, completed, title, dueDate } = todo
  const [_title, _setTitle] = useState(title)
  const [_completed, _setCompleted] = useState(completed)


  const deleteClick = (e) => {
    handleDeleteTodo(_id)
  }

  const handleCompleteClick = e => {
    const b = e.target.checked
    _setCompleted(b)
  }

  const handleTitleChange = e => {
    const t = e.target.value
    _setTitle(t)
  }

  const classes = useStyles()
  // const underline = classes.underline
  green('classes', classes)
  green('underline', classes.underline)

  return (
    <Paper className={classes.contentWrapper}>
      <div className={classes.left}>
        <Checkbox
          checked={_completed}
          className={classes.completed}
          onChange={handleCompleteClick}
          value="checkedA"
          inputProps={{
            'aria-label': 'primary checkbox'
          }}
          style={{ color: 'white' }}
          onBlur={handleCompleteClick}
        />

        <TitleField handleTitleChange={handleTitleChange} title={_title} />

        <div className={classes.dueDateWrapper}>
          <DueDate
            _id={_id}
            handleDateChange={handleDateChange}
            dueDate={dueDate}
          />
        </div>
      </div>
      <IconButton>
        <DeleteForever onClick={deleteClick} />
      </IconButton>
    </Paper>
  )
}

export default ItemContent
