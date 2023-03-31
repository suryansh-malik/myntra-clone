const jwt = require('jsonwebtoken')     
const { validationResult, body } = require('express-validator')

const user = {
  name:'malik'
}
exports.posthome = (req, res) => {
 
  // const error = validationResult(req);
  //   if (!error.isEmpty()) {
  //       const error = 'email is incorrect'
  //       // res.json({status:404})
  //   return res.status(404).json(error);
  // }
  const token = jwt.sign(user, 'mynameissuryanshmalik',{expiresIn:'10s'})
  console.log(req.body)
  // res.json(token);
  console.log(token);

  // console.log("hi from server");
};

exports.gethome = (req, res) => {
  const token = req.headers['authorization']
  // console.log(token)
  const decodedtoken = jwt.verify(token, process.env.JWT_SECRET_KEY);
  console.log(decodedtoken)
  res.json('hello from server')
}


