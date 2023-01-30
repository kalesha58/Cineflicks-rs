const express = require("express");
const {
  getAllUsers,
  signUp,
  updateUser,
  deleteUser,
  loginUser,
  getBookingsOfUser,
  getUserById,
} = require("../controllers/userControllers");
const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.post("/signup", signUp);
userRouter.post("/login", loginUser);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);
userRouter.get("/bookings/:id", getBookingsOfUser);
userRouter.get("/:id", getUserById);
module.exports = userRouter;
