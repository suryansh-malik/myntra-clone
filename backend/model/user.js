const mongoose = require("mongoose");

const userschema = mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  cart: [
    {
      productid: String,
      image: String,
      quantity: Number,
      brandname: String,
      productname: String,
      sellername: String,
      baseprice: String,
      actualprice: String,
      offpercentage: String,
      producttype: String,
    },
  ],
  wishlist: [
    {
      productid: String,
      image: String,
      baseprice: String,
      actualprice: String,
      offpercentage: String,
      productname: String
    },
  ],
});

const user = mongoose.model("user", userschema);
module.exports = user;
