import {SORT_BY_ORDER, SORT_BY_TYPE} from '../types';

export const filterReducer = ( state = {}, action ) => {
    switch(action.type){
        case SORT_BY_ORDER: 
            return {
                filteredProducts: action.payload.filteredProducts
            };
        case SORT_BY_TYPE: 
            return {
                filteredProducts: action.payload.filteredProducts
            };
        default:
            return state;
    }
}