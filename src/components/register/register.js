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
import { CLEAR_MESSAGE } from '../../actions/type';
import Alert from '@material-ui/lab/Alert';
import { useDispatch, useSelector } from "react-redux";
import {register} from "../../actions/auth.actions"

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

export default function Register() {
  const classes = useStyles();

  const[name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);
  const {message} =  useSelector(state=>state.message);

  const dispatch = useDispatch();
  const registerNewAccount=(e)=>{
    e.preventDefault();
    setloading(true);
    dispatch(register(name,email, password))
    .then(() => {
      setname("");
      setemail("");
      setpassword("");
      setloading(false);

      setTimeout(()=>{
        dispatch({
          type:CLEAR_MESSAGE
        })
      },5000)
    })
    .catch(() => {
      setloading(false);
      setTimeout(()=>{
        dispatch({
          type:CLEAR_MESSAGE
        })
      },5000)
    }); 
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar} src={Logo}>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {message && (<Alert severity="info">{message}</Alert>)}
        <form className={classes.form} onSubmit={registerNewAccount}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                type="text"
                inputProps={{ maxLength: 32 }}
                value={name}
                onChange={(e)=>setname(e.target.value)}
              />
            </Grid>
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
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                autoComplete="current-password"
                onChange={(e)=>setpassword(e.target.value)}
                inputProps={{pattern:'(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})'}}
              />
               <small style={{fontSize:'0.8em'}}>
                Should contain at least 8 chars, 1 number, 1 uppercase, 1 lowercase and 1 special char.
                </small>
            </Grid>
            {/* <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="repassword"
                label="Confirm Password"
                type="password"
                id="repassword"
                value={rePassword}
                onChange={(e)=>setrePassword(e.target.value)}
                helperText={(rePassword!=password && rePassword!="") ? 'Please fill confirm password match with password' : ' '}
                error={rePassword!=password && rePassword!=""}
              />
            </Grid> */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up {loading && (<CircularProgress color="primary" size="1.5em"/>)}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}