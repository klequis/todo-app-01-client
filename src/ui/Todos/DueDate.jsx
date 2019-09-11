import React, { useState } from 'react'
// import styled from 'styled-components'
// import { format } from 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'
import { isValid } from 'date-fns'
// import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import { isISO8601 } from 'validator'
import DateRange from '@material-ui/icons/DateRange'
import { green } from 'logger'
// import { setValidationErrors } from 'store/validation/actions'
// import DateRange from '@material-ui/icons/DateRange'

// const VIEW_MODE = 'view'
// const EDIT_MODE = 'edit'

const DueDate = ({ _id, handleDateChange, dueDate }) => {
  const [selectedDate, setSelectedDate] = useState(dueDate)
  
  green('dueDate', isISO8601(dueDate + ''))
  const handlePickerOnChange = newDate => {
    setSelectedDate(newDate)
  }

  return (
      <>
      {isISO8601(dueDate + '') ? (
        <DatePicker
          autoOk
          format="MMM d, yyyy"
          variant="inline"
          value={selectedDate}
          onChange={handlePickerOnChange}
          InputProps={{
            disableUnderline: true
          }}
        />
      ) : (
        <DateRange />
      )}
      </>
  )
  
}

export default DueDate


/* <DatePicker
          animateYearScrolling
          autoOk
          disableToolbar
          format='MMM d, yyyy'
          onClose={handlePickerClose}
          onChange={handlePickerOnChange}
          open={pickerOpen}
          value={selectedDate}
          variant="inline"
        /> */

////////////////////////////////////

/* <ClickAwayListener onClickAway={handleClickAway}> */

/* <div> */

// <DatePicker
// value={date}
// onChange={handlePickerOnChange}
// disableToolbar
// variant="inline"
// format="MM/dd/yyyy"
// margin="none"
// id="date-picker-inline"
// open={pickerOpen}
// onClose={() => handleOnEvents('onClose')}
// onAccept={() => handleOnEvents('onAccept')}
// onBlur={() => handleOnEvents('onBlur')}
// onError={() => handleOnEvents('onError')}
// onOpen={() => handleOnEvents('onOpen')}
// KeyboardButtonProps={{
//   'aria-label': 'change date'
// }}
// />
/* </div> */

/* </ClickAwayListener> */
