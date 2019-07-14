import React from 'react'
import withStyles, { WithStyles } from 'react-jss'
import Todo from './Todo'
// eslint-disable-next-line
import { green } from 'logger'

const todoListStyle = {
  paddingTop: '1em'
}

const TodoList = props => {
  const { handleCompletedChange, handleDeleteTodo, todos } = props
  return (
    <div style={todoListStyle}>
      <h4>Your Todos</h4>
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

const styles = {
  wrapper: {
    minWidth: 320
  }
}

export default withStyles(styles)(TodoList)
