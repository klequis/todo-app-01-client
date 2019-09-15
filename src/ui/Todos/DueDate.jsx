import React, { useState } from 'react'
import { DatePicker } from '@material-ui/pickers'
import { isISO8601 } from 'validator'
import DateRange from '@material-ui/icons/DateRange'
import { makeStyles } from '@material-ui/styles'
import IconButton from '@material-ui/core/IconButton'
import { toString } from 'lib/toString'
import { green } from 'logger'

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    minWidth: 130
  }
})

const DueDate = ({ handleDueDateChange, dueDate, className: userClasses }) => {
  
  const [pickerOpen, setPickerOpen] = useState(false)
  const classes = useStyles()

  return (
    <div className={classes.wrapper}>
      <DatePicker
        autoOk
        format="MMM d, yyyy"
        variant="inline"
        value={isISO8601(toString(dueDate)) ? dueDate : null}
        onChange={handleDueDateChange}
        className={userClasses}
        InputProps={{
          disableUnderline: true
        }}
        open={pickerOpen}
        onOpen={() => setPickerOpen(true)}
        onClose={() => setPickerOpen(false)}
        style={{ backgroundColor: 'orange' }}
      />
      <IconButton size="small" onClick={() => setPickerOpen(true)}>
        <DateRange style={{ backgroundColor: 'purple' }} />
      </IconButton>
    </div>
  )
}

export default DueDate
