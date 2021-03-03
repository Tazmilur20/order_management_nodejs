const jwt=require('jsonwebtoken');
const { use } = require('../routes');

const authenticate=(req,res,next)=>{
   
   const token=req.cookies.token
   const decode= jwt.decode(token)
   if(typeof token!==undefined){
      req.userId=decode._id;
      req.userRole=decode.role
      //console.log(req.userId);
      
      next();
   }
   else
   {
     
      res.sendStatus(403)
   }
   
}

module.exports=authenticate;