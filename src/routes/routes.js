import Login from "../components/login/login"
import Register from "../components/register/register"
import Home from "../components/home/index"
import { createBrowserHistory } from "history";
import{
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";

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
        path: ['/home',"/"],
        component: Home
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
                    return (<Route key={id} {...route}/>)
                })
            }
          </Switch>
    </Router>
    )
}


