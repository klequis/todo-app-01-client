import React from 'react'
import { sortableHandle } from 'react-sortable-hoc'
import styled from 'styled-components'
import DragHandleIcon from '@material-ui/icons/DragHandle'

const Handle = styled(DragHandleIcon)`
  /* width: 30px; */
  /* padding: 0 3px; */
  /* margin-right: 5px; */
  /* display: flex; */
  /* justify-content: center; */
  /* align-content: center; */
  /* flex-basis: 5%; */
  /* background-color: purple; */
`
const DragHandle = sortableHandle(() => <Handle />)

export default DragHandle