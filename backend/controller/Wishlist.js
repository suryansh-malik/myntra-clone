const user = require("../model/user")

exports.addtowishlist = async (req, res) => {
  const addedproduct = req.body.product
  const users = req.verifieduserid
  const findeduser = await user.findById(users);
  findeduser.wishlist.push(addedproduct)
  findeduser.save()
  res.json("added to your wishlist successfully") 
}
exports.removefromwishlist = async (req, res) => {
  const remveproductid = req.body.product;
  const userid = req.verifieduserid;
  const findeduser = await user.findById(userid);
  const findproduct = await findeduser.wishlist.pull({ productid: remveproductid });

  findeduser.save();
  res.json("added to your wishlist successfully");
};



