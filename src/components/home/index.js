import { createBrowserHistory } from "history";
import DefaultLayout from "../layout/defaultLayout"
import {socket} from "../../helpers/socket"
import ListBoard from "../../containers/boardContainer"
import store from "../../store"
import { Provider } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import ListOnline from "./listOnline"
import CircularProgress from '@material-ui/core/CircularProgress';
import Activate from "../activate/activateClient"
import Link from '@material-ui/core/Link';
const history = createBrowserHistory();

export default function Home(props)
{
    console.log(props);
    const { actions } = props;
    const { didInvalidate } = props;
    const { isFetching } = props;
    const { userInfo } = props;
    const { roomInfo } = props;

    const returnHome = ()=>{
        socket.emit("logout",{id:JSON.parse(localStorage.getItem("user")).id});
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.location.href = "/login";
    }
    console.log(props);
    const refresh = ()=>{
        actions.actionRefresh();
    }
    if (!localStorage.getItem("token")) {
           window.location.href = "/login";
    }
    else{
        // console.log(isFetching);
        if(userInfo)
        {
           // console.log(userInfo);
           localStorage.setItem("user",JSON.stringify(userInfo));
           socket.emit("login",userInfo);

            if(userInfo.status == 0)
            {
                return (
                    <div style={{margin:'5%'}}>
                        <center>
                            <h1>YOUR ACCOUNT HAS BEEN BLOCK BY ADMIN....</h1>
                            <br/><br/>
                            <Link href="#" onClick={returnHome}>
                                <h6>Login page</h6>
                            </Link>
                        </center>
                    </div>
                )
            }

            if(userInfo.account_type ==1 && userInfo.activate == 0 )
            {
                return (<Activate/>)
            }

           return (
            <DefaultLayout refresh={refresh}>
                 <Grid container spacing={3} style={{marginTop:'2%'}}>
                    <Grid item xs={10} md={10} sm={10}>
                        <Provider store={store}>
                             <ListBoard/>
                        </Provider>
                    </Grid>
                    <Grid item xs={12} md={2} sm={2} style={{padding:'1em'}}>
                        <h4>Users online</h4>
                        <ListOnline/>
                    </Grid>
                 </Grid> 
            </DefaultLayout>
           )
        }
        else if(!isFetching)
        {
            const token = localStorage.getItem('token');
            actions.fetchInfo(token);
        }
        return (
            <center>
               <CircularProgress />
            </center>
        );
    }

   
}