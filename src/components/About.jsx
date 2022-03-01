import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { brands } from '@fortawesome/fontawesome-svg-core/import.macro'
import about from '../assets/about.png'
import { Typewriter } from 'react-simple-typewriter'



function About(){
    return (
        <div className="contact">
            <div className="container">
                        <h1 className="font-weight-light">About me</h1>

                <h3>Kim Kaye</h3>
                        <div className="about-img">
                            <img src={about} alt="Logo" className="about-img"/>
                        </div>
                <br/>
                <div className="typewriter-wrapper-about">
                <Typewriter
                    words={['Web developer & Cooking enthusiast' ]}
                    loop={5}
                    cursor
                    cursorStyle='_'
                    typeSpeed={90}
                    deleteSpeed={50}
                    delaySpeed={1000}
                />
                </div>
                <br/>
                        <p>
                            Graduate of <b>B.Sc. degree in Information Systems with a specialization in Cyber</b>.
                            <br/>
                            Graduate of <b>Full stack course at Developers institute</b>.
                            <br/>
                            Enthusiastic about technology, design, coding and especially people!
                            <br/>
                            The thing I like to do most in my spare time is <b>cook and bake</b>,
                            <br/>
                            so i decided to build my dream cookbook website - <b>COOKAYE!</b>
                            <br/>
                            <b>I hope you will enjoy it!</b>
                        </p>
                <h4>You are welcome to get in touch!</h4>
                <div className="contact-icon">
                <a href="https://www.facebook.com/kim.kaye.73" target="_blank" className="icon"><FontAwesomeIcon icon={brands('facebook')} /></a>
                <a href="http://linkedin.com/in/kim-kaye-80583713a" target="_blank" className="icon"><FontAwesomeIcon icon={brands('linkedin')} /></a>
                <a href="https://github.com/kimkaye/DI_Bootcamp/tree/main/PortfolioProject" target="_blank" className="icon"><FontAwesomeIcon icon={brands('github')} /></a>
                <a href="https://www.instagram.com/kim_kaye/" target="_blank" className="icon"><FontAwesomeIcon icon={brands('instagram')} /></a>
                </div>
            </div>
        </div>
    );
}

export default About;