const express = require("express");
const { getAllUsers, signUp } = require("../controllers/userControllers");
const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.post("/signup",signUp)
module.exports=userRouter