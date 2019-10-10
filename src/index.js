import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore, applyMiddleware, compose} from 'redux';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import { rootReducer } from './store';
import 'bootstrap/dist/css/bootstrap.min.css';

//setting up redux devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//setting up middle-ware(thunk)
const logger = store => {
    return next => {
        return action => {
           const result = next(action);
           return result;
        }
    }
}

//registering rootReducer-as 1st parameter(all reducers in app) and 2nd parameter as middleware
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger)));

ReactDOM.render(
<Provider store = {store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
