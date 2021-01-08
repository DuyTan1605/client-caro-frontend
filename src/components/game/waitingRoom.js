import React from "react"
import Grid from '@material-ui/core/Grid';
import DefaultLayout from "../layout/defaultLayout"
import ListAvaiable from "./listAvaiableUser"
import CircularProgress from '@material-ui/core/CircularProgress'
export default function WaitingRoom(props)
{
    return (
             <Grid container spacing={3}>

             <Grid item sm={12} xs={12} md={6}>
                <div style={{textAlign:'center',marginTop:'2%'}}>
                    <h1>Wating other player <CircularProgress/></h1>
                </div>
            </Grid>

            <Grid item sm={12} xs={12} md={6} style={{textAlign:'center',marginTop:'2%'}}>
                <h1>Invite other player</h1>
                <ListAvaiable acceptInvited={()=>props.acceptInvited()}/>
            </Grid>

             </Grid>
    )
}