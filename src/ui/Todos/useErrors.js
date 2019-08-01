import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { append, remove } from 'ramda'
import { green } from 'logger'

export const useErrors = selector => {
  const [validationErrors, setValidationErrors] = useState([])

  const setError = (field, message = '') => {
    const errs0 = validationErrors
    const idx = errs0.findIndex(e => e.field === field)
    let errs1
    if (idx > -1) {
      errs1 = remove(idx, 1, errs0)
    }
    if (message !== '') {
      setValidationErrors(
        append(
          {
            field,
            message
          },
          errs1
        )
      )
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

  const serverValidationErrors = useSelector(selector)

  /*
      Server errors are { param: [string], msg: [string] }
      When set to set error it will be { field: [string], message: [string] } 
        in the validationErrors state variable
  */
  useEffect(
    () => serverValidationErrors.forEach(e => setError(e.param, e.msg)),
    [serverValidationErrors]
  )

  // green('validationErrors', validationErrors)

  return {
    setError: (...p) => setError(...p),
    getError: (...p) => getError(...p)
  }
}
