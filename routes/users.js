
const express= require('express');
const router=express.Router();
const controllerUser=require('../controller/users')


/* GET users listing. */
router.get('/', controllerUser.getAllUser);

//POST

router.post('/',controllerUser.postAllUser)

//PUT
router.put('/:id',controllerUser.editUSer)

//Delete
router.delete('/:id',controllerUser.deleteUser)

module.exports = router;
