import React from 'react';
import { SITE_URL } from '../constants';
import formatCurrency from '../utils';
import Fade from 'react-reveal/Fade';
import {fetchProducts} from '../actions/productsActions';
import {addToCart} from '../actions/cartActions';
import {cleanOrder, getClientId} from '../actions/orderActions';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import Filter from './Filter';

Modal.setAppElement('#root');

class Products extends React.Component{


    addPayPalSdk = async (orderId, totalOrder) => {
        //await this.props.getClientId();//await getPaypalClientId();
        const clientId = await this.props.paypalClientId;


        console.log("addPayPalSdk", clientId);
        if(!window.paypal){
            const script = document.createElement('script');
            script.type = "text/javascript";
            script.src = "https://www.paypalobjects.com/api/checkout.js";
            script.async = true;
            script.onload = () => this.handlePayment(clientId, orderId, totalOrder);
            document.body.appendChild(script);
        }
        else{
            this.handlePayment(clientId, orderId, totalOrder);
        }
    };  

    handlePayment = (clientId, orderId, totalOrder) => {
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
        
        const response = await fetch("http://localhost:5000/api/finishOrder/" + orderId, {
            headers: {'Content-Type' : 'application/json'},
            method: 'PUT',
            body: JSON.stringify({
                orderID: data.orderID,
                payerID: data.payerID,
                paymentID: data.paymentID,
            })
        });
        const orderPlaced = await response.json();
        console.log("orderPlaced:", orderPlaced);

        if(orderPlaced.updatedOrder.isPaid){
            /*
            console.log("RE-RENDER MODAL");
            
            */
        }


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



    constructor(props) {
        super(props);
        this.state = {
            product: null,
            isOpenModal: false,
            loading: true,
        }
    }
    /*componentDidMount() {
        fetch('http://localhost:5000/api/products')
        .then( response => response.json())
        .then( products => {
            console.log("products:",products);
            this.setState({
                loading: false,
                products
            });

            this.products = products;
        })
        .catch( error => console.log("error11: ",error));
        
    }*/

    componentDidMount() {
        this.props.fetchProducts();
        //console.log("xxxxxxxxstate", this.props.products)


        



    }

    openModal = (product) => {
        this.setState({
            product,
            isOpenModal: true
        })
    }
    closeModal = () => {
        this.setState({
            product: null,
            isOpenModal: false
        });
    }

    render() {
        const {product} = this.state;

        //console.log( "order: ", (this.props.order), "order.emailOrder: ", (this.props.order.emailOrder))



        
       
        if(
            (this.props.order !== undefined ) &&
            this.props.order.emailOrder 
        ){
            
            this.addPayPalSdk( this.props.order._id, this.props.order.itemsOrder.reduce(
                (a,c)=>{
                    return c.qty * c.price + a
                },0
            ));
        }







if(
    this.props.order === undefined
    ){
    console.log( "order EMPTY OBJECT");
}
else{
    console.log( "order not empty OBJECT");
}


        return (
        !this.props.products ? 
        (<div>Loading...</div>):
        (
            
            
        <Fade bottom cascade>
        
    <div className="productsWrapper">
        <Filter></Filter>
        
        <ul className="products">
         {/* <Fade bottom cascade> */}   
            {this.props.products.map( product => {
                return (
                    

                    <li key={product._id} className="productWrapper">
                        <div className="productImage">
                            <img onClick={ () => this.openModal(product) } src={SITE_URL + product.image} alt={product.title} />
                        </div>
                        <div className="productTitle">
                            {product.title}
                        </div>
                        <div className="productActions">
                            <span>{formatCurrency(product.price)}</span>
                            <button onClick={()=>{this.props.addToCart(product)}} className="button button-add-to-cart">Add to Cart</button>
                        </div>
                    </li>
                );
            })}
        {/* </Fade> */}    
        </ul>
    </div>


        <Modal
        isOpen={ this.state.isOpenModal || (this.props.order !== undefined) }
        onRequestClose={this.closeModal} ><button className="closeModalButton" onClick={ 
            ()=>{
                this.props.cleanOrder();
                this.closeModal();
            }
            
            }>x</button>
                
       
       
        { (this.props.order !== undefined ) &&
            this.props.order.emailOrder &&
            
            <div className="wrapperModal">
                <div className="xdescriptionModal">

                    <h2>Your order has been placed!</h2>
                    <p className="orderNumber">{"Order " + this.props.order._id}</p>
                    <ul className="orderDetails">
                        <li>
                            <div>Name</div>
                            <div>{this.props.order.nameOrder}</div>
                        </li>
                        <li>
                            <div>Email</div>
                            <div>{this.props.order.emailOrder}</div>
                        </li>
                        <li>
                            <div>Total</div>
                            <div>{ formatCurrency( this.props.order.itemsOrder.reduce(
                                (a,c)=>{
                                    return c.qty * c.price + a
                                },0
                            ) ) }
                            </div>
                        </li>
                        <li>
                            <div>Date</div>
                            <div>{this.props.order.createdAt}</div>
                        </li>
                        <li>
                            <div>Items</div>
                            <div>{this.props.order.itemsOrder.map( item=>{
                                return item.qty + ' x ' + item.title
                            })}</div>
                        </li>
                        {!this.props.order.isPaid &&
                        <li>
                            <div id="paypal-button"></div>
                        </li>
                        }
                    </ul>
                </div>
            </div>
        }
        
        



        {!this.state.product ? '' :
        <div className="wrapperModal">
            
            <div className="imageModal">
                <img className="product-image" src={this.state.product.image} alt={this.state.product.title} />
            </div>
            <div className="descriptionModal">
                <h2>{this.state.product.title}</h2>
                <p>{this.state.product.description}</p>
                <p className="availableColors">{"Available Sizes: "}
                    
                    {this.state.product.availableColors.map( (size) => {
                        return (<span key={size}>{size}</span>);
                    })}</p>
                <div className="priceModal">
                    <p>{formatCurrency( this.state.product.price )}</p>
                    <div className="addToCartModal">
                        <button onClick={ ()=>{
                            this.props.addToCart(product);
                            // eslint-disable-next-line no-unused-expressions
                            this.closeModal();
                        }} className="button button-add-to-cart">Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
        }
        </Modal>
        </Fade>
        ));
    }
}
export default connect(
    (
        (state)=>({
            products: state.products.products,
            productsInTheCart: state.cart.productsInTheCart,
            order: state.order.order,
            //paypalClientId: state.order.paypalclientid
        })
    ),
    {
        fetchProducts,
        addToCart,
        cleanOrder,
        //getClientId
    }
)(Products);