const jwt = require("jsonwebtoken");
const user = require('../model/user')

exports.tokenauthenticationget= async (req,res,next) => {
  const token = req.headers["authorization"];
    const decodedtoken = jwt.verify(token, process.env.JWT_SECRET_KEY);
  if (!decodedtoken) {
   return res.status(401).json('You are not authenticated')
  }
  req.verifieduser = decodedtoken
    next();
}
exports.tokenauthenticationpost = async (req, res, next) => {
  const token = req.body.token
    const decodedtoken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decodedtoken){
     return  res.status(401).json("You are not authenticated");
    }
  req.verifieduserid = decodedtoken._id;
  next();


};
