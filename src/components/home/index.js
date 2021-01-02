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
const history = createBrowserHistory();

export default function Home(props)
{
    const { actions } = props;
    const { didInvalidate } = props;
    const { isFetching } = props;
    const { userInfo } = props;
    const { roomInfo } = props;

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
            if(userInfo.account_type ==1 && userInfo.activate == 0 )
            {
                return (<Activate/>)
            }

           return (
            <DefaultLayout refresh={refresh}>
                 <Grid container spacing={3}>
                    <Grid item xs={12} md={10} sm={10}>
                        <Provider store={store}>
                             <ListBoard/>
                        </Provider>
                    </Grid>
                    <Grid item xs={12} md={2} sm={2} style={{float:'right'}}>
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