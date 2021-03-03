const express= require('express');
const router=express.Router();
const controllerProduct=require('../controller/product');
const authenticate = require('../middleware/authenticate');


router.post('/add',authenticate, controllerProduct.postAllProduct)

router.get('/seeProduct', authenticate, controllerProduct.getAllProduct);
//router.get('/',authenticate,controllerProduct.fakeData)

router.post('/',authenticate,controllerProduct.fakeData)

router.get('/',authenticate, controllerProduct.getfakeData);





module.exports=router;
