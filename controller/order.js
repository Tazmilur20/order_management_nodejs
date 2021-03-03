const authenticate = require('../middleware/authenticate');
const Order=require('../models/Order')

const place_order=(req, res, next) => {

    const role=req.userRole;
   // console.log(role);
    if(role==='user'){
    const orderInfo=new Order({
    productId:req.body.productId,
          productName:req.body.productName,
          userName:req.body.userName,

          quantity:req.body.quantity,
        //  status:req.body.status  

        })
        orderInfo.save()
        .then(data=>{
          res.status(201).json({
            message: 'order info added',
            productInfo:data
          })
        })
        .catch(err=>{
          console.log(err)
          res.status(500).json({
              message:'Error Occured',
              error:err
          })
      })
    }
    else{
        res.status(500).json({
          message:'Error Occured',

      })

       }
}
const updateOrder= (req, res, next)=> {

    const role=req.userRole;
    if(role==='admin'){
        let id=req.params.id
      let updatedOrder={
     
        status:req.body.status,
       
      }
      Order.findByIdAndUpdate(id,{$set: updatedOrder})
      .then(order=>{
          Order.findById(order._id)
            .then(newOrder =>{
              res.json({
                  message:'order status update successfully',
                  order
            })
         
          });
      })
      .catch(err=>{
          console.log(err)
          res.status(500).json({
              message:'Error Occured',
              error:err
          })
      })
    }
    else
    {
        res.status(500).json({
            message:'only admin can update status',
           
        })
    }
    
  
  }

  const totalOrder= (req, res, next)=> {
    const role=req.userRole;
    if(role==='super admin'){
    Order.find() 
       .then(orders=>{
           res.status(200).json({
               message:'All orders',
               orders
           })
       })
       .catch(err =>{
           console.log(err)
           res.status(500).json({
               message:'Error Occured',
               error:err
           })
       })
    }
    else{
        res.status(500).json({
          message:'only super admin can access this',
        
      })
         
       }
   }


module.exports={
    place_order,
    updateOrder,
    totalOrder
}

