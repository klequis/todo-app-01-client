import { fetchJson } from './api-helpers'
// eslint-disable-next-line
import { orange, green } from 'logger'

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
    async update(userId, todoId, todo) {
      orange('api.update: userId', userId)
      orange('api.update: todoId', todoId)
      orange('api.update: todo', todo)
      const data = await fetchJson(`api/todo/${userId}/${todoId}`, {
        method: 'PATCH',
        body: JSON.stringify(todo)
      })
      return data
    }
  }
}