import React, { useState } from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import DueDate from './DueDate'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'

import { green } from 'logger'

const options = [
  {
    label: 'Edit',
    action: 'edit'
  },
  {
    label: 'Delete',
    action: 'delete'
  }
]

const ITEM_HEIGHT = 48

const useStyles = makeStyles({
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
  dueDateWrapper: {
    flexBasis: '20%',
    display: 'flex',
    justifyContent: 'center'
  }
})

const ItemContent = ({ handleCompletedChange, handleDateChange, todo }) => {

  const { _id, completed, title, dueDate } = todo

  const [anchorEl, setAnchorEl] = useState(null)
  const [_completed, _setCompleted] = useState(completed)
  const [_title, _setTitle] = useState(title)
  const open = Boolean(anchorEl)
  const [mode, setMode] = useState('view')



  const handleMoreClick = e => {
    setAnchorEl(e.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleMenuItemClick = (e, action) => {
    setAnchorEl(null)
    green('action', action)
    if (action === 'edit') {
      setMode('edit')
    }
  }

  const handleCompleteClick = e => {
    green('handleCompletedClick')
    const b = e.target.checked
    _setCompleted(b)
    green('b', b)
    green('_id', _id)
    handleCompletedChange({ todoId: _id, completed: b })
  }

  const handleTitleChange = e => {
    const t = e.target.value
    _setTitle(t)
  }

  const classes = useStyles()

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
        />

        {mode === 'view' ? (
          <div className={classes.titleView}>
            <Typography variant="body1">{_title}</Typography>
          </div>
        ) : (
          <TextField
            className={classes.titleEdit}
            multiline={true}
            value={_title}
            onChange={handleTitleChange}
            placeholder="Title / description"
            required={true}
          />
        )}
        <div className={classes.dueDateWrapper}>
          <DueDate
            _id={_id}
            handleDateChange={handleDateChange}
            dueDate={dueDate}
          />
        </div>
      </div>
      <div /*className={classes.right}*/>
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
    </Paper>
  )
}

export default ItemContent
