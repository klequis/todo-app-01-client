import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Todos from './Todos'
import AddTodo from './AddTodo'
import {
  todoCreateRequest,
  todoDeleteRequest,
  todosReadRequest,
  todoUpdateRequest
} from 'store/todo/actions'
import { getAllTodos } from 'store/todo/selectors'
import config from 'config'
// eslint-disable-next-line
import { green, red } from 'logger'

const TodosContainer = props => {
  // green('TodosContainer')
  const {
    todoCreateRequest,
    todoDeleteRequest,
    todosReadRequest,
    todos,
    todoUpdateRequest
  } = props
  
  useEffect(() => {
    ;(async () => {
      try {
        const { testUserId } = config.auth0
        green('testUserId', testUserId)
        await todosReadRequest(testUserId)
      } catch (e) {
        console.log('TheError', e)
      }
    })()
  }, [todosReadRequest])

  const handleAddTodo = async title => {
    try {
      await todoCreateRequest({ title })
    } catch (e) {
      red('App.handleAddTodo ERROR:', e)
    }
  }

  const handleDeleteTodo = async id => {
    // green('App.handleDeleteTodo: id', id)
    try {
      await todoDeleteRequest(id)
    } catch (e) {
      red('App.handleDeleteTodo ERROR:', e)
    }
  }

  const handleCompletedChange = async todo => {
    // green('handleCompletedChange: todo', todo)
    try {
      await todoUpdateRequest(todo)
    } catch (e) {
      red('App.handleCompletedChange ERROR:', e)
    }
  }
  return (
    <div>
      <AddTodo
        handleAddTodo={handleAddTodo}
      />
      <Todos
        todos={todos}
        handleCompletedChange={handleCompletedChange}
        handleDeleteTodo={handleDeleteTodo}
      />
    </div>
  )
}

const actions = { todoCreateRequest, todoDeleteRequest, todosReadRequest, todoUpdateRequest }

const mapStateToProps = state => {
  return {
    todos: getAllTodos(state)
  }
}

export default connect(
  mapStateToProps,
  actions
)(TodosContainer)

