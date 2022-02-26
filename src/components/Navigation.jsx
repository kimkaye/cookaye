import React from "react";
import {NavLink, Route} from "react-router-dom";
import logoPng from '../assets/logo.png';
import logo from '../assets/logo.jpeg';
import {connect} from "react-redux";
import Login from "./Login";
import {logoutFromServer} from "../actions";


function Navigation(props) {
    return (
        <div className="navigation">
            <nav className="navbar navbar-expand ">
                <div className="container">
                    <NavLink className="navbar-brand" to="/">
                        {/*<img src={logo} alt="Logo" className="logo"/>*/}
                        {/*<img src={logoPng} alt="Logo" className="logo"/>*/}
                        <img src={logo} alt="Logo" className="logo"/>
                    </NavLink>
                    <div>
                        <ul className="navbar-nav ml-auto">
                            {
                                props.userInfo === null &&
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/login">
                                        Login
                                    </NavLink>
                                </li>
                            }
                            {
                                props.userInfo !== null &&
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/home">
                                        <div>
                                            <a href="#" onClick={props.logout}>LOGOUT</a>
                                        </div>
                                    </NavLink>
                                </li>
                            }
                            {

                                props.userInfo === null &&
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/register">
                                        Register
                                    </NavLink>
                                </li>                            }


                            <li className="nav-item">
                                <NavLink className="nav-link" to="/home">
                                    Home
                                    <span className="sr-only">(current)</span>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/favourites">
                                    Favourites
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/contact">
                                    Contact
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/recipe">
                                    Recipes
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

function mapStateToProps(state) {
    console.log("mapStateToProps")
    console.log(state)
    return {
        userInfo: state.userInfo
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        logout: () => dispatch(logoutFromServer()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);

// export default Navigation;