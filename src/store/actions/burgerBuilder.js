import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

export const addIngredient = (name) => {
    return {
        type:actionTypes.ADD_INGREDIENTS,
        ingredientName:name
    }
}

export const removeIngredient = (name) => {
    return {
        type:actionTypes.REMOVE_INGREDIENTS,
        ingredientName:name
    }
}

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const iniitIngredients = () => {
    return dispatch => {
         axios.get('https://burger-max-5563e.firebaseio.com/ingredients.json')
            .then(res => {
                dispatch(setIngredients(res.data))
            })
    }
}