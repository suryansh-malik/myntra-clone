
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const dotenv = require('dotenv')
dotenv.config();
const cors = require("cors");
const { check } = require("express-validator");
const { validationResult } = require("express-validator");
app.use(cors());
app.use(express.json());
const homerouter = require("./routes/home");
const productroute = require("./routes/products");
const authroute = require("./routes/login");
const cartroute = require("./routes/cart");
const wishlistroute = require("./routes/Wishlist")
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

app.use(homerouter);
app.use(productroute);
app.use(authroute)
app.use(cartroute)
app.use(wishlistroute);

mongoose
  .connect(
    process.env.MONGODB_SECRET_KEY
  )
  .then((res) => {
    const server = app.listen(process.env.PORT||1337);
    console.log("server started")
    const io = require("socket.io")(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });
  });
