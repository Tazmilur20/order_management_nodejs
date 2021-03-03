const express = require('express');
const router = express.Router();
const mongoose=require('mongoose');
const valid=require('validator');

const Schema=mongoose.Schema

const userInformation=new Schema({
  name:{
    type:String,
    trim:true,
    required:true,
    minlength:3
},
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

phone:{
  type: String,
  trim:true,
  required:true,
  unique:true

},
role:String,
                                                                                                                                                                                                                                  
})

const Information= mongoose.model('Information',userInformation)
module.exports=Information;