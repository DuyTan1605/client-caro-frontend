import {React,useState} from 'react';
// import { useDispatch,useSelector } from "react-redux";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
// import CircularProgress from '@material-ui/core/CircularProgress';
// import Container from '@material-ui/core/Container';
// import {update} from "../../actions/auth";
import Alert from '@material-ui/lab/Alert';
// import { CLEAR_MESSAGE } from '../../actions/type';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// import Checkbox from '@material-ui/core/Checkbox';
// import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

export default function Diaglog(props)
{
    const classes = useStyles();
    const [newPassword, setNewPassword] = useState("");
    const [currentPassword, setcurrentPassword] = useState("");
    const [alertNewPassword, setalertNewPassword] = useState(false);
    const [alertCurrentPassword, setalertCurrentPassword] = useState(false);
    const handleClose = () => {
        props.handleClose();
      };
  
      const handleChangePassword=(e)=>
      {
       
        e.preventDefault();
        if(newPassword=="")
        {
            setalertNewPassword(true);
            return;
        }
        else{
            if(currentPassword=="")
            {
                setalertCurrentPassword(true);
                return;
            }
            props.onsubmit();
        }
       
      }
      const handleChangeNewPassword = (event) => {
              setalertNewPassword(false);
              setNewPassword(event.target.value)
              props.handleChangeNewPassword(event.target.value)
       
        }
    
        const handleChangeOldPassword =(event)=>{
            setalertCurrentPassword(false);
            setcurrentPassword(event.target.value)
            props.handleChangeOldPassword(event.target.value)
        }

    return (

        <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        
      >
        <ValidatorForm
        onSubmit={(e)=>handleChangePassword(e)}
        onError={errors => console.log(errors)}
        className={classes.form}>
        <DialogTitle id="alert-dialog-title">Change Password</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <TextValidator
              margin="normal"
              fullWidth
              id="newPassword"
              label="Your new password"
              name="newPassword"
              type="password"
              value={props.newPassword}
              validators={['required']}
              errorMessages={['New password is required']}
              autoFocus
              onChange={(e)=>handleChangeNewPassword(e)}
            />
            {alertNewPassword && <Alert severity="error">Check your new password</Alert>}
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            <TextValidator
              margin="normal"
              fullWidth
              id="password"
              label="Your current password"
              name="password"
              type="password"
              value={props.oldPassword}
              validators={['required']}
              errorMessages={['Password is required']}
              autoFocus
              onChange={(e)=>handleChangeOldPassword(e)}
            />
            {alertCurrentPassword && <Alert severity="error">Check your old password</Alert>}
          </DialogContentText>
    
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleChangePassword} type="button" color="primary" autoFocus>
           Confirm
          </Button>
        </DialogActions>
        </ValidatorForm>
      </Dialog>
    )
}