const express = require("express")
const router = express.Router()
const tokenauth = require("../authentication/tokenauth")
const wishlistcontroller = require("../controller/Wishlist")
router.post("/addtowishlist", tokenauth.tokenauthenticationpost, wishlistcontroller.addtowishlist);
router.post(
  "/removefromwishlist",
  tokenauth.tokenauthenticationpost,
  wishlistcontroller.removefromwishlist
);


module.exports = router