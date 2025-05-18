require("dotenv").config();
const session = require("express-session");
const connectMongo = require("connect-mongo");
const authRouter = require("./authRouter.js");
const mongoose = require('mongoose')
const noteRouter = require('./noteRouter.js')

const express = require("express");

mongoose.connect(process.env.MONGOURL)
    .then(() => {console.log("connected")})
    .catch(e=>{console.log("Error :" , e)})

const app = express();
app.use(express.json());
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: connectMongo.create({ mongoUrl: process.env.MONGOURL }),
    cookie: {
      maxAge: 1000 * 60 * 5,

    }
  })
)





app.use("/auth", authRouter);
app.use("/note", noteRouter);

app.get("/",(req,res)=>{return res.status(200).send("home page")})

app.listen(3000);
