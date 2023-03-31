const express = require('express')
const router = express.Router()
const productcontroller = require('../controller/products')

router.get('/products/:gender', productcontroller.getproducts)
router.get('/product/:productid',productcontroller.getoneproduct)

module.exports = router