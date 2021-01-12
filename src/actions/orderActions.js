import {CREATE_ORDER, CLEAN_ORDER, GET_CLIENT_ID} from '../types';

export const createOrder = (order) => async(dispatch) => {

    console.log("order:", order);

    const response = await fetch('http://localhost:5000/api/placeOrder', {
        headers: {'Content-Type' : 'application/json'},
        method: 'POST',
        body: JSON.stringify(order)
    });
    const data = await response.json();
    console.log("data:", data);
    

    dispatch({
        type: CREATE_ORDER,
        payload: {
            ...order,
            createdAt: data.createdOrder.createdAt,
            _id: data.createdOrder._id,
            isPaid:false,
        }
    })
}
export const cleanOrder = () => (dispatch) => {

    console.log("cleanOrder:");
    dispatch({
        type: CLEAN_ORDER,
        payload: {}
    })
}



export const getClientId = () => async(dispatch) => {

    const response = await fetch('http://localhost:5000/api/paypal-client-id');
    const data = await response.json();
    console.log("data (getClientId):", data.paypalclientid);
    

    dispatch({
        type: GET_CLIENT_ID,
        payload: data.paypalclientid
    });
}

