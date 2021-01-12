import React from 'react';
import { connect } from 'react-redux';
import {orderChanged, typeChanged} from '../actions/filterActions';


class Filter extends React.Component {
    render() {
        return (
            <div className="filterBar">
                <div className="counterFilterBar">
                {
                    this.props.products ? 
                    (this.props.products.length + " Products") : ("You have no products")
                }
                </div>
                <div className="byOrderFilterBar">
                    {"Order "}
                    <select onChange={ (e)=>{this.props.orderChanged(e)} }>
                        <option>Newest</option>
                        <option>Lowest Price</option>
                        <option>Highest Price</option>
                    </select>
                </div>
                <div className="byTypeFilterBar" onChange={ (e)=>{this.props.typeChanged(e)} }>
                    {"Type "}
                    <select>
                        <option>All</option>
                        <option>Gold</option>
                        <option>Black</option>
                        <option>Silver</option>
                        <option>Red</option>
                        <option>Orange</option>
                    </select>
                </div>
            </div>
        );
    }
}
export default connect(
    (
        (state) => ({
            products: state.filter.filteredProducts || state.products.products
        })
    ),
    {
        orderChanged,
        typeChanged
    }
)(Filter);