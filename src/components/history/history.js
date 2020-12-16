import React from "react"
import { useSelector } from "react-redux";
import Login from "../login/login"
import DefaultLayout from "../layout/defaultLayout"
import Data from './data'
export default function History()
{
    const {user:currentUser}=useSelector(state=>state.auth);
    if(!currentUser)
    {
        return (<Login/>)
    }
    return (
        <DefaultLayout>
            <Data/>
        </DefaultLayout>
    )
}