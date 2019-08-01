import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { todoCreateRequest } from 'store/todo/actions'
import { getValidationErrors } from 'store/validation/selectors'
import { append, remove } from 'ramda'

// eslint-disable-next-line
import { green, red } from 'logger'

const formStyle = {
  margin: '20px 0 60px 0'
}

const buttonStyle = {
  margin: '0 5px 0 5px'
}

const AddTodo = () => {
  const [title, setTitle] = useState('')
  const [validationErrors, setValidationErrors] = useState([])
  const dispatch = useDispatch()
  const serverValidationErrors = useSelector(getValidationErrors)

  const setError = (field, message = '') => {
    const errs0 = validationErrors
    const idx = errs0.findIndex(e => e.field === field)
    let errs1
    if (idx > -1) {
      errs1 = remove(idx, 1, errs0)
    }
    if (message !== '') {
      setValidationErrors(append({ field, message }, errs1))
    } else {
      setValidationErrors(errs1)
    }
  }

  const getError = field => {
    const err = validationErrors.find(e => e.field === field)
    if (err) {
      return err.message
    } else {
      return ''
    }
  }

  const handleInputChange = e => {
    setTitle(e.target.value)
  }

  const handleOnSubmit = e => {
    e.preventDefault()
    try {
      dispatch(todoCreateRequest({ title }))
      setTitle('')
    } catch (e) {
      red('AddTodo.handleOnSubmit ERROR:', e)
    }
  }

  const handleOnBlur = e => {
    const val = e.target.value.trim()
    if (val.length < 3) {
      setError('title', 'CLIENT: Title must be at least 3 characters')
    } else {
      setError('title', '')
    }
  }

  useEffect(
    () => serverValidationErrors.forEach(e => setError(e.param, e.msg)),
    [serverValidationErrors]
  )

  green('client validationErrors', validationErrors)
  return (
    <form style={formStyle} onSubmit={handleOnSubmit}>
      <input
        id="title"
        onChange={handleInputChange}
        type="text"
        value={title}
        onBlur={handleOnBlur}
      />
      <br />
      <label>{getError('title')}</label>
      <br />
      <button style={buttonStyle} type="submit">
        Add
      </button>
      <button style={buttonStyle} type="button">
        Cancel
      </button>
    </form>
  )
}

export default AddTodo
