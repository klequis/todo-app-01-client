import React, { useState } from 'react'
import { DatePicker } from '@material-ui/pickers'
import { isISO8601 } from 'validator'
import DateRange from '@material-ui/icons/DateRange'
import styled from 'styled-components'
import { makeStyles } from '@material-ui/styles'

import { green } from 'logger'


const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    minWidth: 130,
  }
  
})

const DueDate = ({ _id, handleDateChange, dueDate }) => {
  const [selectedDate, setSelectedDate] = useState(isISO8601(dueDate + '') ? dueDate : null)
  const [pickerOpen, setPickerOpen] = useState(false)
  
  const handlePickerOnChange = newDate => {
    green('DueDate: newDate', newDate)

    setSelectedDate(newDate)
    setPickerOpen(false)
    handleDateChange(_id, newDate)
  }

  const classes = useStyles()

  return (
    <div className={classes.wrapper}>
      <DatePicker
        autoOk
        format="MMM d, yyyy"
        variant="inline"
        value={selectedDate}
        onChange={handlePickerOnChange}
        InputProps={{
          disableUnderline: true
        }}
        //
        open={pickerOpen}
        onOpen={() => setPickerOpen(true)}
        onClose={() => setPickerOpen(false)}
      />
      <DateRange onClick={() => setPickerOpen(true)} />
    </div>
  )
  
}

export default DueDate