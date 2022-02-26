import React, { useState } from "react";
import RecipeDetails from "./RecipeDetails";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Favorite from "@material-ui/icons/Favorite";
import IconButton from '@material-ui/core/IconButton';
import {addFavouriteToServer, removeFavouriteFromServer, searchRecipesAction} from "../../actions";
import {connect} from "react-redux";

const Recipe = ({ addRecipeToFav ,recipe, favouriteRecipes, removeRecipeFromFav }) => {
    const [show, setShow] = useState(false);
    const { label, image, url, ingredients, uri } = recipe.recipe;
    let isFavourite = false;
    let resultRecipe = favouriteRecipes[uri]
    if (resultRecipe){
        isFavourite = true
    }
    // for(let i = 0; i < favouriteRecipes.length; i++){
    //     if(favouriteRecipes[i].recipe.uri === recipe.recipe.uri){
    //         isFavourite = true
    //     }
    // }
    return (
        <div className="recipe">
            <h2>{label}</h2>
            <br/>
            <img src={image} alt={label} />
            <br/>

            {/*<button onClick={() => setShow(!show)}>Add to favourites &#10084</button>*/}
            <button><a href={url} target="_blank" rel="noopener noreferrer">
                Recipe details
            </a></button>
            <br/>
            <button onClick={() => setShow(!show)}>Ingredients</button>
            {show && <RecipeDetails ingredients={ingredients} />}
            <br/>
            {isFavourite &&
                <IconButton className="favourites-button" onClick={() => { removeRecipeFromFav(recipe); }}  aria-label="delete" color="primary">
                    <h1 className="add-to-fav">Remove favourite</h1>  <Favorite></Favorite>
                </IconButton>

            }
            {!isFavourite &&
                <IconButton className="favourites-button" onClick={() => { addRecipeToFav(recipe); }} aria-label="delete" color="primary">
                    <h1 className="add-to-fav">Add to favourite</h1> <FavoriteBorderIcon></FavoriteBorderIcon>
                </IconButton>
            }
            <br/>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return{
        addRecipeToFav: (favouriteRecipe) => dispatch(addFavouriteToServer(favouriteRecipe)),
        removeRecipeFromFav: (recipe) => dispatch(removeFavouriteFromServer(recipe))

    }
}
function mapStateToProps(state) {
    console.log("mapStateToProps")
    console.log(state)
    return {
        favouriteRecipes: state.favouriteRecipes
    }
}

// export default Recipe;
export default connect(mapStateToProps, mapDispatchToProps)(Recipe);
