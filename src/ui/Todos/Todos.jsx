import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import withStyles from 'react-jss'
import {
  todoDeleteRequest,
  todosReadRequest,
  todoUpdateRequest
} from 'store/todo/actions'
import { getAllTodos } from 'store/todo/selectors'
import { getUserId } from 'store/user/selectors'
import AddTodo from './AddTodo'
import Todo from './Todo'
// eslint-disable-next-line
import { green, red } from 'logger'

const todoListStyle = {
  paddingTop: '1em'
}

const TodoList = props => {

  const { userId, todos } = props
  useEffect(() => {
    todosReadRequest(userId)
  }, [userId])

  const handleDeleteTodo = async id => {
    try {
      todoDeleteRequest(userId, id)
    } catch (e) {
      red('App.handleDeleteTodo ERROR:', e)
    }
  }

  const handleCompletedChange = async todo => {
    try {
      todoUpdateRequest(userId, todo._id, todo)
    } catch (e) {
      red('App.handleCompletedChange ERROR:', e)
    }
  }


  return (
    <>
      <AddTodo />
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
    </>
  )
}

const styles = {
  wrapper: {
    minWidth: 320
  }
}

const actions = {
  todoDeleteRequest,
  todosReadRequest,
  todoUpdateRequest
}

const mstp = state => {
  return {
    userId: getUserId(state),
    todos: getAllTodos(state)
  }
}

export default compose(
  withStyles(styles),
  connect(mstp, actions)
)(TodoList)
