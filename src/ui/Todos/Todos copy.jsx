import React, { useState, useEffect } from 'react'
import {
  sortableContainer,
  sortableElement,
} from 'react-sortable-hoc'
import arrayMove from 'array-move'
import styled from 'styled-components'
import ItemContent from './ItemContent'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import { green } from 'logger'

const TodoList = styled(List)`
  /* list-style: none;
  position: relative;
  z-index: 0;
  
  border: 1px solid #efefef;
  outline: none;
  user-select: none;
  color: #333;
  font-weight: 300;
  margin-block-start: 0;
  margin-block-end: 0; */
  background-color: #f3f3fe;
  width: 100%;
`

const TodoListItem = styled(ListItem)`
  /* -webkit-box-align: center; */
  /* align-items: center; */
  /* background-color: #fff; */
  /* box-sizing: border-box; */
  /* display: flex; */
  /* margin-bottom: 5px; */
  /* padding: 0 20px; */
  /* position: relative; */
  /* width: 100%; */
  /* :first-child {
    margin-top: 5px;
  } */
  /* background-color: blue; */
  /* width: 100%; */
`

const SortableContainer = sortableContainer(({ children }) => {
  return <TodoList id='TodoList'>{children}</TodoList>
})

const SortableItem = sortableElement(todo => (
  <TodoListItem>
    {/* <DragHandle /> */}
    <ItemContent todo={todo} />
  </TodoListItem>
))

const Todos = (props) => {
  const { todos } = props
  
  
  // green('todos', todos)
  // const initItems = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6']
  // const [items, setItems] = useState(initItems)
  const [_todos, _setTodos] = useState(todos)
  // green('_todos', _todos)
  // _setTodos(todos)

  // useEffect(() => {
  //   _todos.map(t => console.log(t))
  // })

  if (todos.length === 0) {
    return null
  } else {
    green('props', props)
    green('todos', todos)
    green('_todos', _todos)
  }
  const onSortEnd = ({ oldIndex, newIndex }) => {
    const newOrder = arrayMove(_todos, oldIndex, newIndex)
    _setTodos(newOrder)
  }

  return (
    <SortableContainer onSortEnd={onSortEnd} useDragHandle>
      {_todos.map((todo, index) => (
        <SortableItem key={todo._id} index={index} value={todo} />
      ))}
    </SortableContainer>
  )
}

export default Todos

