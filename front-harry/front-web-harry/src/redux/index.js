import { createStore } from "redux";
import reducer from '..reducer/index';
import thunk from 'redux-thunk';
import {applyMiddleware} from 'redux';

var store=createStore(reducer, applyMiddleware(thunk));

export default store;
