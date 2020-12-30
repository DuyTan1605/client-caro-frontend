import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Logo from "../../images/login_icon.png"
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import fetch from 'cross-fetch';
import config from "../../config"

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    height: '4em',
    width:'4em'
  },
}));

export default function Forgot(props) {
  const classes = useStyles();

  const [email, setemail] = useState("");
  const [loading, setloading] = useState(false);
  const [status,setStatus] = useState("");
  const {message,actions}=props;
  
  
  const registerNewAccount=(e)=>{
    e.preventDefault();
    // setloading(true);
    fetch(config['server-domain'] + `users/forgot`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            email
         })
    })
    .then(
        response => response.json(),
        error => {
            console.log('An error occurred.', error);
        }
    )
    .then(json => {
        setStatus(json.message);
        console.log(json);
    })
    .catch(err => {
        setStatus(err.message);
        console.log(err.message);
    })
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar} src={Logo}>
        </Avatar>
        <Typography component="h1" variant="h5">
          Enter your email to reset password
        </Typography>
        {status && (<Alert severity="info">{status}</Alert>)}
        <form className={classes.form} onSubmit={registerNewAccount}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                type="email"
                value={email}
                onChange={(e)=>setemail(e.target.value)}
              />
            </Grid>
           
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
           Send {loading && (<CircularProgress style={{color:'white'}} size="1.5em"/>)}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}