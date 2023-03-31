const user = require("../model/user");
const product = require("../model/product");

exports.getcart = async (req, res) => {
  const users = req.verifieduser;
  const finduser = await user.findById(users._id)
  const cart = finduser.cart
  cart.forEach((c) => console.log(c))
  res.json(cart);
};
exports.cartremove = async (req, res) => {
  const id = req.body.productid
  console.log(id)
  const requserid = req.verifieduserid;
  const finduser = await user.findById(requserid)
  const findproduct = await finduser.cart.pull({ productid: id })
  finduser.save()
  res.json('helloio')
};
exports.addtocart = async (req, res) => {
  const addedproduct = req.body.product
  const users = req.verifieduserid
  const findeduser = await user.findById(users);
  const findproduct = findeduser.cart.find((p) => p.productid === addedproduct.productid)
  // console.log(findproduct.quantity)
  if (findproduct) {
    console.log('added')
    findproduct.quantity = findproduct.quantity+1
  } else {
    findeduser.cart.push(addedproduct)
  }
  
  findeduser.save()
  res.json('hello') 
}
exports.productquantitychange = async (req, res) => {
  const quantity = req.body.quantity
  console.log(quantity)
  const users = req.verifieduserid;
  const productid = req.body.productid
  const findeduser = await user.findById(users);
  const findedproduct =await  findeduser.cart.find((p) => p.productid === productid)
  findedproduct.quantity = quantity
  findeduser.save()
  res.json('quantity chsnged')
  
}
