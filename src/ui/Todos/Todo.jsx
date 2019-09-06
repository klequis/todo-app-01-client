import React, { useState } from 'react'
import { mergeRight } from 'ramda'
import { format } from 'date-fns'
import styled from 'styled-components'
// eslint-disable-next-line
import { green } from 'logger'

const TodoWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
`

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: orange;
  padding: 0 10px;
`

const Row = styled.div`
  display: flex;
  flex-flow: row nowrap;
  padding: 5px 10px;
`

const Cell = styled.div`
  text-align: center;
  padding: 0 10px;
`

const Todo = props => {
  // green('props', props)
  const {
    completed,
    _id,
    title,
    // createdAt,
    dueDate
    // lastUpdatedAt,
    // userId
  } = props.todo
  const { handleCompletedChange, handleDeleteTodo } = props
  const [_completed, _setCompleted] = useState(completed)

  const [disabled, setDisabled] = useState(false)

  const handleDeleteClick = () => {
    // are you sure?
    // if yes, do it
    setDisabled(true)
    handleDeleteTodo(_id)
  }

  const handleCompletedClick = e => {
    const checked = e.target.checked
    _setCompleted(checked)
    const { todo } = props
    const newTodo = mergeRight(todo, { completed: checked })
    handleCompletedChange(newTodo)
  }

  const fields = [
    {
      label: 'Title',
      field: title
    },
    {
      label: 'Due Date',
      field: format(new Date(dueDate), 'MMM d, yyyy')
    }
  ]

  return (
    <TodoWrapper>
      <InputWrapper>
        <input
          type="checkbox"
          checked={_completed}
          onChange={handleCompletedClick}
        />
      </InputWrapper>

      <Row>
        {fields.map(f => (
          <Cell key={f.label}>{f.field}</Cell>
        ))}
      </Row>
      <button onClick={handleDeleteClick} disabled={disabled}>
        Del
      </button>
    </TodoWrapper>
  )
}

export default Todo

// const styles = {
//   field: {

//   },
//   todo: {
//     marginBottom: '1em',
//     display: 'flex',
//     backgroundColor: 'blue'
//   },
//   row: {
//     display: 'flex',
//     flexFlow: 'row nowrap',
//     backgroundColor: 'green'
//   },
//   label: {
//     flexBasis: '15%',
//     textAlign: 'right'
//   },
//   data: {
//     flexBasis: '70%',
//     paddingLeft: '10px'
//   },
//   button: {
//     backgroundColor: 'green',
//     '&disabled': {
//       backgroundColor: 'red'
//     }
//   }
// }



// const fields = [
//   {
//     label: '_id',
//     field: _id
//   },
//   {
//     label: 'Title',
//     field: title
//   },
//   {
//     label: 'Completed',
//     field: completed ? 'yes' : 'no'
//   },
//   {
//     label: 'Created',
//     field: format(new Date(createdAt), 'MMM d, yyyy')
//   },
//   {
//     label: 'Due Date',
//     field: format(new Date(dueDate), 'MMM d, yyyy')
//   },
//   {
//     label: 'Last Updated',
//     field: format(new Date(lastUpdatedAt), 'MMM d, yyyy')
//   },
//   {
//     label: 'User ID',
//     field: userId
//   }
// ]
