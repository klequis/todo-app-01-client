import { fetchJson } from './api-helpers'
import { filter, mergeRight } from 'ramda'
// eslint-disable-next-line
import { orange, green } from 'logger'

const notUndefined = obj => obj !== undefined

// Errors are handled by fetchJson()
export default {
  todos: {
    async read(userId) {
      const data = await fetchJson(`api/todo/${userId}`, {
        method: 'GET'
      })
      return data
    },
    async readById(userId, todoId) {
      const data = await fetchJson(`api/todo/${userId}/${todoId}`, {
        method: 'GET'
      })
      return data
    },
    async create(userId, todo) {
      const data = await fetchJson(`api/todo/${userId}`, {
        method: 'POST',
        body: JSON.stringify(todo)
      })
      return data
    },
    async delete(userId, todoId) {
      const data = await fetchJson(`api/todo/${userId}/${todoId}`, {
        method: 'DELETE'
      })
      return data
    },
    async update({
      userId,
      todoId,
      title = undefined,
      completed = undefined,
      dueDate = undefined
    }) {
      const fieldsToUpdate = filter(notUndefined, { title, completed, dueDate })
      orange('fieldsToUpdate', fieldsToUpdate)
      const fieldsToSend = mergeRight(fieldsToUpdate, { _id: todoId, userId })
      orange('fieldsToSend', fieldsToSend)

      const data = await fetchJson(`api/todo/${userId}/${todoId}`, {
        method: 'PATCH',
        body: JSON.stringify(fieldsToSend)
      })
      return data
    }
  }
}
