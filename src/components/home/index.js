import {useSelector} from 'react-redux'
import { Redirect } from 'react-router-dom';
import Header from "../layout/header";
import Main from "./home"
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

export default function Home()
{
    const { user: currentUser } = useSelector((state) => state.auth);
    if (!currentUser) {
      return <Redirect to="/login" />;
    }

    return (
        <>
            <Header/>
            <Main history={history}/>
        </>
    )
}