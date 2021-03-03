const user = require('../routes/reg');
const Reg = require('../models/Reg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const response = require('../app');
const authenticate = require('../middleware/authenticate')


const postReg = (req, res, next) => {

  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      res.json({
        error: err
      })
    }

    let reg = new Reg({
      email: req.body.email,
      password: hash,
      role: req.body.role
    })
    reg.save()
      .then(data => {
        res.status(201).json({
          message: 'Registation succesfull',
          reg: data
        })
      })
      .catch(err => {
        res.status(500).json({
          message: 'Error Occured',
          error: err
        })

      })

  })
}

const postLog = (req, res, next) => {
  let email = req.body.email
  let password = req.body.password

  Reg.findOne({ email })
    .then(user => {
      if (user) {
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            res.json({
              message: 'error occured'
            })
          }
          if (result) {


            let token = jwt.sign({ email: user.email, _id: user._id, role: user.role }, 'SECRET', { expiresIn: '2h' })

            res.cookie('token', token)


            res.json({
              message: 'login successful',
              token
            })
          } else {
            res.json({
              message: 'login Failed.password does not match'
            })

          }
        })
      }
      else {
        res.json({
          message: 'user not found'
        })
      }
    })
}

const getAllReg = (req, res, next) => {

  const role = req.userRole

  if (role === 'admin') {
    Reg.find()
      .then(contacts => {
        res.status(200).json({
          message: 'All Register',
          contacts
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
      message: 'Error Occured',

    })

  }

}

module.exports = {
  postReg,
  postLog,
  getAllReg

}