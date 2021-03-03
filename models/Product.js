const mongoose=require('mongoose');
const Schema= mongoose.Schema

const ProductSchema=new Schema({

   
    productName:{
        type: String,
        required: true
    },
   
    quantity: {
        type: Number,
        required: true
    }
    
}) 


const Product=mongoose.model('Product',ProductSchema);

module.exports={
    Product
   
}