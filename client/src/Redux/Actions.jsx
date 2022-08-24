import axios from 'axios';


const GET_ALL_RECIPES = 'GET_ALL_RECIPES';
const GET_BY_NAME = 'GET_BY_NAME';
const GET_BY_ID = 'GET_BY_ID';
const GET_ALL_DIETS = 'GET_ALL_DIETS';

const getAllRecipes = () => {
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

const getRecipesByName = (name) => { 
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

const getRecipesById = (id) => { 
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

const getAllDiets = () => { 
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

module.export = {
    getAllRecipes,
    getRecipesByName,
    getRecipesById,
    getAllDiets,
    GET_ALL_RECIPES,
    GET_BY_ID,
    GET_BY_NAME,
    GET_ALL_DIETS,    
}