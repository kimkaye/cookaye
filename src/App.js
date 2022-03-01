import './App.css';
import React from "react";
import "./index.css";
import axios from "axios";
import {getFavouritesFromServer, insertUserInfo} from "./actions";
import {connect} from "react-redux";
import AppContainer from "./components/AppContainer";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";


const App = (props) => {
    axios.get('http://localhost:5001/user', {
        withCredentials: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }
    }).then((userInfoResponse) => {
        console.log('userInfo response',userInfoResponse);
        props.insertUserInfo(userInfoResponse.data)
    }).catch((err) => {
        console.error(err)
    });
    props.getFavouritesFromServer()

    return (
        <div className="App">
            <AppContainer/>
        </div>
  );
}

const mapDispatchToProps = (dispatch) => {
    return{
        insertUserInfo: (userInfo) => dispatch(insertUserInfo(userInfo)),
        getFavouritesFromServer: () => dispatch(getFavouritesFromServer()),
    }
}


export default connect(null, mapDispatchToProps)(App);



