import React, { useState } from 'react'
import styled from 'styled-components'
// import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreVertIcon from '@material-ui/icons/MoreVert'
// import { format } from 'date-fns'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'

// import DueDateView from './DueDateView'
// import DueDateEdit from './DueDateEdit'
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

const ItemContentWrapper = styled(Paper)`
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
  flex-basis: 5%;
  &&:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`

const TitleView = styled.div`
  flex-basis: 80%;
  /* background-color: orange; */
`

const TitleEdit = styled(TextField)`
  flex-basis: 100%;
  /* background-color: orange; */
`

const DueDateWrapper = styled.div`
  flex-basis: 20%;
  /* text-align: center; */
  display: flex;
  justify-content: center;
  
  /* background-color: green; */

`;

// Right side
const Right = styled.div`
  /* background-color: blue; */
`

const More = styled(Menu)`
  /* background-color: yellow; */
`

const ItemContent = ({ handleDateChange, todo }) => {
  // green('todo', todo)

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
          // , backgroundColor: 'blue'
          style={{ color: 'white' }}
        />

        {mode === 'view' ? (
          <TitleView>{_title}</TitleView>
        ) : (
          <TitleEdit
            multiline={true}
            value={_title}
            onChange={handleTitleChange}
            placeholder="Title / description"
            required={true}
          />
        )}
        <DueDateWrapper>
          <DueDate
            _id={_id}
            handleDateChange={handleDateChange}
            dueDate={dueDate}
          />
        </DueDateWrapper>
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
