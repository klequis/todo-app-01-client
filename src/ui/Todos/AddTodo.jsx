import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { todoCreateRequest } from 'store/todo/actions'
import { getValidationErrors } from 'store/validation/selectors'
import { append } from 'ramda'

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
      const err = {
        param: 'title',
        msg: 'title must be at least 3 characters'
      }
      const errs = append(err, validationErrors)
      green('errs', errs)
      setValidationErrors(errs)
      green('validationErrors', validationErrors)
    }
  }

  const serverErrs = useSelector(getValidationErrors)
  const getServerValidationError = (paramName) => {
    return serverErrs.find(e => e.param === paramName)
  }

  const errs = useSelector(getValidationErrors)

  useEffect(() => setValidationErrors(errs), [errs, setValidationErrors])
  // green('err', serverErrors)


  // So I have introduced a rule that I'm not fond of
  // id === nameOfTodoField === nameOfParamSentToServer
  // I could create a mapping to make it explicit but 
  // that is going further than I want to right now

  return (
    <form style={formStyle} onSubmit={handleOnSubmit}>
      <input
        id="title"
        onChange={handleInputChange}
        type="text"
        value={title}
        onBlur={handleOnBlur}
      />
      <div>
        {
          validationErrors.map(e => <div>{e.msg}</div>)
        }
      </div>
      {/* <label>{validationError}</label> */}
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
