import axios from "axios";
import {toast} from "react-toastify";

export const ACTION_TYPES = {
    BEGIN_RECIPE_SEARCH: "BEGIN_RECIPE_SEARCH",
    RECIPE_SEARCH_SUCCESS: "RECIPE_SEARCH_SUCCESS",
    BEGIN_ADD_TO_FAVOURITES_SUCCESS: "BEGIN_ADD_TO_FAVOURITES_SUCCESS",
    RECIPE_SEARCH_FAILURE: "RECIPE_SEARCH_FAILURE",
    BEGIN_ADD_TO_FAVOURITES_FAILURE: "BEGIN_ADD_TO_FAVOURITES_FAILURE",
    INSERT_USER_INFO: "INSERT_USER_INFO",
    INSERT_FAVOURITE_RECIPE: "INSERT_FAVOURITE_RECIPE",
    REMOVE_FAVOURITE_RECIPE: "REMOVE_FAVOURITE_RECIPE",
    BEGIN_ADD_TO_FAVOURITES: "BEGIN_ADD_TO_FAVOURITES",
    GET_FAV_SUCCESS: "GET_FAV_SUCCESS",
    LOGOUT: "LOGOUT"
};

//1.
const beginRecipeSearch = () => {
    console.log("---- ACTION CREATOR : beginRecipeSearch ---- ")
    return {
        type: ACTION_TYPES.BEGIN_RECIPE_SEARCH,
    }
}
const beginAddToFavourite = () => {
    console.log("---- ACTION CREATOR : beginAddToFavourite ---- ")
    return {
        type: ACTION_TYPES.BEGIN_ADD_TO_FAVOURITES,
    }
}

const recipeSearchSuccess = (recipes) => {
    console.log("---- ACTION CREATOR : recipe Search Success ---- ")
    return {
        type: ACTION_TYPES.RECIPE_SEARCH_SUCCESS,
        payload: {
            recipes: recipes
        }
    }
}
const beginAddToFavouriteSuccess = (favouriteRecipe) => {
    console.log("---- ACTION CREATOR : beginAddToFavouriteSuccess ---- ")
    return {
        type: ACTION_TYPES.BEGIN_ADD_TO_FAVOURITES_SUCCESS,
        payload: {
            favouriteRecipe: favouriteRecipe
        }
    }
}

const recipeSearchFailure = (recipeName, err) => {
    console.log("---- ACTION CREATOR : recipeSearchFailure ---- ")
    return {
        type: ACTION_TYPES.RECIPE_SEARCH_FAILURE,
        payload: {
            recipeName: recipeName,
            err: err
        }
    }
}
const beginAddToFavouriteFailure = (favouriteRecipe, err) => {
    console.log("---- ACTION CREATOR : beginAddToFavouriteFailure ---- ")
    return {
        type: ACTION_TYPES.BEGIN_ADD_TO_FAVOURITES_FAILURE,
        payload: {
            favouriteRecipe: favouriteRecipe,
            err: err
        }
    }
}
const getFavouritesSuccess = (favouriteRecipes) => {
    console.log("---- ACTION CREATOR : getFavouritesSuccess ---- ")
    return {
        type: ACTION_TYPES.GET_FAV_SUCCESS,
        payload: {
            favouriteRecipes: favouriteRecipes,
        }
    }
}

//2.
export const searchRecipesAction = (recipeName) => {
    console.log("---- Redux Thunk ---- NEW ACTION CREATOR ---- ")

    return dispatch => {
        dispatch(beginRecipeSearch());
        const APP_ID = "52a82f98";
        const APP_KEY = "7f861f87ff0f42bf8ae76ae412cb89ac";
        const url = `https://api.edamam.com/search?q=${recipeName}&app_id=${APP_ID}&app_key=${APP_KEY}`;
        const options = {
            method: "GET",
            headers: {
                Accept: "application/json",
                // "Content-Type": "application/json;charset=UTF-8",
            },
        };
        fetch(url, options)
            .then((response) => response.json())
            .then((searchResponse) => {
                console.log(searchResponse);
                dispatch(recipeSearchSuccess(searchResponse.hits));
            }).catch((err) => {
                console.error(err)
                dispatch(recipeSearchFailure(recipeName, err.message));
        });
    };
};

export const insertUserInfo = (userInfo) => {
    console.log("---- ACTION CREATOR : insertUserInfo ---- ")
    return {
        type: ACTION_TYPES.INSERT_USER_INFO,
        payload: {
            userInfo: userInfo
        }
    }
}



const removeFromFavourites = (recipe) => {
    console.log("---- ACTION CREATOR : removeFromFavourites ---- ")
    return {
        type: ACTION_TYPES.REMOVE_FAVOURITE_RECIPE,
        payload: {
            favouriteRecipe: recipe
        }
    }
}

export const addFavouriteToServer = (favouriteRecipe) => {
    console.log("---- Redux Thunk ---- NEW ACTION CREATOR ---- ")

    return dispatch => {
        dispatch(beginAddToFavourite());

        let responsePromise = axios.post('http://localhost:5001/user/favourites',{
            recipe: favouriteRecipe
        },{
            withCredentials: true,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        })
        responsePromise
            .then((response) => response.data)
            .then((data) => {
                console.log("data");
                console.log(data);
                dispatch(beginAddToFavouriteSuccess(data.recipe));
            }).catch((err) => {
                console.error(err)
                dispatch(beginAddToFavouriteFailure(favouriteRecipe, err.message));
        });
    };
};

export const removeFavouriteFromServer = (favouriteRecipe) => {
    console.log("---- Redux Thunk ---- NEW ACTION CREATOR ---- ")

    return dispatch => {

        let responsePromise = axios.delete('http://localhost:5001/user/favourites',{
            withCredentials: true,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            data: {
                recipe: favouriteRecipe
            }
        })
        responsePromise
            .then((response) => response.data)
            .then((data) => {
                console.log("data");
                console.log(data);
                dispatch(removeFromFavourites(data.recipe));
            }).catch((err) => {
            console.error(err)
        });
    };
};

export const getFavouritesFromServer = () => {
    console.log("---- Redux Thunk ---- NEW ACTION CREATOR ---- ")
    return dispatch => {
        let responsePromise = axios.get('http://localhost:5001/user/favourites',
        {
            withCredentials: true,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        })
        responsePromise
            .then((response) => response.data)
            .then((data) => {
                console.log("data");
                console.log(data);
                dispatch(getFavouritesSuccess(data.favouriteRecipes));
            }).catch((err) => {
            console.error(err)
        });
    };
}

const logout = () => {
    console.log("---- ACTION CREATOR : logout ---- ")
    return {
        type: ACTION_TYPES.LOGOUT,
    }
}

export const logoutFromServer = () => {
    console.log("---- Redux Thunk ---- NEW ACTION CREATOR ---- ", "logoutFromServer")
    return dispatch => {
        let responsePromise = axios.get('http://localhost:5001/logout',
            {
                withCredentials: true,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                }
            })
        responsePromise
            .then((response) => response.data)
            .then((data) => {
                console.log("after logout response");
                dispatch(logout());
            }).catch((err) => {
            console.error(err)
        });
    };
}



