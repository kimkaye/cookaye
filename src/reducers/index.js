import {ACTION_TYPES} from "../actions/index";

const reducer = (state, action) => {
    console.log(action,state);
    switch (action.type) {
        case ACTION_TYPES.BEGIN_RECIPE_SEARCH: {
            console.log(" ---- REDUCER ---- ", action.type)
            return {
                ...state, //copying the original state
                isLoading: true
            }
        }
        case ACTION_TYPES.RECIPE_SEARCH_SUCCESS: {
            console.log(" ---- REDUCER ---- ", action.type)
            return {
                ...state, //copying the original state
                recipes: action.payload.recipes, //update the value of the weekday key with the value of action.payload.day
                isLoading: false,
                error: null
            }
        }
        case ACTION_TYPES.RECIPE_SEARCH_FAILURE: {
            console.log(" ---- REDUCER ----", action.type)
            return {
                ...state, //copying the original state
                recipes: [], //update the value of the weekday key with the value of action.payload.day
                isLoading: false, //update the value of the joke key
                error: action.payload.err //update the value of the err key with the value of action.payload.err
            }
        }
        case ACTION_TYPES.INSERT_USER_INFO: {
            console.log(" ---- REDUCER ----", action.type)
            return {
                ...state, //copying the original state
                userInfo: action.payload.userInfo
            }
        }
        case ACTION_TYPES.REMOVE_FAVOURITE_RECIPE: {
            console.log(" ---- REDUCER ----", action.type)
            let favouriteRecipes = {...state.favouriteRecipes};
            delete favouriteRecipes[action.payload.favouriteRecipe.recipe.uri];
            return {
                ...state, //copying the original state
                favouriteRecipes: favouriteRecipes
            }
        }
        case ACTION_TYPES.BEGIN_ADD_TO_FAVOURITES: {
            console.log(" ---- REDUCER ---- ", action.type)
            return {
                ...state, //copying the original state
                isLoadingFav: true
            }
        }
        case ACTION_TYPES.BEGIN_ADD_TO_FAVOURITES_SUCCESS: {
            console.log(" ---- REDUCER ---- ", action.type)
            let favouriteRecipes = {...state.favouriteRecipes}
            favouriteRecipes[action.payload.favouriteRecipe.recipe.uri] = action.payload.favouriteRecipe
            return {
                ...state, //copying the original state
                favouriteRecipes: favouriteRecipes,
                isLoadingFav: false,
                favError: null
            }
        }
        case ACTION_TYPES.BEGIN_ADD_TO_FAVOURITES_FAILURE: {
            console.log(" ---- REDUCER ----", action.type)
            return {
                ...state, //copying the original state
                isLoadingFav: false, //update the value of the joke key
                favError: action.payload.err //update the value of the err key with the value of action.payload.err
            }
        }
        case ACTION_TYPES.GET_FAV_SUCCESS: {
            console.log(" ---- REDUCER ---- ", action.type)
            let favouriteRecipes = {}
            for(let i = 0; i < action.payload.favouriteRecipes.length; i++){
                let recipe = action.payload.favouriteRecipes[i];
                favouriteRecipes[recipe.recipe.uri] = recipe;

            }
            return {
                ...state, //copying the original state
                favouriteRecipes: favouriteRecipes,
            }
        }
        case ACTION_TYPES.LOGOUT: {
            console.log(" ---- REDUCER ---- ", action.type)
            return {
                recipes: [],
                favouriteRecipes: {},
                isLoading: false,
                isLoadingFav: false,
                error: null,
                favError: null,
                userInfo: null
            }
            // window.location.href = '/home';
        }
        default:
            return state;
    }
}

export { reducer };