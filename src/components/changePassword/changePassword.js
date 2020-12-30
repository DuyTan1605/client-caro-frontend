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
import {
    useParams
  } from "react-router-dom";

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

export default function ChangePassword(props) {
  const classes = useStyles();


  const [rePassword, setrePassword] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);
 
  const [message,setMessage]= useState("");
  const {id:id} = useParams();
  
  console.log(id);
  const registerNewAccount=(e)=>{
    e.preventDefault();
    if(password!=rePassword)
    {
        setMessage("Mật khẩu nhập lại chưa khớp")
    }
    else{
        var bearerToken = 'Bearer ' + id;
        fetch(config['server-domain'] + `users/changePassword`, {
            method: 'POST',
            headers: {
                'Authorization': bearerToken,
                'Accept': 'application/json, text/plain, */*',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                password
            })
        })
        .then(
            response => response.json(),
            error => {
                console.log('An error occurred.', error);
            }
        )
        .then(json => {
            setMessage(json.message);
        })
        .catch(err => {
            setMessage("INCORRECT TOKEN OR EXPIRED");
        })
    }
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar} src={Logo}>
        </Avatar>
        <Typography component="h1" variant="h5">
          Change Password
        </Typography>
        {message && (<Alert severity="info">{message}</Alert>)}
        <form className={classes.form} onSubmit={registerNewAccount}>
          <Grid container spacing={2}>
            
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Mật khẩu mới"
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
           
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="rePassword"
                label="Nhập lại mật khẩu mới"
                type="password"
                id="repassword"
                value={rePassword}
                autoComplete="current-password"
                onChange={(e)=>setrePassword(e.target.value)}
                inputProps={{pattern:'(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})'}}
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
           Change {loading && (<CircularProgress style={{color:'white'}} size="1.5em"/>)}
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