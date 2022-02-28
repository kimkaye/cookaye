import React from "react";
import ImageCarousel from "./ImageCarousel";
import CookieConsent from "react-cookie-consent";
import {
    Link
} from "react-router-dom";
import {connect} from "react-redux";
import { Typewriter } from 'react-simple-typewriter'
import cookie from '../assets/cookies.png'
import logo from "../assets/logo.jpeg";


function Home(props) {
    return (
        <div className="home">
            <div className="welcomeText">
                <div className="typewriter-wrapper">
                    <Typewriter
                        words={['Hi', props.userInfo? props.userInfo.name : '' ]}
                        loop={5}
                        cursor
                        cursorStyle='_'
                        typeSpeed={90}
                        deleteSpeed={50}
                        delaySpeed={1000}
                    />
                </div>
                <h1 className="welcome">Welcome to Cookaye</h1>
            <p>On this site you will find a variety of healthy and nutritious recipes, share them with your friends in chat and save them in a personal recipe book. Enjoy!</p>
                 <Link to="/recipe">
                    <button className="searchButton" role="button">Search Recipe</button>
                </Link>
                <img src={cookie} alt="cookie" className="cookieImage"/>
            </div>
            <ImageCarousel/>
        </div>
    )
}

function mapStateToProps(state) {
    console.log("mapStateToProps")
    console.log(state)
    return {
       userInfo: state.userInfo
    }
}

// export default Home;
export default connect(mapStateToProps, null)(Home);
