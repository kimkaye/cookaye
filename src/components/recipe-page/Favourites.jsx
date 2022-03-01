import React from "react";
import {connect} from "react-redux";
import Recipe from "./Recipe";

function Favourites(props) {
    let favouriteRecipesArr = Object.values(props.favouriteRecipes);
    console.log(favouriteRecipesArr.length);

    return (
        <div className="container">
            <h1 className="favourite-h1">My Cookbook</h1>
            {props.userInfo? ''  : 'You need to log in to add and view your favorites'}
            {favouriteRecipesArr.length === 0 &&
                <h5>You do not have favorites yet</h5> }
            {favouriteRecipesArr !== [] &&
                favouriteRecipesArr.map(recipe => <Recipe key={recipe.uri} recipe={recipe}/>)}
        </div>
    );
}

function mapStateToProps(state) {
    console.log("mapStateToProps")
    console.log(state)
    console.log(state.userInfo)
    return {
        favouriteRecipes: state.favouriteRecipes,
        userInfo: state.userInfo
    }
}

export default connect(mapStateToProps, null)(Favourites);

// export default Favourites;

