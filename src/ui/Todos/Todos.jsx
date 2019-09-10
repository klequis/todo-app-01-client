import React from 'react'
import styled from 'styled-components'
import ItemContent from './ItemContent'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import { green } from 'logger'

const TodoList = styled(List)`
  /* background-color: #f3f3fe; */
  width: 100%;
`

const TodoListItem = styled(ListItem)``

const Todos = ({ todos }) => {
  return (
    <TodoList>
      {todos.map((t, index) => (
        <TodoListItem key={t._id}>
          <ItemContent todo={t} />
        </TodoListItem>
      ))}
    </TodoList>
  )
}

export default Todos
