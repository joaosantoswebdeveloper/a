const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    email: {type: String,required: true},
    name: {type: String,required: true},
    address: {type: String,required: true},
    total: {type: Number,required: true},
    items: [
        {
            qty: Number,
            title: String
        }
    ],
    isPaid: {type: Boolean,required: false},
    orderID: {type: String,required: false},
    payerID: {type: String,required: false},
    paymentID: {type: String,required: false},
},
{
    timestamps: true
}
);

const Order = mongoose.model( 'Order', orderSchema);
module.exports = Order;