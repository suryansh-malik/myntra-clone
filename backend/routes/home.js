const express = require('express')
const router = express.Router()
const homecontroller = require("../controller/home");
const {check} = require('express-validator')


router.post("/home",  homecontroller.posthome);
router.get("/home",  homecontroller.gethome);


module.exports = router
