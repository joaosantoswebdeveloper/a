import { connect } from 'react-redux';
import React from 'react';
import {getAdminOrders} from '../actions/adminOrdersActions';
import formatCurrency from '../utils';

class AdminScreen extends React.Component {

    
    /*constructor(props) {
        super(props);
        this.state = {
            adminOrders: null
        }
    }*/
    componentDidMount() {
        //console.log("(componentDidMount) adminOrders:", this.props.getAdminOrders());
        this.setState({
            adminOrders: this.props.getAdminOrders()
        });
    }

    render() {
        /*const orders = this.getOrders();
        console.log("orders",orders);*/
        
        //const adminOrders = this.props.getAdminOrders();
        
        return (
            <div className="adminScreen">
                <div className="adminScreenHeader">
                    <div className="idOrder">id</div>
                    <div className="nameOrder">name</div>
                    <div className="emailOrder">email</div>
                    <div className="itemsOrder">items</div>
                    <div className="totalOrder">total</div>
                    <div className="createdAtOrder">createdAt</div>
                    <div className="isPaidOrder">isPaid</div>
                    <div className="orderIDOrder">orderID</div>
                    <div className="payerIDOrder">payerID</div>
                    <div className="paymentIDOrder">paymentID</div>
                </div>
            {this.props.adminOrders &&
                
                this.props.adminOrders.map( order => {
                    console.log("order",order);
                        return (
                        <div key={order._id} className="adminScreenRow">
                            <div className="idOrder">{order._id ? order._id : ''}</div>
                            <div className="nameOrder">{order.name ? order.name : ''}</div>
                            <div className="emailOrder">{order.email ? order.email : ''}</div>
                            <div className="itemsOrder">{
                            order.items &&
                            //order.items._id + " x " + order.items.title
                            order.items.map( item => {
                                return item.qty + " x " + item.title
                            })

                            }</div>
                            <div className="totalOrder">{order.total ? formatCurrency(order.total) : ''}</div>
                            <div className="createdAtOrder">{order.createdAt ? order.createdAt : ''}</div>
                            <div className="isPaidOrder">{order.isPaid ? "PAID" : 'Not Paid'}</div>
                            <div className="orderIDOrder">{order.orderID}</div>
                            <div className="payerIDOrder">{order.payerID}</div>
                            <div className="paymentIDOrder">{order.paymentID}</div>
                        </div>);
                    })
            }
            </div>
        );
    }
}

export default connect(
    (
        (state) => ({
            adminOrders: state.adminOrders.adminOrders
        })
    ),
    {
        getAdminOrders
    }
)(AdminScreen);
