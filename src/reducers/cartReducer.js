import { ADD_TO_CART, REMOVE_FROM_CART } from "../types";

export const cartReducer = ( state = {}, action ) => {
    switch(action.type){
        case ADD_TO_CART: 
            return {
                ...state,
                productsInTheCart: action.payload.productsInTheCart
            };
        case REMOVE_FROM_CART: 
            return {
                ...state,
                productsInTheCart: action.payload.productsInTheCart
            };
        default:
            return state;
    }
}