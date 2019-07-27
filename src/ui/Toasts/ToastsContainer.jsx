import React from 'react'
import { connect } from 'react-redux'
import { setToast, clearToast } from 'store/toast/actions'
import { getToast } from 'store/toast/selectors'
import Toast from './Toast'

import { green } from 'logger'

const ToastsContainer = ({ clearToast, toast }) => {
  return (
    <div>
      {toast && (
        <Toast
          clearToast={clearToast}
          error={toast.error.statusText}
          key={toast.id}
          level={toast.level}
          message={toast.message}
        />
      )}
    </div>
  )
}

const mstp = state => ({
  toast: getToast(state)
})

const actions = { setToast, clearToast }

export default connect(
  mstp,
  actions
)(ToastsContainer)
