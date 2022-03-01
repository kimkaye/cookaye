// import React from "react";
// import {NavLink, Route} from "react-router-dom";
// import cookieLogo from '../assets/cookies.png';
// import {connect} from "react-redux";
// import {logoutFromServer} from "../actions";
//
// function Navigation(props) {
//     return (
//         <div className="navigation">
//             <nav className="navbar navbar-expand ">
//                 <NavLink className="navbar-brand" to="/">
//                     <img src={cookieLogo} alt="Logo" className="logo"/>
//                     <p className="logo-text">Cookaye</p>
//                 </NavLink>
//                 <div className="container">
//                     <div>
//                         <ul className="navbar-nav ml-auto">
//                             {
//                                 props.userInfo === null &&
//                                 <li className="nav-item">
//                                     <NavLink className="nav-link login-text" to="/login" >
//                                         Login
//                                     </NavLink>
//                                 </li>
//                             }
//                             {
//                                 props.userInfo !== null &&
//                                 <li className="nav-item">
//                                     <NavLink className="nav-link" to="/home">
//                                         {/*<div>*/}
//                                             <a href="#" onClick={props.logout} className="Logout-text">Logout</a>
//                                         {/*</div>*/}
//                                     </NavLink>
//                                 </li>
//                             }
//                             {
//
//                                 props.userInfo === null &&
//                                 <li className="nav-item">
//                                     <NavLink className="nav-link register-text" to="/register">
//                                         Register
//                                     </NavLink>
//                                 </li>                            }
//
//
//                             <li className="nav-item">
//                                 <NavLink className="nav-link" to="/home">
//                                     Home
//                                     <span className="sr-only">(current)</span>
//                                 </NavLink>
//                             </li>
//                             <li className="nav-item">
//                                 <NavLink className="nav-link" to="/favourites">
//                                     Favourites
//                                 </NavLink>
//                             </li>
//                             <li className="nav-item">
//                                 <NavLink className="nav-link" to="/about">
//                                     About
//                                 </NavLink>
//                             </li>
//                             <li className="nav-item">
//                                 <NavLink className="nav-link" to="/recipe">
//                                     Recipes
//                                 </NavLink>
//                             </li>
//                         </ul>
//                     </div>
//                 </div>
//             </nav>
//         </div>
//     );
// }
//
// function mapStateToProps(state) {
//     console.log("mapStateToProps")
//     console.log(state)
//     return {
//         userInfo: state.userInfo
//     }
// }
//
// const mapDispatchToProps = (dispatch) => {
//     return{
//         logout: () => dispatch(logoutFromServer()),
//     }
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
//
// // export default Navigation;