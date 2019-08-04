import { fetchJson } from './api-helpers'
// eslint-disable-next-line
import { orange, green } from 'logger'

const rootUrl = ''

// Errors are handled by fetchJson()
export default {
  todos: {
    async read() {
      const data = await fetchJson(`${rootUrl}/api/todo`, {
        method: 'GET'
      })
      return data
    },
    async readById(id) {
      const data = await fetchJson(`${rootUrl}/api/todo/${id}`, {
        method: 'GET'
      })
      return data
    },
    async create(todo) {
      orange('api: create called')
      const data = await fetchJson(`${rootUrl}/api/todo`, {
        method: 'POST',
        body: JSON.stringify(todo)
      })
      orange('api: create done')
      return data.data
    },
    async delete(_id) {
      orange('api.todos.delete: _id', _id)
      const data = await fetchJson(`${rootUrl}/api/todo/${_id}`, {
        method: 'DELETE'
      })
      return data
    },
    async update(todo) {
      const data = await fetchJson(`${rootUrl}/api/todo`, {
        method: 'PATCH',
        body: JSON.stringify(todo)
      })
      return data.data
    }
  }
}