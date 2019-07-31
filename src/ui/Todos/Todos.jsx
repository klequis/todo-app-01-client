import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import withStyles from 'react-jss'
import {
  todoDeleteRequest,
  todosReadRequest,
  todoUpdateRequest
} from 'store/todo/actions'
import { getAllTodos } from 'store/todo/selectors'
import AddTodo from './AddTodo'
import Todo from './Todo'
// eslint-disable-next-line
import { green, red } from 'logger'

const todoListStyle = {
  paddingTop: '1em'
}

const TodoList = props => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(todosReadRequest())
  }, [dispatch])

  const handleDeleteTodo = async id => {
    try {
      dispatch(todoDeleteRequest(id))
    } catch (e) {
      red('App.handleDeleteTodo ERROR:', e)
    }
  }

  const handleCompletedChange = async todo => {
    try {
      dispatch(todoUpdateRequest(todo))
    } catch (e) {
      red('App.handleCompletedChange ERROR:', e)
    }
  }

  const todos = useSelector(getAllTodos)

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

export default withStyles(styles)(TodoList)
