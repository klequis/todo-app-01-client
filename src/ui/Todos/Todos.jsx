import React from 'react'
import Todo from './Todo'
// eslint-disable-next-line
import { green } from 'logger'

const todoListStyle = {
  paddingTop: '1em'
}

const TodoList = props => {
  const { busy, handleCompletedChange, handleDeleteTodo, todos } = props
  // green('TodoList: todos', todos)
  return (
    <div id="TodoList">
      <div id="numTodos">Number of Todos: ({todos.length})</div>
      <div id="todos-map" style={todoListStyle}>
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

export default TodoList
