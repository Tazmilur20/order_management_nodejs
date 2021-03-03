const mongoose=require('mongoose');
const valid=require('validator')
const Schema= mongoose.Schema

const userSchema=new Schema({
    email:{
        type: String,
         trim:true,
         validate:{
             validator: (v)=>{
               return valid.isEmail(v);
             },
             message: `{value} is not  an email`
         }

    },
    password: String,
    role:String
})

const Reg=mongoose.model('Reg',userSchema)
module.exports=Reg