const express=require("express");
const { newBokking } = require("../controllers/bookingController");

const bookingRouter=express.Router();

bookingRouter.post("/",newBokking)

module.exports=bookingRouter