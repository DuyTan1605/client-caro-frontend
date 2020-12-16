import Login from "../components/login/login"
import Register from "../components/register/register"
import Home from "../components/home/index"
import Board from "../components/board/boardContent"
import { createBrowserHistory } from "history";
import{
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import Notfound from "../components/notfound/notfound"
import HistoryGame from "../components/history/history"

const routes=[
    {
        path: '/login',
        component: Login
    },
    {
        path: '/register',
        component: Register
    },
    {
        path: ['/',"/home"],
        component: Home
    },
    {
        path: ['/board/:id'],
        component: Board
    },
    {
        path: ['/history'],
        component: HistoryGame
    }
]

const history = createBrowserHistory();

export default function Routes()
{
    return (
        <Router history={history}>
          <Switch>
            {/* <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} /> */}
            {
                routes.map((route,id)=>{
                    return (<Route exact key={id} {...route}/>)
                })
            }
             <Route component={Notfound} />
          </Switch>
    </Router>
    )
}


