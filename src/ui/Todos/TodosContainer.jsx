import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
// import Todos from './Todos'
import AddTodo from './AddTodo'
import {
  todoCreateRequest,
  todoDeleteRequest,
  todosReadRequest,
  todoUpdateRequest
} from 'store/todo/actions'
import { getAllTodos } from 'store/todo/selectors'
import { getUserId } from 'store/user/selectors'


// new
import styled from 'styled-components'
import ItemContent from './ItemContent'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'

// eslint-disable-next-line
import { green, red } from 'logger'


const TodoList = styled(List)`
  /* background-color: #f3f3fe; */
  width: 100%;
`

const TodoListItem = styled(ListItem)``

const TodosContainer = props => {
  const {
    todoCreateRequest,
    // todoDeleteRequest,
    todosReadRequest,
    todos,
    // todoUpdateRequest,
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
    // eslint-disable-next-line
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

  // const handleDeleteTodo = async todoId => {
  //   try {
  //     await todoDeleteRequest(userId, todoId)
  //   } catch (e) {
  //     red('App.handleDeleteTodo ERROR:', e)
  //   }
  // }

  // const handleCompletedChange = async todo => {
    
  //   try {
  //     const todoId = todo._id
  //     await todoUpdateRequest(userId, todoId, todo)
  //   } catch (e) {
  //     red('App.handleCompletedChange ERROR:', e)
  //   }
  // }

  const handleDateChange = (_id, newDate) => {
    green('handleDateChange: _id', _id)
    green('handleDateChange: newDate', newDate)
    const isoDate = new Date(newDate).toISOString()
    green('isoDate', isoDate)

    // 1. get the todo
    // 2. merge in new date
    // 3. send request
  }

  if (todos.length === 0) {
    return null
  }

  return (
    <div id="todosContainer">
      <AddTodo handleAddTodo={handleAddTodo} />
      <TodoList>
        {todos.map((t, index) => (
          <TodoListItem key={t._id}>
            {/* {t.mode === 'view' ? <ItemContent todo={t} /> : null} */}
            <ItemContent handleDateChange={handleDateChange} todo={t} />
          </TodoListItem>
        ))}
      </TodoList>
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
