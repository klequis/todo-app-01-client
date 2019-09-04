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
        await todosReadRequest(userId)
      } catch (e) {
        console.log('TheError', e)
      }
    })()
  }, [todosReadRequest, userId])

  const handleAddTodo = async title => {
    try {
      await todoCreateRequest(userId, { title })
    } catch (e) {
      red('App.handleAddTodo ERROR:', e)
    }
  }

  const handleDeleteTodo = async id => {
    try {
      await todoDeleteRequest(id)
    } catch (e) {
      red('App.handleDeleteTodo ERROR:', e)
    }
  }

  const handleCompletedChange = async todo => {
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
    todos: getAllTodos(state),
    userId: getUserId(state)
  }
}

export default connect(
  mapStateToProps,
  actions
)(TodosContainer)

