import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
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
    todoDeleteRequest,
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
    // eslint-disable-next-line
  }, [userId])

  const createTodo = async title => {
    try {
      // TODO: Temp code re dueDate
      const dueDate = new Date().toISOString()
      await todoCreateRequest(userId, { title, dueDate, userId })
    } catch (e) {
      red('App.createTodo ERROR:', e)
    }
  }

  const deleteTodo = async ({ todoId }) => {
    green('deleteTodo: todoId', todoId)
    try {
      green('trying')
      await todoDeleteRequest(userId, todoId)
    } catch (e) {
      red('App.deleteTodo ERROR:', e)
    }
  }


  const updateTodo = async ({ todoId, completed, title, dueDate }) => {
    green('updateTodo', `todoId=${todoId}, completed=${completed}, title=${title}, dueDate=${dueDate}`)
    try {
      await todoUpdateRequest({
        userId,
        todoId,
        completed,
        title,
        dueDate
      })
    } catch (e) {
      red('App.updateCompleted ERROR:', e)
    }
  }


  if (todos.length === 0) {
    return null
  }

  return (
    <div id="todosContainer">
      <AddTodo handleAddTodo={createTodo} />
      <List className={classes.todoList}>
        {todos.map((t, index) => (
          <ListItem /*className={classes.todoListItem}*/ key={t._id}>
            <ItemContent
              deleteTodo={deleteTodo}
              updateTodo={updateTodo}
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
