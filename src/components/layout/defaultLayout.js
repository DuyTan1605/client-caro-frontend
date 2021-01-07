import React,{useState} from "react"
import Header from "./header"
import Footer from "./footer"

export default function defaultLayout(props) {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    //console.log(props);
    return (
        <div style={{ "overflow": "hidden" }}>
            <Header refresh={props.refresh}/>
                <div style={{ minHeight: '100vh' }}>
                    {props.children}
                </div>
            <Footer />
        </div>
    )
}