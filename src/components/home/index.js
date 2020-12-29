import Main from "./home"
import { createBrowserHistory } from "history";
import DefaultLayout from "../layout/defaultLayout"

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
    if (didInvalidate) {
           window.location.href = "/login";
    }
    else{
        // console.log(isFetching);
        if(userInfo)
        {
           // console.log(userInfo);
           localStorage.setItem("user",JSON.stringify(userInfo));
           return (
            <DefaultLayout refresh={refresh}>
                HOMEPAGE
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
                <div className='status'>... ĐANG KẾT NỐI ...</div>
            </center>
        );
    }

   
}