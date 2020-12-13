import {useSelector} from 'react-redux'
import { Redirect } from 'react-router-dom';
import Header from "../layout/header";
import Main from "./home"
import { createBrowserHistory } from "history";
import DefaultLayout from "../layout/defaultLayout"

const history = createBrowserHistory();

export default function Home()
{
    return (
        <DefaultLayout>
            <Main history={history}/>
        </DefaultLayout>
    )
}