import React, { useState } from 'react'
import Todo from './Todo'
// eslint-disable-next-line
import { green } from 'logger'
import styled from 'styled-components'

const ColumnLabels = styled.div`
  display: flex;
  flex-flow: row nowrap;
  padding: 10px 10px 5px 10px;
`

const ColumnLabel = styled.div`
  text-align: center;
  padding: 5px;
`


const Todos = props => {
  const { busy, handleCompletedChange, handleDeleteTodo, todos } = props
  const [bla, setBla] = useState(todos)
  green('bla', bla)
  // green('TodoList: todos', todos)
  return (
    <div id="TodoList">
      <div id="numTodos">Number of Todos: ({todos.length})</div>
      <ColumnLabels>
        <ColumnLabel>Done</ColumnLabel>
        <ColumnLabel>Title</ColumnLabel>
        <ColumnLabel>Due</ColumnLabel>
      </ColumnLabels>
      <div id="todos-map">
        {todos.map(t => (
          <Todo
            key={t._id}
            busy={busy}
            handleDeleteTodo={handleDeleteTodo}
            handleCompletedChange={handleCompletedChange}
            todo={t}
          />
        ))}
      </div>
    </div>
  )
}

export default Todos
