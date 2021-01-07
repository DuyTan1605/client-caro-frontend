import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './App.css';
import store from "./store"
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
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
import History from "../src/containers/historyContainer"
import HistoryDetail from "./containers/historyDetailContainer"
import NotFound from "../src/components/notfound/notfound"
// Function save state


const appRoot = (
    <Router>
        <div>
            <Switch>
                <Route exact path='/login'>
                    <Provider store={store}>
                        <Login />
                    </Provider>
                </Route>
                <Route exact path='/activate/:id'>
                    <Activate/>
                </Route>
                <Route exact path='/register'>
                    <Provider store={store}>
                        <Register />
                    </Provider>
                </Route>
                <Route exact path='/forgot'>
                   <Forgot/>
                </Route> 
                <Route exact path='/profile'>
                    <Provider store={store}>
                        <Info />
                    </Provider>
                </Route> 
                <Route exact path='/reset/:id'>
                   <ChangePassword/>
                </Route> 

                <Route exact path='/board/:id'>
                    <Provider store={store}>
                            <Game/>
                    </Provider>
                </Route> 

                <Route exact path='/ranking'>
                    <Provider store={store}>
                        <Ranking />
                    </Provider>
                </Route> 
                
                <Route exact path='/history'>
                    <Provider store={store}>
                        <History />
                    </Provider>
                </Route> 

                <Route exact path='/historyDetail/:id'>
                    <Provider store={store}>
                            <HistoryDetail/>
                    </Provider>
                </Route> 

                <Route exact path={['/','/home']}>
                    <Provider store={store}>
                        <Homepage />
                    </Provider>
                </Route>

                <Route>
                    <NotFound/>
                </Route>
                
              
                
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