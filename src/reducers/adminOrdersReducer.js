import {GET_ADMIN_ORDERS} from '../types';

export const adminOrdersReducer = (state = {}, action) => {
    switch(action.type){
        case GET_ADMIN_ORDERS: 
            return{
                adminOrders: action.payload
            };
        default:
            return state;
    }
}