import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import BackgroundLogin from "../../images/caro_background.png"
import BackgroundLoginSm from "../../images/caro_background_sm.png"
import Logo from "../../images/login_icon.png"
import GoogleLogin from 'react-google-login'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import {useDispatch,useSelector} from "react-redux"
import {login} from "../../actions/auth.actions";
import Alert from '@material-ui/lab/Alert';
import { CLEAR_MESSAGE } from '../../actions/type';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {loginWithSocial} from "../../actions/auth.actions"
//import {socket} from "../../helpers/socket"
import config from "../../../src/config"
const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  btnSocial:{
    margin: theme.spacing(2, 0, 2),
  }
  ,
  image: {
    backgroundImage: `url(${BackgroundLogin})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundPosition: "center",
    backgroundSize: '70% 50%',
    [theme.breakpoints.down('sm')]: {
       backgroundImage:`url(${BackgroundLoginSm})`,
       backgroundSize: '70% 70%',
      }
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    height: '4em',
    width:'4em'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#00e676',
    color: "white"
  },
  captcha:{
    transform:"scale(1)",
    transformOrigin:"0 0"
  }
}));



export default function Login(props) {
  const classes = useStyles();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);
  const {message,actions} = props;
 
  const [recaptchaChecked, setrecaptchaChecked] = useState(false);

  const dispatch = useDispatch();

  const onChange=(value)=> {
    setrecaptchaChecked(true);
    
  }

  const address = window.location.href;
  if (address.indexOf('?token=') !== -1) {
      var token = address.substr(address.indexOf('?token=') + '?token='.length);
      if (token.indexOf('#caro_client') !== -1) {
          token = token.substr(0, token.indexOf('#caro_client'));
      }
      localStorage.setItem('token', token);
      window.location.href = '/home';
  }

  const responseGoogle = () => {  
    window.location.href= config['server-domain'] + 'users/login/google/'
  }

  const responseFacebook = () => {
    window.location.href= config['server-domain'] + 'users/login/facebook/'
  }

  const loginFunction=(e)=>{
    //e.preventDefault();
    //setloading(true);
    actions.fetchLogin(email,password);

  }

  if(localStorage.getItem("user"))
  {
      window.location.href="/home";
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar} src={Logo}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Login to Play
          </Typography>
          {message && (<Alert severity="info">{message}</Alert>)}
          <ValidatorForm
        onSubmit={()=>loginFunction()}
        onError={errors => console.log(errors)}
        className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              type="email"
              label="Email Address"
              name="email"
              value={email}
              onChange={(e)=>setemail(e.target.value)}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              onChange={(e)=>setpassword(e.target.value)}
              value={password}
              id="password"
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}

            {/* <ReCAPTCHA
            sitekey="6Ld3GfsZAAAAAKF6ze3QiR7BOHpFS3Wqii5OmXXH"
            onChange={(v)=>onChange(v)}
            style={{width:"100%"}}></ReCAPTCHA> */}


            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
            >
              Sign In {loading && (<CircularProgress color="primary" size="1.5em"/>)}
            </Button>

        <Button
        fullWidth
       
        style={{color:"white",background:'red'}}
        onClick={responseGoogle}
        >Google Login</Button>
        
        <Button
        fullWidth
        className = {classes.btnSocial}
        style={{color:"white",background:'blue',}}
        onClick={responseFacebook}
        >Facebook Login</Button>

            <Grid container>
              <Grid item xs>
                <Link href="/forgot" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>

         </ValidatorForm>
        </div>
      </Grid>
    </Grid>
  );
}