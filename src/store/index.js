import { createStore, applyMiddleware } from "redux";
import { reducer } from "../reducers/index";
import thunk from 'redux-thunk';

//new
const initialState = {
    recipes: [],
    favouriteRecipes: {},
    isLoading: false,
    isLoadingFav: false,
    error: null,
    favError: null,
    userInfo: null
}

export const store = createStore(reducer, initialState, applyMiddleware(thunk));