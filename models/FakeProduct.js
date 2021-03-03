const mongoose=require('mongoose');
const Schema= mongoose.Schema


const FakeSchema=new Schema({
    id:String,
    title:String,
    price:Number,
    description:String,
    category:String,
    image:String

})
const Fake=mongoose.model('Fake',FakeSchema);

module.exports=Fake
