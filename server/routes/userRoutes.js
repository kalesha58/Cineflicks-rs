const express = require("express");
const {
  getAllUsers,
  signUp,
  updateUser,
  deleteUser,
} = require("../controllers/userControllers");
const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.post("/signup", signUp);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);
module.exports = userRouter;
