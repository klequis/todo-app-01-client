import React from 'react'
import TextField from '@material-ui/core/TextField'
import { makeStyles, createStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme =>
  createStyles({
    titleEdit: {
      flexBasis: '100%'
    },
    underline: {
      '&&&:before': {
        borderBottom: 'none'
      },
      // '&&:after': {
      //   borderBottom: 'none'
      // },
      '&:hover': {
        borderBottom: `2px solid ${theme.palette.text.primary}`
      }
    }
  })
)

const TitleField = ({ handleTitleChange, title }) => {

  const classes = useStyles()

  return (
    <TextField
      className={classes.titleEdit}
      InputProps={{ classes }}
      multiline={true}
      value={title}
      onChange={handleTitleChange}
      placeholder="Title / description"
      required={true}
    />
  )
}

export default TitleField
