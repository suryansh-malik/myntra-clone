const mongoose = require('mongoose')
const productsschema = mongoose.Schema({
  image: String,
  brandname: String,
  overviewname: String,
  productname: String,
  sellername: String,
  baseprice: String,
  actualprice: String,
  offpercentage: String,
  producttype: String,
  detailimage1:String,
  detailimage2:String,
  gender: String,
});



const products = mongoose.model('product', productsschema)
module.exports = products