import React,{useState} from 'react';
import Button from '@material-ui/core/Button';

import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { socket } from '../../helpers/socket';
import SendIcon from '@material-ui/icons/Send';
import { InputAdornment } from "@material-ui/core";
export default function (props)
{
    const [message, setmessage] = useState("");

    const sendMsg=()=>{
        if(message!="")
        {
          socket.emit("chatMessage",message);
          setmessage("");
        }
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
              errorMessages={["Message is required"]}
              autoFocus
              onChange={(e)=>setmessage(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                     <Button type="submit" onClick={sendMsg}><SendIcon /></Button> 
                  </InputAdornment>
                )
              }}
            />
          {/* <Button type="submit" onClick={sendMsg} color="primary">
            Send
          </Button> */}
        </ValidatorForm>
    )
}