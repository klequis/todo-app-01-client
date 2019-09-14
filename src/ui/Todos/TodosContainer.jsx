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
import ItemContent from './ItemContent'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import { makeStyles } from '@material-ui/styles'

// eslint-disable-next-line
import { green, red } from 'logger'

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
  const classes = useStyles()
  const {
    todoCreateRequest,
    // todoDeleteRequest,
    todosReadRequest,
    todos,
    todoUpdateRequest,
    userId
  } = props
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

  const handleCompletedChange = async ({ todoId, completed }) => {
    // const { todoUpdateRequest } = props
    green('handleCompletedChange: todoId', todoId)
    green('handleCompletedChange: completed', completed)
    
    try {
      await todoUpdateRequest({
        userId,
        todoId,
        completed
      })
    } catch (e) {
      red('App.handleCompletedChange ERROR:', e)
    }
  }

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
      <List className={classes.todoList}>
        {todos.map((t, index) => (
          <ListItem /*className={classes.todoListItem}*/ key={t._id}>
            <ItemContent
              handleCompletedChange={handleCompletedChange}
              handleDateChange={handleDateChange}
              todo={t}
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

export default compose(
  connect(
    mapStateToProps,
    actions
  )
)(TodosContainer)
