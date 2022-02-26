import React from "react";
import {connect} from "react-redux";
import Recipe from "./Recipe";

function Favourites(props) {
    let favouriteRecipesArr = Object.values(props.favouriteRecipes)

    return (
        <div className="favourites">
            <h1 className="favourite-h1">My Cookbook</h1>
            {props.userInfo? 'You have not yet added any recipes to your favorites'  : 'You need to log in to add and view your favorites'}
            {favouriteRecipesArr !== [] &&
                favouriteRecipesArr.map(recipe => <Recipe key={recipe.uri} recipe={recipe}/>)}
        </div>
    );
}

function mapStateToProps(state) {
    console.log("mapStateToProps")
    console.log(state)
    return {
        favouriteRecipes: state.favouriteRecipes,
        userInfo: state.userInfo
    }
}

export default connect(mapStateToProps, null)(Favourites);

// export default Favourites;

