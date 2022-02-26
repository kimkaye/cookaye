// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Provider, connect} from "react-redux";
// import { createStore } from "redux";
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import {reducer} from "./reducers/index";
//
// const store = createStore(reducer)
//
// ReactDOM.render(
//   <React.StrictMode>
//   <Provider store={store}>
//       <App />
//   </Provider>
//   </React.StrictMode>,
//   document.getElementById('root')
// );
//
// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import thunkMiddleware from 'redux-thunk'
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {createLogger} from "redux-logger/src";
import {reducer} from "./reducers/index";
import {store} from "./store";

const logger = createLogger();
// const store = createStore(reducer, applyMiddleware(thunkMiddleware, logger));

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
