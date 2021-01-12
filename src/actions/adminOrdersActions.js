import {GET_ADMIN_ORDERS} from '../types';

export const getAdminOrders = () => async(dispatch) => {

    const response = await fetch('http://localhost:5000/api/admin');
    const data = await response.json();
    console.log("getAdminOrders :", data.orders);
    
    /*const test = data.orders.sort( function(a,b) {

        
        console.log("a ", a.email , " ,b ", b.email );
        if(a.email > b.email){
            console.log("a wins" ); 
        }
        return (a.email < b.email);
    });
    console.log("test :", test);*/
    dispatch({
        type: GET_ADMIN_ORDERS,
        payload: data.orders
    })
}