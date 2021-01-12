const { default: Products } = require("../components/Products")
const { ADD_TO_CART, REMOVE_FROM_CART } = require("../types")


export const removeFromCart = (productId) => (dispatch, getState) => {

    let cartEmpty = true;
    let productsInTheCart = getState().cart.productsInTheCart;
    console.log("getState", getState());
    console.log("productsInTheCart", productsInTheCart );

    if(productsInTheCart){

        if( productsInTheCart.length>0 ){
            cartEmpty = false;
        }
    }


    if( !cartEmpty ){

        console.log("!cartEmpty" );

        productsInTheCart = productsInTheCart.filter( (item)=>{
            return item.product._id!==productId;
        });
        console.log("productsInTheCart_FILTERED", productsInTheCart );

        dispatch({
            type: REMOVE_FROM_CART,
            payload:{
                productsInTheCart: productsInTheCart
            }
        });

    }
}

export const addToCart = (product) => (dispatch, getState) => {

    let cartEmpty = true;
    let productsInTheCart = getState().cart.productsInTheCart;
    console.log("getState", getState());
    console.log("productsInTheCart", productsInTheCart );

    if(productsInTheCart){

        if( productsInTheCart.length>0 ){
            cartEmpty = false;
        }
    }


    if( !cartEmpty ){
    //cart not empty 
    console.log("//cart not empty ");


        const alreadyInTheCart = productsInTheCart.find( (item)=>{
            return item.product._id===product._id;
        });
        
        if(alreadyInTheCart){
            console.log("alreadyInTheCart");
            productsInTheCart = productsInTheCart.map((item)=>{
                if( item.product._id===product._id){
                    item.qty++;
                    console.log("ENCONTREI",product._id);
                }
                return item;
            });
            console.log("productsInTheCart",productsInTheCart);


        }
        else{
            console.log("NEW");

            productsInTheCart.push({
                qty: 1,
                product
            });
        }
        
    //cart not empty.
    }
    else{
    //empty cart
        console.log("empty cart");

        productsInTheCart = [];
        productsInTheCart.push({
            qty: 1,
            product
        });

    //empty cart.
    }


    dispatch({
        type: ADD_TO_CART,
        payload: {
            productsInTheCart: productsInTheCart
        }
    })
}