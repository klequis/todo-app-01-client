import React, { useState } from 'react'
import { DatePicker } from '@material-ui/pickers'
import { isISO8601 } from 'validator'
import DateRange from '@material-ui/icons/DateRange'
import styled from 'styled-components'

import { green } from 'logger'

const Picker = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 130px;
`;

const DueDate = ({ _id, handleDateChange, dueDate }) => {
  const [selectedDate, setSelectedDate] = useState(isISO8601(dueDate + '') ? dueDate : null)
  const [pickerOpen, setPickerOpen] = useState(false)
  
  const handlePickerOnChange = newDate => {
    green('DueDate: newDate', newDate)

    setSelectedDate(newDate)
    setPickerOpen(false)
    handleDateChange(_id, newDate)
  }

  return (
    <Picker>
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
        style={{ backgroundColor: 'red' }}
      />
      <DateRange style={{backgroundColor: 'blue'}} onClick={() => setPickerOpen(true)} />
    </Picker>
  )
  
}

export default DueDate