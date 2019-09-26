import React, { useState } from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
// import Menu from '@material-ui/core/Menu'
// import MenuItem from '@material-ui/core/MenuItem'
// import MoreVertIcon from '@material-ui/icons/MoreVert'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import DueDate from './DueDate'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import DeleteForever from '@material-ui/icons/DeleteForever'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import AreYouSure from 'ui/AreYouSure'


import { green } from 'logger'

const useStyles = makeStyles({
  paper: {
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
  dueDateWrapper: {
    flexBasis: '20%',
    display: 'flex',
    justifyContent: 'center'
  }
})

// TODO: is it possible to detect if title has actually changed
// of course it is and it is worth doing

const ItemContent = ({ updateTodo, deleteTodo, todo }) => {

  const { _id, completed, title, dueDate } = todo

  const [_completed, _setCompleted] = useState(completed)
  const [_title, _setTitle] = useState(title)
  const [titleMode, setTitleMode] = useState('view')
  const [yesNoOpen, setYesNoOpen] = useState(false)

  const handleCompleteChange = e => {
    green('handleCompletedChange')
    const b = e.target.checked
    _setCompleted(b)
    green('b', b)
    green('_id', _id)
    updateTodo({ todoId: _id, completed: b })
  }

  const handleTitleChange = e => {
    const t = e.target.value
    _setTitle(t)
  }

  const callUpdateTitle = () => {
    green('_title', _title)
    updateTodo({ todoId: _id, title: _title })
  }
  const handleTitleBlur = () => {
    green('handleTitleBlur')
    setTitleMode('view')
    callUpdateTitle()
  }

  const handleTitleClickAway = () => {
    green('handleClickAway')
    setTitleMode('view')
    callUpdateTitle()
  }

  const handleDueDateChange = newDate => {
    green('handleDueDateChange: newDate', newDate)
    updateTodo({ todoId: _id, dueDate: newDate })
  }

  const handleDeleteClick = e => {
    green('handleDeleteClick: e', e)
    setYesNoOpen(true)
    
  }

  const yesNoResponse = (val) => {
    green('YesNoResponse: val', val)
    if (val === 'yes') {
      deleteTodo({todoId: _id})
    } else {
      green('val was not yes')
    }
  }

  

  const classes = useStyles()

  return (
    <Paper className={classes.paper}>
      <AreYouSure isOpen={yesNoOpen} setYesNoOpen={setYesNoOpen} response={yesNoResponse} />

      <div className={classes.left}>
        <Checkbox
          checked={_completed}
          className={classes.completed}
          onChange={handleCompleteChange}
          value="checkedA"
          inputProps={{
            'aria-label': 'primary checkbox'
          }}
          style={{ color: 'white' }}
        />

        {titleMode === 'view' ? (
          <div className={classes.titleView}>
            <Typography variant="body1" onClick={() => setTitleMode('edit')}>
              {_title}
            </Typography>
          </div>
        ) : (
          <ClickAwayListener onClickAway={handleTitleClickAway}>
            <TextField
              autoFocus // if not set, does not get focus on titleMode change to 'edit'
              className={classes.titleEdit}
              multiline={true}
              onChange={handleTitleChange}
              onBlur={handleTitleBlur} // only tab away, not click away
              // placeholder="Title / description"
              required={true}
              value={_title}
            />
          </ClickAwayListener>
        )}
        <div className={classes.dueDateWrapper}>
          <DueDate
            _id={_id}
            handleDueDateChange={handleDueDateChange}
            dueDate={dueDate}
          />
        </div>
        <div>
          <IconButton onClick={handleDeleteClick}>
            <DeleteForever />
          </IconButton>
        </div>
      </div>
    </Paper>
  )
}

export default ItemContent

/*

<div >
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleMoreClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="more-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 200
            }
          }}
        >
          {options.map(o => (
            <MenuItem
              key={o.action}
              // selected={option === 'Pyxis'}
              // onClick={handleClose}
              onClick={event => handleMenuItemClick(event, o.action)}
            >
              {o.label}
            </MenuItem>
          ))}
        </Menu>
      </div>


*/

// const handleMenuItemClick = (e, action) => {
//   setAnchorEl(null)
//   green('action', action)
//   if (action === 'edit') {
//     setMode('edit')
//   }
// }

// const options = [
//   {
//     label: 'Edit',
//     action: 'edit'
//   },
//   {
//     label: 'Delete',
//     action: 'delete'
//   }
// ]

// const ITEM_HEIGHT = 48

// const open = Boolean(anchorEl)

// const handleMoreClick = e => {
//   setAnchorEl(e.currentTarget)
// }

// const handleClose = () => {
//   setAnchorEl(null)
// }