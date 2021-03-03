const mongoose=require('mongoose');
const Schema= mongoose.Schema

const orderSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    
    status: {
        type: String,
        default: 'pending'
    }
    
})


const Order=mongoose.model('Order',orderSchema)
module.exports=Order;