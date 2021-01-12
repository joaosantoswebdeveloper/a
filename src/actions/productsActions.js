import {FETCH_PRODUCTS} from '../types';
export const fetchProducts = () => async(dispatch) => {

    /*fetch('http://localhost:5000/api/products')
    .then( response => response.json())
    .then( products => {
        console.log("products:",products);
        
    });*/
    const data = await fetch('http://localhost:5000/api/products');
    const products = await data.json();
    console.log("products(fetchProducts):", products.products);
    dispatch({
        type: FETCH_PRODUCTS,
        payload: products.products
    })
}