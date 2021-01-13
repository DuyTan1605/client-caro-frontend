import React, { useState } from "react"
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import fetch from 'cross-fetch';
import config from "../../config"
import Alert from '@material-ui/lab/Alert';
import Link from '@material-ui/core/Link';
import {socket} from "../../helpers/socket"

export default function Activate(props)
{
    const [status,setStatus] = useState("");
    const [loading, setloading] = useState(false);

    
    const resendActiveCode=()=>{
    
        const bearerToken = 'Bearer ' + localStorage.getItem("token");
        setStatus("");
        setloading(true);
        fetch(config['server-domain'] + `users/activate`, {
            method: 'POST',
            headers: {
                'Authorization': bearerToken,
                'Accept': 'application/json, text/plain, */*',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                email: JSON.parse(localStorage.getItem("user")).email
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
            setloading(false);
            console.log(json);
        })
        .catch(err => {
            setloading(false);
            setStatus(err.message);
         
            console.log(err.message);
        })
    }

    const returnHome = ()=>{
        socket.emit("logout",{id:JSON.parse(localStorage.getItem("user")).id});
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.location.href = "/login";
    }

    return (    
        <div style={{margin:'5%'}}>
            <center>
                {status && (<Alert severity="info">{status}</Alert>)}
                <h1>GO TO YOUR EMAIL TO ACTIVATE YOUR ACCOUNT....</h1>
                <Button variant="contained" color="primary" onClick = {()=>resendActiveCode()}>
                   Send active code again {loading && (<CircularProgress style={{color:'white'}} size="1.5em"/>)}
                </Button>
                <br/><br/>
                <Link href="#" onClick={returnHome}>
                    <h6>Login page</h6>
                </Link>
            </center>
        </div>
        )
}