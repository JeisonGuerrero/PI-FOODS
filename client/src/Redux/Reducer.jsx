import { GET_ALL_RECIPES,
    GET_BY_NAME,
    GET_BY_ID,
    GET_ALL_DIETS,
 } from './Actions';

const initialState = {
    recipes: [],
    recipesName: [],
    recipesId: {},
    diets: [],
};

export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_RECIPES: return {
            ...state,
            recipes: action.payload,
        }
        case GET_BY_NAME: return {
            ...state,
            recipesName: action.payload,
        }
        case GET_BY_ID: return {
            ...state,
            recipesId: action.payload,
        }
        case GET_ALL_DIETS: return {
            ...state,
            diets: action.payload,
        }
        default: return state;
    }
};