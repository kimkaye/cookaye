import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RecipePage from './recipe-page/RecipePage'
import Login from './Login'
import {
    Navigation,
    Footer,
    Home,
    Favourites,
    Contact,

} from "./";
import {connect} from "react-redux";

const AppContainer = (props) => {

    return (
    <div className="App">
        <Router>
            <Navigation />
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/favourites" element={<Favourites />} />
                <Route path="/contact" element={<Contact />} />
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
