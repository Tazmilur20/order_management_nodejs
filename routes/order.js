var express = require('express');
var router = express.Router();

//const Order = require('../models/Order')
const authenticate = require('../middleware/authenticate');
const orderController=require('../controller/order');

const { editUSer } = require('./users');

router.post('/',authenticate,orderController.place_order )

router.put('/:id',authenticate, orderController.updateOrder)

router.get('/',authenticate, orderController.totalOrder);

module.exports = router;