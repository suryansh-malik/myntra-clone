const express = require("express");
const router = express.Router();
const cartcontroller = require("../controller/cart");
const tokenauth = require("../authentication/tokenauth");

router.get("/cart", tokenauth.tokenauthenticationget, cartcontroller.getcart);
router.post("/addtocart",tokenauth.tokenauthenticationpost, cartcontroller.addtocart);
router.post("/cartproductremove", tokenauth.tokenauthenticationpost, cartcontroller.cartremove);
router.post("/quantitychanged", tokenauth.tokenauthenticationpost,cartcontroller.productquantitychange);       
module.exports = router;
