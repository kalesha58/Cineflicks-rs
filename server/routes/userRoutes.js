const express = require("express");
const {
  getAllUsers,
  signUp,
  updateUser,
  deleteUser,
  loginUser,
  getBookingsOfUser,
} = require("../controllers/userControllers");
const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.post("/signup", signUp);
userRouter.post("/login", loginUser);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);
userRouter.get("/bookings/:id", getBookingsOfUser);
module.exports = userRouter;
