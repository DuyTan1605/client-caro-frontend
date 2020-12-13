import React from "react"
import Header from "./header"
import Footer from "./footer"

export default function defaultLayout(props)
{
    return (
        <div style={{"overflow":"hidden"}}>
            <Header/>
            <div style={{minHeight:'100vh'}}>
            {props.children}
            </div>
            <Footer/>
        </div>
    )
}