import React, { useState } from 'react'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import DueDate from './DueDate'

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

const ItemContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  /* background-color: lightblue; */
`

// Left side
const Left = styled.div`
  display: flex;
  align-items: center;
  flex-basis: 100%;
  /* background-color: red; */
`
const Completed = styled(Checkbox)`
  /* background-color: blue; */
  flex-basis: 5%;
`

const Title = styled(TextField)`
  flex-basis: 100%;
  /* background-color: orange; */
`

// Right side
const Right = styled.div`
  /* background-color: blue; */
`

const More = styled(Menu)`
  /* background-color: yellow; */
`

const ItemContent = ({ todo, mode = 'read' }) => {
  // Seems odd the way this is sent by react-sortable-hoc
  // Am receiving a prop named 'value' which has a property 'value'
  // and that contains the passed in data, in this case a todo
  // const { value } = value
  // green('props', value.value)
  green('todo', todo)
  // const { value: todo } = value

  const { completed, title } = todo

  const [anchorEl, setAnchorEl] = useState(null)
  const [_completed, _setCompleted] = useState(completed)
  const [_title, _setTitle] = useState(title)
  const open = Boolean(anchorEl)

  const handleMoreClick = e => {
    setAnchorEl(e.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  /*
    - id
    - itemid
    - title

  */
  const handleMenuItemClick = (e, action) => {
    // green('id', e.target.id)
    // green('itemid', e.target.itemid)
    // green('title', e.target.title)
    setAnchorEl(null)
    green('action', action)
  }

  const handleCompleteClick = e => {
    const b = e.target.checked
    _setCompleted(b)
  }

  const handleTitleChange = e => {
    const t = e.target.value
    _setTitle(t)
  }

  return (
    <ItemContentWrapper>
      <Left>
        <Completed
          checked={_completed}
          onChange={handleCompleteClick}
          value="checkedA"
          inputProps={{
            'aria-label': 'primary checkbox'
          }}
          // new
          // disabled={true}
        />
        <Title
          // variant="filled"

          multiline={true}
          value={_title}
          onChange={handleTitleChange}
          // changes
          // label="Title"
          // disabled={true}
          placeholder="Title / description"
          required={true}
        />
        <DueDate />
      </Left>
      <Right>
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleMoreClick}
        >
          <MoreVertIcon />
        </IconButton>
        <More
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
        </More>
      </Right>
    </ItemContentWrapper>
  )
}

export default ItemContent
