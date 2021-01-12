import {FETCH_PRODUCTS} from '../types';

export const productsReducer = (state = {}, action) => {
    switch(action.type){
        case FETCH_PRODUCTS: 
        console.log("PRODUCTS REDUCER:",action.payload);
            return {
                products: action.payload
            };
        default:
            return state;
    }
}