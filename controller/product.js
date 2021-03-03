
const Product = require('../models/Product');
const Fake=require('../models/FakeProduct');
const authenticate = require('../middleware/authenticate');
const Order = require('../models/Order')
const fetch=require('node-fetch');


const postAllProduct = (req, res, next) => {

  const role = req.userRole;

  if (role === 'admin') {
    const productInfo = new Product({

      productName: req.body.productName,

      quantity: req.body.quantity,

    })
    productInfo.save()
      .then(data => {
        res.status(201).json({
          message: 'product info added',
          productInfo: data
        })
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({
          message: 'Error Occured',
          error: err
        })
      })
  }
  else {
    res.status(500).json({
      message: 'admin can add product',

    })

  }

};

//get

const getAllProduct = (req, res, next) => {
  const role = req.userRole;
  if (role === 'user') {
    Product.find()
      .then(products => {
        res.status(200).json({
          message: 'All products',
          products
        })
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({
          message: 'Error Occured',
          error: err
        })
      })
  }
  else {
    res.status(500).json({
      message: 'you must login first as user',

    })

  }
}

const fakeData = (req, res, next) => {
  const role = req.userRole;
  if (role === 'super admin') {
   
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(json => {
       // console.log(json);
       //res.send(json);
        // code to push in db

      //  / console.log(json.length)
        for(let i=0;i<json.length;i++){
          //console.log(json[i]);
          const fakeInfo = new Fake({

            id: json[i].id,
            title: json[i].title,
            price:json[i].price,
            description: json[i].description,
            category: json[i].category,
            image:json[i].image,
      
          })
          fakeInfo.save()
        }
      
        //console.log()
       

      })
      .catch(error=> console.log(error))
     
  }
  else {
    res.status(500).json({
      message: 'you must login first as super admin',

    })

  }
}

const getfakeData=(req, res, next) => {
  const role = req.userRole;
  if (role === 'super admin') {
    Fake.find()
      .then(products => {
        res.status(200).json({
          message: 'All products',
          products
        })
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({
          message: 'Error Occured',
          error: err
        })
      })
  }
  else {
    res.status(500).json({
      message: 'you must login first as super admin',

    })

  }
}

module.exports = {
  postAllProduct,
  getAllProduct,
  fakeData,
   getfakeData
}