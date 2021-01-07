import React from "react";
import { Menu,MenuItem } from '@material-ui/core';
import "./style.css"

export default function MyMenu(props)
{
    return (
       <nav className="stroke">
            <ul>
                <li><a href="/ranking">Ranking</a></li>
            </ul>
        </nav>
    )
}