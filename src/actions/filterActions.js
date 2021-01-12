import {SORT_BY_ORDER, SORT_BY_TYPE} from '../types';

export const orderChanged = (e) => (dispatch, getState) => {
    //console.log( "orderChanged" , e.target.value );
    
    const sortBy = e.target.value;
    const products = getState().filter.filteredProducts || getState().products.products;
    console.log( "(orderChanged) getState().products.filteredProducts" , getState().filter.filteredProducts );
    console.log( "(orderChanged) products" , products );

    const sortedProducts =  products.slice()
    .sort((a,b) => 
    sortBy === "Lowest Price"
    ? a.price > b.price 
    ? 1
    : -1
    : sortBy === "Highest Price"
    ? a.price < b.price
    ? 1
    : -1
    : a._id < b._id
    ? 1
    : -1
    );
    console.log("sortedProducts:", sortedProducts);



    /*let filteredProducts = [];
    switch(e.target.value){
        case "Highest Price":
            filteredProducts = products;break;
        case "Lowest Price":
            filteredProducts = products;break;
        default://id
            filteredProducts = products;
    }

    filteredProducts = filteredProducts.filter( product => {
        return Number(product.price)>29;
    });
    console.log( "filteredProducts" , filteredProducts );*/

    dispatch({
        type: SORT_BY_ORDER, SORT_BY_TYPE,
        payload: {
            filteredProducts: sortedProducts
        }
    })
}
export const typeChanged = (e) => (dispatch, getState) => {

    const option = e.target.value;
    const products = getState().filter.filteredProducts || getState().products.products;
    console.log( "option" , option );
    console.log( "products" , products );


    let filteredProducts = products.filter( product => {

        if(e.target.value!=="All"){
            return product.availableColors.includes(option);
        }
        
        return product;
    });

    if(e.target.value==="All"){
        filteredProducts =  getState().products.products
    }


    console.log( "filteredProducts" , filteredProducts );

    dispatch({
        type: SORT_BY_TYPE,
        payload: {
            filteredProducts: filteredProducts
        }
    })
}