import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RecipePage from './recipe-page/RecipePage'
// import Navbar from './Navbar'
import Login from './Login'
import {
    Navbar,
    Footer,
    Home,
    Favourites,
    About,

} from "./";
import {connect} from "react-redux";

const AppContainer = (props) => {

    return (
    <div className="App">
        <Router>
            {/*<Navigation />*/}
            <Navbar/>
            <br/>
            <br/>
            <br/>
            <br/>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/favourites" element={<Favourites />} />
                <Route path="/about" element={<About />} />
                <Route path="/recipe" element={<RecipePage/>} />
                {
                    props.userInfo === null &&
                    <Route path="/login" element={<Login title={'Login'}/>} />

                }
                {

                    props.userInfo === null &&
                    <Route path="/register" element={<Login title={'Register'}/>} />
                }

            </Routes>
            <Footer />
        </Router>
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

export default connect(mapStateToProps, null)(AppContainer);

// export default AppContainer;
