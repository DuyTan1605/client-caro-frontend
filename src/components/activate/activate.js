import React, { useState } from "react"
import {
    useParams
  } from "react-router-dom";
import fetch from 'cross-fetch';
import config from "../../config"

export default function Activate(props)
{
    const {id:id} = useParams();
    const [status,setStatus]=useState("WATING FOT ACTIVATE YOUR ACCOUNT...");
    var bearerToken = 'Bearer ' + id;

    fetch(config['server-domain'] + `activate/${id}`, {
        method: 'POST',
        headers: {
            'Authorization': bearerToken,
            'Accept': 'application/json, text/plain, */*',
            'Content-Type':'application/json'
        }
    })
    .then(
        response => response.json(),
        error => {
            console.log('An error occurred.', error);
        }
    )
    .then(json => {
        setStatus(json.message);
        window.location.href="/home";
    })
    .catch(err => {
        setStatus("INCORRECT TOKEN OR EXPIRED");
    })
    return (<center><h1>{status}</h1></center>)
}