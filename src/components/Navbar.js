import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { CSSTransition } from "react-transition-group";
import {NavLink} from "react-router-dom";
import {logoutFromServer} from "../actions";
import {connect} from "react-redux";

function Navbar(props) {
    const [isNavVisible, setNavVisibility] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 700px)");
        mediaQuery.addListener(handleMediaQueryChange);
        handleMediaQueryChange(mediaQuery);

        return () => {
            mediaQuery.removeListener(handleMediaQueryChange);
        };
    }, []);

    const handleMediaQueryChange = (mediaQuery) => {
        if (mediaQuery.matches) {
            setIsSmallScreen(true);
        } else {
            setIsSmallScreen(false);
        }
    };

    const toggleNav = () => {
        setNavVisibility(!isNavVisible);
    };

    return (
        <header className="Header">
            <NavLink className="navbar-brand" to="/home">
                <img src={require("../assets/cookies.png")} className="Logo" alt="logo"/>
                <h6 className="logo-text">Cookaye</h6>
            </NavLink>
            <CSSTransition
                in={!isSmallScreen || isNavVisible}
                timeout={350}
                classNames="NavAnimation"
                unmountOnExit
            >
                <nav className="Nav">
                    {props.userInfo === null &&
                        <a href="/login">Login</a>
                    }
                    {props.userInfo !== null &&
                        <a href="/home" onClick={props.logout}>Logout</a>
                    }
                    {props.userInfo === null &&
                        <a href="/register">Register</a>
                    }
                    <a href="/home">Home</a>
                    <a href="/favourites">Favourites</a>
                    <a href="/about">About</a>
                    <a href="/recipe">Recipes</a>
                </nav>
            </CSSTransition>
            <button onClick={toggleNav} className="Burger">
        <span role="img" aria-label="">
          {" "}
            🍔{" "}
        </span>
            </button>
        </header>
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

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);