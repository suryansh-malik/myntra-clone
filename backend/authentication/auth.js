const jwt = require('jsonwebtoken')
const user = require('../model/user')
const { validationResult, body } = require("express-validator");
const bcrypt = require('bcrypt')


exports.loginauth = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()){
        const error = 'type of email is incorrect';
       return  res.status(401).json(error)
    }

    const client = await user.findOne({ email: req.body.email })
    if (!client) {
        return res.status(401).json("email and password doesn't matched ")
    }
    const password = await bcrypt.compare(req.body.password, client.password)
    if (!password) {
        return res.status(401).json("email and password doesn't matched")
    }
    const users = {
        _id: client._id,
        firstname: client.firstname,
        lastname: client.lastname,
        email: client.email,
        cart: client.cart,
        wishlist:client.wishlist
    }
    req.user=users
    next()
}


exports.signupnauth = async (req,res,next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      const error = "type of email is incorrect";
        return res.status(401).json(error);
    }
    const client = await user.findOne({ email: req.body.email })
    if (client) {
        return res.status(401).json("email already exists");
    }
    const bcryptedpassword = await bcrypt.hash(req.body.password, 10);
    const newuser = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password:bcryptedpassword
    }
    req.user = newuser
    next()
};