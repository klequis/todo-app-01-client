import React, { useState } from 'react'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { sortableHandle } from 'react-sortable-hoc'
import DragHandleIcon from '@material-ui/icons/DragHandle'
import DueDate from './DueDate'

import { green } from 'logger'

const options = ['One', 'Two']
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

const Handle = styled.div`
  /* margin-right: 5px; */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  flex-basis: 5%;
  background-color: #ebebeb;
  /* background-color: purple; */
  &:hover {
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.7);
    background-color: blue;
  }
`

const Completed = styled(Checkbox)`
  /* background-color: blue; */
  flex-basis: 5%;
`

const Title = styled(TextField)`
  flex-basis: 100%;
  /* background-color: orange; */
`



const DragHandle = sortableHandle(() => <Handle><DragHandleIcon /></Handle>)


// Right side
const Right = styled.div`
  /* background-color: blue; */
`

const More = styled(Menu)`
  /* background-color: yellow; */
`


const ItemContent = ({ value }) => {
  // Seems odd the way this is sent by react-sortable-hoc
  // Am receiving a prop named 'value' which has a property 'value'
  // and that contains the passed in data, in this case a todo
  // const { value } = value
  // green('props', value.value)

  const { value: todo } = value

  const { completed, title } = todo
  
  const [anchorEl, setAnchorEl] = useState(null)
  const [_completed, _setCompleted] = useState(completed)
  const [_title, _setTitle] = useState(title)
  const open = Boolean(anchorEl)

  const handleValueChange = e => {
    const val = e.target.value
    console.log('val', val)
    // _setValue(e.target.value)
  }

  const handleMoreClick = e => {
    setAnchorEl(e.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleCompleteClick = (e) => {
    const b = e.target.checked
    _setCompleted(b)
  }

  const handleTitleChange = (e) => {
    const t = e.target.value
    _setTitle(t)
  }

  
  return (
    <ItemContentWrapper>
      <Left>
        <DragHandle />
        <Completed
          checked={_completed}
          onChange={handleCompleteClick}
          value="checkedA"
          inputProps={{
            'aria-label': 'primary checkbox'
          }}
        />
        <Title
          // variant="filled"
          label="Title"
          multiline={true}
          value={_title}
          onChange={handleTitleChange}
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
          {options.map(option => (
            <MenuItem
              key={option}
              selected={option === 'Pyxis'}
              onClick={handleClose}
            >
              {option}
            </MenuItem>
          ))}
        </More>
      </Right>
    </ItemContentWrapper>
  )
}

export default ItemContent