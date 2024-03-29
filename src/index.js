import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Router,Switch,Route} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'
import MusicMaster from './MusicMaster'
import Jokes from './Jokes'
import Testing from './Testing';
import WeatherApp from './WeatherApp'
import * as serviceWorker from './serviceWorker';



ReactDOM.render(
    <Router basename='/apps/' history={createBrowserHistory()}>
        <Switch>
            <Route exact path ='/' component={Testing} />
            <Route path ='/jokes' component={Jokes}/>
            <Route path ='/musicmaster' component={MusicMaster}/>
            <Route path='/weatherapp' component={WeatherApp}/>
            
        </Switch>
    </Router>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

