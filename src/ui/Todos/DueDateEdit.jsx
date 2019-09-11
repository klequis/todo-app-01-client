import 'date-fns'
import React from 'react'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers'

const DueDateEdit = ({ handleDateChange, dueDate}) => {
  
  // const [selectedDate, setSelectedDate] = React.useState(
  //   new Date('2014-08-18T21:11:54')
  // )

  function handleDateChange(date) {
    handleDateChange(date)
  }

  

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        format="MM/dd/yyyy"
        margin="none"
        id="date-picker-inline"
        value={dueDate}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          'aria-label': 'change date'
        }}
      />
    </MuiPickersUtilsProvider>
  )
}

export default DueDateEdit