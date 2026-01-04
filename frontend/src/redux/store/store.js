import { compose, createStore } from 'redux';
import reducer from '../reducer/index';
import { thunk } from 'redux-thunk';
import { applyMiddleware } from 'redux';


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // esta línea es para conectar con la extensión del navegador => REDUX DEVTOOLS 

var store = createStore(reducer, composeEnhancer(applyMiddleware(thunk)))

export default store;