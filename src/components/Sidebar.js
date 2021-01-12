import React from 'react';
import { connect } from 'react-redux';
import { SITE_URL } from '../constants';
import formatCurrency from '../utils';
import Fade from 'react-reveal/Fade';
import {removeFromCart} from '../actions/cartActions';
import {createOrder, getClientId} from '../actions/orderActions';

class Sidebar extends React.Component{

    //
    
    handlePayment = (clientId, totalOrder) => {
        window.paypal.Button.render({
            env: 'sandbox',
            client: {
                sandbox: clientId,
                production: '',
            },
            locale: 'pt_PT',
            style: {
                size: 'responsive',
                color: 'gold',
                shape: 'pill',
            },

            commit: true,
            payment(data, actions) {
                return actions.payment.create({
                    transactions: [
                        {
                            amount: {
                                total: totalOrder,
                                currency: 'EUR',
                            },
                        },
                    ],
                });
            },
            onAuthorize(data, actions){
                return actions.payment.execute().then(async() => {
                    //showLoading();
                    //call pay order

    //createOrder
    //this.finishOrder();
    


    try {
        
        const response = await fetch('http://localhost:5000/api/finishOrder', {
            headers: {'Content-Type' : 'application/json'},
            method: 'POST',
            body: JSON.stringify({
                orderID: data.orderID,
                payerID: data.payerID,
                paymentID: data.paymentID,
            })
        });
        const orderPlaced = await response.json();
        console.log("orderPlaced:", orderPlaced);

    } catch (error) {
        console.log("ERROR (onAuthorize) :", error);   
    }




                    //hideLoading();
                    alert("JS Payment was successfull");
                });
            },
        },
        '#paypal-button'
        ).then( () => {
            //hideLoading();
        });

    };

    /*finishOrder(){

        const totalOrder = this.props.productsInTheCart.reduce( (a,c) => {
            return c.qty * c.product.price + a;
        },0);
    
        const itemsOrder = this.props.productsInTheCart.map( obj => {
    
            return {
                qty: obj.qty,
                price: obj.product.price,
                title: obj.product.title,
            }
        });
    
    
        
        this.props.createOrder( {
            emailOrder: this.state.emailOrder,
            nameOrder: this.state.nameOrder,
            addressOrder: this.state.addressOrder,
            totalOrder: totalOrder,
            itemsOrder: itemsOrder,
        });

    }*/

    addPayPalSdk = async (totalOrder) => {
        await this.props.getClientId();//await getPaypalClientId();
        const clientId = this.props.paypalClientId;


        console.log("addPayPalSdk", clientId);
        if(!window.paypal){
            const script = document.createElement('script');
            script.type = "text/javascript";
            script.src = "https://www.paypalobjects.com/api/checkout.js";
            script.async = true;
            script.onload = () => this.handlePayment(clientId, totalOrder);
            document.body.appendChild(script);
        }
        else{
            this.handlePayment(clientId, totalOrder);
        }
    };   

    //.




