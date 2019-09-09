import React, { useState } from 'react'
import { sortableContainer, sortableElement } from 'react-sortable-hoc'
import arrayMove from 'array-move'
import styled from 'styled-components'
import ItemContent from './ItemContent'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import { mergeRight } from 'ramda'
import { green } from 'logger'


const TodoList = styled(List)`
  background-color: #f3f3fe;
  width: 100%;
`

const TodoListItem = styled(ListItem)`
`

const SortableContainer = sortableContainer(({ children }) => {
  return <TodoList id="TodoList">{children}</TodoList>
})

const SortableItem = sortableElement(value => (
  <TodoListItem>
    <ItemContent value={value} />
  </TodoListItem>
))

const Todos = ({ todos }) => {
  const [_todos, _setTodos] = useState(todos)

  const onSortEnd = async ({ oldIndex, newIndex }) => {
    green('oldIndex', oldIndex)
    green('newIndex', newIndex)
    const newOrder = arrayMove(_todos, oldIndex, newIndex).map((t, index) => 
      mergeRight(t, { orderIndex: index })
    )
    green('newOrder', newOrder)
    _setTodos(newOrder)
  }

  return (
    <div>
      <SortableContainer onSortEnd={onSortEnd} useDragHandle>
        {_todos.map((t, index) => (
          <SortableItem key={t._id} index={index} value={t} />
        ))}
      </SortableContainer>
    </div>
  )
}

export default Todos

