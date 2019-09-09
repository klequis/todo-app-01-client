import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import Todos from './Todos'
import AddTodo from './AddTodo'
import {
  todoCreateRequest,
  todoDeleteRequest,
  todosReadRequest,
  todoUpdateRequest
} from 'store/todo/actions'
import { getAllTodos } from 'store/todo/selectors'
import { getUserId } from 'store/user/selectors'

// eslint-disable-next-line
import { green, red } from 'logger'

const TodosContainer = props => {
  const {
    todoCreateRequest,
    todoDeleteRequest,
    todosReadRequest,
    todos,
    todoUpdateRequest,
    userId
  } = props
  useEffect(() => {
    ;(async () => {
      try {
        // green('userId', userId)
        if (userId) {
          await todosReadRequest(userId)
        }
      } catch (e) {
        console.log('TheError', e)
      }
    })()
  }, [userId])

  const handleAddTodo = async title => {
    try {
      // TODO: Temp code re dueDate
      const dueDate = new Date().toISOString()
      await todoCreateRequest(userId, { title, dueDate, userId })
    } catch (e) {
      red('App.handleAddTodo ERROR:', e)
    }
  }

  const handleDeleteTodo = async todoId => {
    try {
      await todoDeleteRequest(userId, todoId)
    } catch (e) {
      red('App.handleDeleteTodo ERROR:', e)
    }
  }

  const handleCompletedChange = async todo => {
    
    try {
      const todoId = todo._id
      await todoUpdateRequest(userId, todoId, todo)
    } catch (e) {
      red('App.handleCompletedChange ERROR:', e)
    }
  }
  if (todos.length === 0) {
    return null
  }
  return (
    <div id='todosContainer'>
      {/* <AddTodo handleAddTodo={handleAddTodo} /> */}
      <Todos
        // todos={[{ title: 'one' }, { title: 'two' }]}
        todos={todos}
        handleCompletedChange={handleCompletedChange}
        handleDeleteTodo={handleDeleteTodo}
      />
    </div>
  )
}

const actions = {
  todoCreateRequest,
  todoDeleteRequest,
  todosReadRequest,
  todoUpdateRequest
}

const mapStateToProps = state => {
  return {
    todos: getAllTodos(state),
    userId: getUserId(state)
  }
}

export default compose(
  connect(mapStateToProps, actions)
)(TodosContainer)
