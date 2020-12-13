import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {addNewBoard} from "../../actions/board.actions"
import {useDispatch} from "react-redux"

import {CLEAR_MESSAGE} from "../../actions/type"
export default function FormDialog(props) {
 
    const [boardName, setboardName] = useState("");
    const dispatch=useDispatch();
  const handleClose = () => {
    props.handleClose();    
  };

  const newBoard=(e)=>{
    e.preventDefault();
    props.handleClose();
    setboardName("");
    dispatch(addNewBoard(boardName))
    .then(
        setTimeout(()=>{
            dispatch({
                type: CLEAR_MESSAGE,
            })
        },2000)
    )
    .catch(
        setTimeout(()=>{
            dispatch({
                type: CLEAR_MESSAGE,
            })
        },2000)
    )
    
  }

  return (
    <div>
       
      <Dialog open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <ValidatorForm
        onSubmit={newBoard}  
        useref="form"
        onError={errors => console.log(errors)}
      >
        <DialogTitle id="form-dialog-title">Add new board</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Enter your board's name
          </DialogContentText>
         
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