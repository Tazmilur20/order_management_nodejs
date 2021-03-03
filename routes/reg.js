const express= require('express');
const router=express.Router();
const controllerReg=require('../controller/reg');
const authenticate = require('../middleware/authenticate');

//user registation
router.post('/reg',controllerReg.postReg )
    
    //user login
    
    
router.post('/login',controllerReg.postLog)

//get

router.get('/', authenticate, controllerReg.getAllReg);

module.exports=router