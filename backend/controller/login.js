const user = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')

exports.postlogin = async (req, res) => {
  const data = req.user
  console.log(data);
  const token = jwt.sign(data, process.env.JWT_SECRET_KEY, {
    // expiresIn: "1h",
  });
    res.json({token,data});
};


exports.postsignup = async (req, res) => {
  const users = await new user(req.user);
  users.save();
  console.log('heeee');
  res.status(200).json("account created successfuly");
};


 




