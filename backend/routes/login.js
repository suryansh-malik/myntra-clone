const express = require("express");
const router = express.Router();
const logincontroller = require("../controller/login");
const auth = require("../authentication/auth");
const { check } = require("express-validator");

router.post(
  "/signup",
  [check("email").isEmail()],
  auth.signupnauth,
  logincontroller.postsignup
);
router.post(
  "/login",
  [check("email").isEmail()],
  auth.loginauth,
  logincontroller.postlogin
);

module.exports = router;
