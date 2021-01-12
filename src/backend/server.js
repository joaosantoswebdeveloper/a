const express = require('express');
const mongoose = require('mongoose');
//const data = require('./data');
const cors = require('cors');
const bodyParser = require('body-parser');
const Product = require('./models/Product');
const Order = require('./models/Order');

const config = require('./config');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect( "mongodb://localhost/reactreduxfunkostore", {
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
}).then(message=>{
    console.log("Sucess connecting to bd"   );
}).catch(error=>{
    console.log("error", error);
});

app.get('/api/products', async(req,res) => {
    try {
        //console.log("data", data);

        const products = await Product.find({});
        res.status(200).send({products});
    } catch (error) {
        res.status(500).send({message: error});
    }
});
app.post('/api/products', async(req,res) => {
    try {
        const data = req.body;
        console.log("data", data);

        const newProduct = new Product({
            _id: data._id,
            image: data.image,
            title: data.title,
            description: data.description,
            availableColors: data.availableColors,
            price: data.price,
        });
        try {
            await newProduct.save();
            res.status(200).send({message: data});
        } catch (error) {
            console.log("error saving new product", error);
            res.status(500).send({message: "error saving new product: " + error});
        }

    } catch (error) {
        res.status(500).send({message: error});
    }
});
app.delete('/api/products/delete/:id', async(req,res) => {
    try {
        const id = req.params.id;
        try {
            const status = await Product.findByIdAndDelete(id);
            res.status(200).send({message: status});
        } catch (error) {
            console.log("error deleting product", id);
            res.status(500).send({message: "error deleting product: " + error});
        }

    } catch (error) {
        res.status(500).send({message: error});
    }
});



app.post('/api/placeOrder', async(req,res) => {
    try {
        console.log("server placeOrder:", req.body);

        const newOrder = new Order({
            email: req.body.emailOrder,
            name: req.body.nameOrder,
            address: req.body.addressOrder,
            total: req.body.totalOrder,
            items: req.body.itemsOrder,
            isPaid: false,
            orderID: null,
            payerID: null,
            paymentID: null,
        });
        console.log("server newOrder:", newOrder);
        const createdOrder = await newOrder.save();
        
        res.status(200).send({createdOrder: createdOrder});
    } catch (error) {
        res.status(500).send({message: error});
    }
});

app.get("/api/admin", async(req,res)=>{

    try {
        const orders = await Order.find({});
        res.status(200).send({orders: orders});        
    } catch (error) {
        res.status(500).send({error});
    }
});


app.get("/api/paypal-client-id", async(req,res)=>{

    try {
        res.status(200).send({paypalclientid: config.PAYPAL_CLIENT_ID});        
    } catch (error) {
        res.status(500).send({error});
    }
});


app.put('/api/finishOrder/:orderId', async(req,res) => {
    try {

        const orderId = req.params.orderId;
        console.log("server finishOrder:", req.body," e orderId:", orderId);
        const order = await Order.findById(orderId);

        if(!order){
            res.status(404).send({message: "error order not Exists!"});
        }
        else{
            order.isPaid = true;
            order.orderID = req.body.orderID;
            order.payerID = req.body.payerID;
            order.paymentID = req.body.paymentID;

            const updatedOrder = await order.save();
            res.status(200).send({updatedOrder: updatedOrder});
        }


/*
email: req.body.orderID,
name: req.body.payerID,
address: req.body.paymentID,

    orderID: data.orderID,
    payerID: data.payerID,
    paymentID: data.paymentID,

    emailOrder: this.state.emailOrder,
    nameOrder: this.state.nameOrder,
    addressOrder: this.state.addressOrder,
    totalOrder: totalOrder,
    itemsOrder: itemsOrder,
*/
/*
        const newOrder = new Order({
            email: req.body.emailOrder,
            name: req.body.nameOrder,
            address: req.body.addressOrder,
            total: req.body.totalOrder,
            items: req.body.itemsOrder,
        });
        console.log("server newOrder:", newOrder);
        const createdOrder = await newOrder.save();
        
        res.status(200).send({createdOrder: createdOrder});*/
    } catch (error) {
        res.status(500).send({message: error});
    }
});





const port = 5000;
app.listen(port, () => {
    console.log("Server is running on port ", port)
});
