import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './App.css';
import reportWebVitals from './reportWebVitals';
import Routes from "../src/routes/routes"
import store from "./store"
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
// import Homepage from './containers/homepage';
// import Login from './containers/login';
// import Register from './containers/register';
import './index.css';
import Register from "../src/containers/registerContainer"
import Login from "../src/containers/loginContainer"
import Info from "../src/containers/infoContainer"
import Homepage from "../src/containers/homeContainer"
import Activate from "./components/activate/activate"
import Forgot from "./components/forgot/forgot"
import ChangePassword from "./components/changePassword/changePassword"
import Game from "../src/containers/gameContainer"
import Ranking from "../src/containers/rankingContainer"
// Function save state


const appRoot = (
    <Router>
        <div>
            <Switch>
                <Route path='/login'>
                    <Provider store={store}>
                        <Login />
                    </Provider>
                </Route>
                <Route path='/activate/:id'>
                    <Activate/>
                </Route>
                <Route path='/register'>
                    <Provider store={store}>
                        <Register />
                    </Provider>
                </Route>
                <Route path='/forgot'>
                   <Forgot/>
                </Route> 
                <Route path='/profile'>
                    <Provider store={store}>
                        <Info />
                    </Provider>
                </Route> 
                <Route path='/reset/:id'>
                   <ChangePassword/>
                </Route> 

                <Route path='/board/:id'>
                    <Provider store={store}>
                            <Game/>
                    </Provider>
                </Route> 

                <Route path={['/','/home']}>
                    <Provider store={store}>
                        <Homepage />
                    </Provider>
                </Route>

                {/* <Route path='/ranking'>
                    <Provider store={store}>
                        <Ranking />
                    </Provider>
                </Route>  */}
              
                
                {/* <Route path='/changeinfo'>
                    <Provider store={store}>
                        <Info />
                    </Provider>
                </Route>
                <Route path='/'>
                    <Provider store={store}>
                        <Homepage />
                    </Provider>
                </Route> */}
            </Switch>
        </div>
    </Router>
)

ReactDOM.render(appRoot, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();