    constructor(props){
        super(props);
        this.state = {
            showCheckoutForm: false,
            emailOrder: "",
            nameOrder: "",
            addressOrder: "",
            isPaid: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    showCheckoutForm() {
        this.setState({
            ...this.state,
            showCheckoutForm: true
        });


        
        /*const totalOrder = this.props.productsInTheCart.reduce( (a,c) => {
            return c.qty * c.product.price + a;
        },0);
        this.addPayPalSdk(totalOrder);*/

    }

    
    handleSubmit(event) {
        event.preventDefault();
        //this.finishOrder();
        /*alert(
            'A order was submitted- emailOrder: ' + this.state.emailOrder +
            ',nameOrder: ' + this.state.nameOrder +
            'addressOrder: ' + this.state.addressOrder
            );*/

        const totalOrder = this.props.productsInTheCart.reduce( (a,c) => {
                return c.qty * c.product.price + a;
            },0);
        const itemsOrder = this.props.productsInTheCart.map( obj => {
            return {
                qty: obj.qty,
                price: obj.product.price,
                title: obj.product.title,
            }
        });

        





        /*if(!this.state.isPaid){
            this.addPayPalSdk(totalOrder);
            //console.log("NOT YYET PAID");
        }*/


        
        this.props.createOrder( {
            emailOrder: this.state.emailOrder,
            nameOrder: this.state.nameOrder,
            addressOrder: this.state.addressOrder,
            totalOrder: totalOrder,
            itemsOrder: itemsOrder,
        });


    }
    handleChange(e){
        console.log("handleChange: e.target.name: ", e.target.name);
        console.log("e.target.value: ", e.target.value);
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    componentDidMount = async() => {
      
        //const clientId = this.props.getClientId();
        //console.log("clientId(componentDidMount) ", clientId);
/*
        const response = await fetch('http://localhost:5000/api/paypal-client-id');//await getPaypalClientId();
        const clientId = response.json();
        
        console.log("clientId(componentDidMount) ",clientId.paypalclientid);
    */
    }

    render() {

        
        return (
            <div className="sidebar">
                <div className="sidebarTitle">
                    {this.props.productsInTheCart ? ("You have " + this.props.productsInTheCart.length + " products in the cart") : 'You have no products in the cart!' }
                </div>
                
                {this.props.productsInTheCart && 
                <div className="sidebarBasket">

                    <Fade left cascade>
                    <ul>
                        {this.props.productsInTheCart.map( (item) => {
                            return (
                            <li key={item.product._id}>
                                <div className="leftItemBasket">
                                    <img src={SITE_URL + item.product.image} alt={item.product.title} />
                                </div>
                                <div className="rightItemBasket">
                                    
                                    
                                    <div className="descriptionItemBasket">
                                        {item.product.title}
                                    </div>
                                    <div className="priceItemBasket">
                                       <div className="priceLeftItemBasket">
                                            {item.qty + " x " + formatCurrency(item.product.price)}
                                       </div>
                                       <div className="priceRightItemBasket">
                                            <button onClick={()=>{this.props.removeFromCart(item.product._id)}} className="button button-remove-from-cart">Remove</button>
                                       </div>
                                    </div>
                                </div>
                            </li>)
                        })}
                    </ul>
                    </Fade>
                </div>}

                
                {this.props.productsInTheCart && 
                <div className="proceed-to-checkout">
                    <div>Total: {formatCurrency(
                        
                        this.props.productsInTheCart.reduce( (a,c) => {

                            return c.qty * c.product.price + a;
                        },0)
                    )}</div>
                    <div><button onClick={()=>{this.showCheckoutForm()}} className="button button-add-to-cart">Proceed</button></div>
                </div>

                }
                
                {this.state.showCheckoutForm &&
                    <div className="showCheckoutForm">
                        
                        <form onSubmit={this.handleSubmit}>
                            <div>
                                <label>Email:</label>
                                <input name="emailOrder" type="email" required defaultValue="@gmail.com" onChange={this.handleChange} />
                            </div>
                            <div>
                                <label>Name:</label>
                                <input name="nameOrder" type="text" required defaultValue="" onChange={this.handleChange} />
                            </div>
                            <div>
                                <label>Address:</label>
                                <input name="addressOrder" type="text" required defaultValue="" onChange={this.handleChange} />
                            </div>
                            {<button className="button button-add-to-cart">Checkout</button>}
                            {/* <div id="paypal-button"></div> */ }
                        </form>

                    </div>
                }
                {/*<div id="paypal-button"></div>*/}

            </div>
         );
    }
}
export default connect(
    (
        (state) => ({
            productsInTheCart: state.cart.productsInTheCart,
            paypalClientId: state.order.paypalclientid
        })
    ),
    {
        removeFromCart,
        createOrder,
        getClientId
    }
)(Sidebar);