import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { socket } from '../../helpers/socket';

export default function (props)
{
    const [message, setmessage] = useState("");

    const sendMsg=()=>{
        console.log(message);
        socket.emit("chatMessage",message);
        setmessage("");
    }

    return (
        <ValidatorForm
        onSubmit={sendMsg}  
        useref="form"
        onError={errors => console.log(errors)}
      >
             <TextValidator
              margin="normal"
              fullWidth
              id="message"
              name="message"  
              value={message}
              validators={['required']}
              errorMessages={["Message is required"]}
              autoFocus
              onChange={(e)=>setmessage(e.target.value)}
            />
          <Button type="submit" onClick={sendMsg} color="primary">
            Send
          </Button>
        </ValidatorForm>
    )
}