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
  const [boardName, setboardName] = useState("");
  const [timeOneStep, setTimeOneStep] = useState(10);
  const [password,setPassword] = useState("");
  const [checkPassword,setCheckPassowrd] = useState(false);
  const handleClose = () => {
    props.handleClose();    
  };

  const newBoard=(e)=>{
    e.preventDefault();
    props.handleSubmit({boardName,timeOneStep,password});
    setboardName("");
    setPassword("");
    setCheckPassowrd(false);
  }

  const handleChangeCheckBox = (event) => {
    setCheckPassowrd(event.target.checked);
    setPassword("");
  };

  return (
    <div> 
      <Dialog fullWidth maxWidth="md" open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <ValidatorForm
        onSubmit={newBoard}  
        useref="form"
        onError={errors => console.log(errors)}
      >
        <DialogTitle id="form-dialog-title">Add new board</DialogTitle>
        <DialogContent>
            
             <TextValidator
              margin="normal"
              fullWidth
              id="boardName"
              label="Board's name"
              name="boardName"  
              value={boardName}
              validators={['required']}
              errorMessages={["Board's name is required"]}
              autoFocus
              onChange={(e)=>setboardName(e.target.value)}
            />

          <TextValidator
              margin="normal"
              fullWidth
              id="time"
              label="Time for one step(>=10s)"
              name="time"  
              value={timeOneStep}
              validators={['minNumber:10', 'maxNumber:255']}
              errorMessages={["Time must be valid"]}
              autoFocus
              onChange={(e)=>setTimeOneStep(e.target.value)}
            />
             <FormControlLabel
          value={checkPassword}
          control={<Checkbox color="primary" onChange={handleChangeCheckBox} />}
          label="Use password"
          labelPlacement="start"
          style={{margin:0}}
        />

          <TextValidator
              margin="normal"
              fullWidth
              id="password"
              label="Password"
              name="password"  
              value={password}
              type="password"
              validators={checkPassword?['required']:[]}
              errorMessages={checkPassword?["Password is required"]:[]}
              autoFocus
              onChange={(e)=>setPassword(e.target.value)}
              className={checkPassword ? classes.appear : classes.hide}
            />
       
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Create
          </Button>
        </DialogActions>
        </ValidatorForm>
      </Dialog>
     
    </div>
  );
}