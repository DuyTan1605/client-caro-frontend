import React from "react"
import DefaultLayout from "../layout/defaultLayout"
import BoardContent from "./boardContent"
export default function Board(props)
{
    return (
        <DefaultLayout>
            <BoardContent/>
        </DefaultLayout>
    )
}