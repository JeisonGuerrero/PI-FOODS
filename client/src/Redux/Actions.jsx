import axios from 'axios';


export const GET_ALL_RECIPES = 'GET_ALL_RECIPES';
export const GET_BY_NAME = 'GET_BY_NAME';
export const GET_BY_ID = 'GET_BY_ID';
export const GET_ALL_DIETS = 'GET_ALL_DIETS';

export const getAllRecipes = () => {
    return async function (dispatch) {
    try {
        const response = await axios('http://localhost:3001/recipes');
        dispatch({
            type: GET_ALL_RECIPES,
            payload: response.data.result
        })
    } catch (error) {
        console.log(error);
     }    
    }
}

export const getRecipesByName = (name) => { 
    return async function (dispatch) {
    try {
        const response = await axios(`http://localhost:3001/recipes?name=${name}`);
        dispatch({
            type: GET_BY_NAME,
            payload: response.data.result
        })
    } catch (error) {
        console.log(error);
     }    
    }
}

export const getRecipesById = (id) => { 
    return async function (dispatch) {
    try {
        const response = await axios(`http://localhost:3001/recipes/${id}`);
        dispatch({
            type: GET_BY_ID,
            payload: response.data.result
        })
    } catch (error) {
        console.log(error);
     }    
    }
}

export const getAllDiets = () => { 
    return async function (dispatch) {
    try {
        const response = await axios('http://localhost:3001/diets');
        dispatch({
            type: GET_ALL_DIETS,
            payload: response.data.result
        })
    } catch (error) {
        console.log(error);
     }    
    }
}

