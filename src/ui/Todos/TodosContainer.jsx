import React, { useEffect, useState } from 'react'
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
import ItemContent from './ItemContent'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import { makeStyles } from '@material-ui/styles'
import AreYouSure from 'ui/AreYouSure'
import { mergeRight } from 'ramda'
import { isISO8601 } from 'validator'

// eslint-disable-next-line
import { green, red } from 'logger'

export const COMPLETED = 'completed'
export const TITLE = 'title'
export const DUE_DATE = 'dueDate'

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    minWidth: 130
  },
  todoList: {
    width: '100%'
  }
})

const TodosContainer = props => {
  const [modalOpen, setModalOpen] = useState(false)
  const [delId, setDelId] = useState()

  const classes = useStyles()
  const {
    todoCreateRequest,
    todoDeleteRequest,
    todosReadRequest,
    todos,
    todoUpdateRequest,
    userId
  } = props

  // green('todos', todos)
  // green('userId', userId)

  useEffect(() => {
    ;(async () => {
      try {
        if (userId) {
          await todosReadRequest(userId)
        }
      } catch (e) {
        console.log('TheError', e)
      }
    })()
  }, [userId, todosReadRequest])

  // const handleAreYouSureClose = (close) => {
  //   setAreYouSureOpen(false)
  //   if (close)
  // }

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
    green('handleDeleteTodo: todoId', todoId)
    setDelId(todoId)
    setModalOpen(true)
  }

  const deleteTodo = async () => {
    setModalOpen(false)
    try {
      await todoDeleteRequest(userId, delId)
    } catch (e) {
      red('App.handleDeleteTodo ERROR:', e)
    }
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  const updateTodo = (_id, field, value) => {

    green('updateTodo: _id', _id)
    green('updateTodo: field', field)
    green('updateTodo: value', value)

    // 1. get the todo
    // filter returns an array so use [0] to get first and only item
    const t1 = todos.filter(t => t._id === _id)[0]

    // 2. merge in new data
    const t2 = mergeRight(t1, { [field]: value })

    // 3. send request
    todoUpdateRequest(userId, _id, t2)
  }

  // This works but ...
  const zzupdateTodo = (_id, completed, dueDate, title) => {
    green('updateTodo: _id', _id)
    green('updateTodo: completed', completed)
    green('updateTodo: dueDate', dueDate)
    green('title', title)

    const isoDate = new Date(dueDate).toISOString()
    green('isISO8601', isISO8601(dueDate))
    // green('isoDate', isoDate)

    // 1. get the todo
    // filter returns an array so use [0] to get first and only item
    const t1 = todos.filter(t => t._id === _id)[0]
    // green('t1', t1)

    // 2. merge in new data
    const t2 = mergeRight(t1, { completed, dueDate, title })
    // green('t2', t2)

    // 3. send request
    todoUpdateRequest(userId, _id, t2)
  }

  return (
    <div id="todosContainer">
      <AreYouSure
        open={modalOpen}
        onYesAction={deleteTodo}
        onNoAction={closeModal}
      />
      <AddTodo handleAddTodo={handleAddTodo} />
      <List className={classes.todoList}>
        {todos.map((t, index) => (
          <ListItem /*className={classes.todoListItem}*/ key={t._id}>
            <ItemContent
              todo={t}
              updateTodo={updateTodo}
              handleDeleteTodo={handleDeleteTodo}
            />
          </ListItem>
        ))}
      </List>
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

export default compose(connect(mapStateToProps, actions))(TodosContainer)
