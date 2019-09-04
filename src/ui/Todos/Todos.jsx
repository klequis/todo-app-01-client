import React from 'react'
import Todo from './Todo'
// eslint-disable-next-line
import { green } from 'logger'

const todoListStyle = {
  paddingTop: '1em'
}

const TodoList = props => {
  const { handleCompletedChange, handleDeleteTodo, todos } = props
  // green('TodoList: todos', todos)
  return (
    <div style={todoListStyle}>
      {todos.map(t => (
        <Todo
          handleDeleteTodo={handleDeleteTodo}
          handleCompletedChange={handleCompletedChange}
          key={t._id}
          todo={t}
        />
      ))}
    </div>
  )
}

export default TodoList
