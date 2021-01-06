import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    hide:{
      display:'none'
    },
    appear:{
      display: 'inline-block'
    }
}));

export default function FormDialog(props) {
 
  const classes = useStyles();
  const [boardPassword, setboardPassword] = useState("");
 
  const handleClose = () => {
    props.handleClose();    
  };

  const joinRoom=(e)=>{
    e.preventDefault();
    props.handleSubmit(props.board,boardPassword);
  }


  return (
    <div> 
      <Dialog fullWidth maxWidth="md" open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <ValidatorForm
        onSubmit={joinRoom}  
        useref="form"
        onError={errors => console.log(errors)}
      >
        <DialogTitle id="form-dialog-title">Enter room password</DialogTitle>
       {props.message && <Alert severity="info">{props.message}</Alert>}
        <DialogContent>
            
             <TextValidator
              margin="normal"
              fullWidth
              type="password"
              id="boardPassword"
              label="Board's Password"
              name="boardPassword"  
              value={boardPassword}
              validators={['required']}
              errorMessages={["Board's password is required"]}
              autoFocus
              onChange={(e)=>setboardPassword(e.target.value)}
            />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Join
          </Button>
        </DialogActions>
        </ValidatorForm>
      </Dialog>
     
    </div>
  );
}