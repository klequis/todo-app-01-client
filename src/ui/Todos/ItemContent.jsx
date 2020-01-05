import React, { useEffect, useState } from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import DeleteForever from '@material-ui/icons/DeleteForever'
import Paper from '@material-ui/core/Paper'
import DueDate from './DueDate'
import TextField from '@material-ui/core/TextField'
import { makeStyles, createStyles } from '@material-ui/styles'
import { isISO8601 } from 'validator'
import { COMPLETED, TITLE, DUE_DATE } from './TodosContainer'

// eslint-disable-next-line
import { green } from 'logger'

const useStyles = makeStyles(theme =>
  createStyles({
    contentWrapper: {
      width: '100%',
      display: 'flex',
      flexWrap: 'nowrap',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    left: {
      display: 'flex',
      alignItems: 'center',
      flexBasis: '100%'
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

const ItemContent = ({ updateTodo, todo, handleDeleteTodo }) => {
  const { _id, completed, title, dueDate } = todo
  const [_title, _setTitle] = useState(title)
  const [_completed, _setCompleted] = useState(completed)
  const [_dueDate, _setDueDate] = useState(isISO8601(dueDate + '') ? dueDate : null)

  // green('_title', _title)
  // green('_completed', _completed)
  // green('_dueDate', _dueDate)

  // useEffect(() => {
  //   updateTodo(_id, _completed, _dueDate, _title)
  // }, [_id, _completed, _dueDate, _title, updateTodo])


  // useEffect(() => {
  //   ;(async () => {
  //         await updateTodo(_id, _completed, _dueDate, _title)
  //   })()
  // },  [_id, _completed, _dueDate, _title, updateTodo])



  const handleDataChanged = (field, value) => {
    green(`handleDataChanged: field: ${field}, value: ${value}`)
    updateTodo(_id, field, value)
    // if (field === COMPLETED) {
    //   updateTodo(_id, value, _dueDate, _title)
    // } else {

    //   updateTodo(_id, _completed, _dueDate, _title)
    // }
  }

  const deleteClick = () => {
    handleDeleteTodo(_id)
  }

  const handleCompleteClick = e => {
    
    const b = e.target.checked
    
    // green('*****handleCompleteClick: b', b)
    _setCompleted(b)
    // green('*****handleCompleteClick: _completed', _completed)
    handleDataChanged(COMPLETED, b)
  }

  const handleTitleChange = e => {
    const t = e.target.value
    _setTitle(t)
  }

  const handleTitleBlur = (e) => {
    green('*********', e.target)
    
    const value = e.target.value
    green('handleTitleBlur: e.target.value', value)
    handleDataChanged(TITLE, value)
    // handleDataChanged()
  }

  // const handleCompleteBlur = () => {
  //   handleDataChanged()
  // }

  const classes = useStyles()

  return (
    <Paper className={classes.contentWrapper}>
      <div className={classes.left}>
        <Checkbox
          checked={_completed}
          className={classes.completed}
          onChange={handleCompleteClick}
          inputProps={{
            'aria-label': 'primary checkbox'
          }}
          style={{ color: 'white' }}
        />
        <TextField
          className={classes.titleEdit}
          // See issue #12 for important point about use
          // of InputProps
          InputProps={{
            classes: {
              underline: classes.underline
            }
          }}
          multiline={true}
          value={_title}
          onBlur={handleTitleBlur}
          onChange={handleTitleChange}
          placeholder="Title / description"
          required={true}
        />

        <div className={classes.dueDateWrapper}>
          <DueDate
            // _id={_id}
            setDueDate={_setDueDate}
            dueDate={_dueDate}
          />
        </div>
      </div>
      <IconButton onClick={deleteClick}>
        <DeleteForever />
      </IconButton>
    </Paper>
  )
}

export default ItemContent
