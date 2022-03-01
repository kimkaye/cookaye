import React, { useState } from "react";
import Recipe from "./Recipe";
import Alert from "../Alert";
import {connect} from 'react-redux';
import { searchRecipesAction } from '../../actions/index'
import { Oval } from  'react-loader-spinner'


const RecipePage = (props) => {

    const [query, setQuery] = useState("");
    const [alert, setAlert] = useState("");

    const onChange = e => {setQuery(e.target.value)};

    const onSubmit = e => {
        e.preventDefault();
        if (query !== "") {
            console.log("query: "+query)
            props.searchRecipe(query)
        }
    };

    return (
        <div className="RecipePage">
            <form onSubmit={onSubmit} className="search-form">
                {alert !== "" && <Alert alert={alert}/>}
                <input
                    type="text"
                    name="query"
                    onChange={onChange}
                    value={query}
                    autoComplete="off"
                    placeholder="Search Recipes"
                    className="input-search"
                />
                <input type="submit" value="Search" className="search-button"/>
            </form>
            <div className="recipes">
                {props.isLoading &&
                    <h2>
                        Searching...
                        <Oval color="black" height={80} width={80} />
                    </h2>

                }
                {props.recipes !== [] &&
                    props.recipes.map(data => <Recipe key={data.recipe.uri} recipe={data}/>)}

            </div>

        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return{
        searchRecipe: (input) => dispatch(searchRecipesAction(input)),
    }
}

function mapStateToProps(state) {
    console.log("mapStateToProps")
    console.log(state)
    return {
        recipes: state.recipes,
        err: state.error,
        isLoading: state.isLoading,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipePage);
// export default RecipePage
