

import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: "#3f51b5",
    padding: theme.spacing(6),
    color:"white",
  
    bottom: "0",
    width: "100%",
    height: "1rem",
  },
}));

export default function footer()
{
    const classes=useStyles();
    return (
        <footer className={classes.footer}>
          <Typography variant="h6" align="center" gutterBottom>
            Footer
          </Typography>
      </footer>
    )
}