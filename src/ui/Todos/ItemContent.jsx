import React, { useState } from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Paper from '@material-ui/core/Paper'
import DueDate from './DueDate'
import TitleField from './TitleField'
import { makeStyles, createStyles } from '@material-ui/styles'

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
  const [anchorEl, setAnchorEl] = useState(null)
  const [_completed, _setCompleted] = useState(completed)

  const open = Boolean(anchorEl)

  const handleMoreClick = e => {
    setAnchorEl(e.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  // TODO: edit mode is no longer used
  const handleMenuItemClick = (e, action) => {
    setAnchorEl(null)
    green('action', action)
    if (action === 'edit') {
      // setMode('edit')
    } else if (action === 'delete') {
      green('_id', _id)
      handleDeleteTodo(_id)
    }
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
      <div>
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
