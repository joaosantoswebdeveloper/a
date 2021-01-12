import {CREATE_ORDER, CLEAN_ORDER, GET_CLIENT_ID} from '../types';

export const orderReducer = (state = {}, action) => {
    switch(action.type){
        case CREATE_ORDER: 
            return{
                order: action.payload
            };
        case CLEAN_ORDER: 
            return{
                order: undefined
            };
        case GET_CLIENT_ID: 
            return{
                paypalclientid: action.payload
            };
        default:
            return state;
    }
}