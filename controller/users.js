const user=require('../routes/users')
const Information=require('../models/Users');

const postAllUser=(req, res, next)=> {
   
    const userInfo=new Information({
      name:req.body.name,
      email:req.body.email,
      phone:req.body.phone,
      role:req.body.role
      
    })
    userInfo.save()
    .then(data=>{
      res.status(201).json({
        message: 'user info added',
        userInfo:data
      })
    })
    .catch(err=>{
      console.log(err)
      res.status(500).json({
          message:'Error Occured',
          error:err
      })
  })
  
  };

  //get

  const getAllUser= (req, res, next)=> {
    // res.send('respond with a resource');
    Information.find() 
       .then(contacts=>{
           res.status(200).json({
               message:'All Contacts',
               contacts
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

   //put
  
   const editUSer= (req, res, next)=> {
    let id=req.params.id
      let updatedContact={
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        role:req.body.role
      }
      Information.findByIdAndUpdate(id,{$set: updatedContact})
      .then(contact=>{
          Information.findById(contact._id)
            .then(newContact =>{
              res.json({
                  message:'contact update successfully',
                  contact
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

  const deleteUser= (req, res, next)=> {
    let id=req.params.id
    Information.findByIdAndRemove(id)
    .then(result=>{
        res.json({
            message:'contact deleted',
            result
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


  module.exports={
      postAllUser,
      getAllUser,
      editUSer,
      deleteUser
  }