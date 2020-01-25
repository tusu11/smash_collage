import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
  input: {
    display: 'none',
  },
}));

export default function UploadButtons(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <input
        accept="image/*"
        className={classes.input}
        id="outlined-button-file"
        type="file"
        onChange={props.onChange}
      />
      <label htmlFor="outlined-button-file">
        <Button variant="outlined" component="span" id={props.id}>
          {props.value}
        </Button>
      </label>
    </div>
  );
}